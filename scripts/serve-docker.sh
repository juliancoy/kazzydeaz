#!/usr/bin/env bash
set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
WORKSPACE_ROOT="$(cd "${PROJECT_ROOT}/.." && pwd)"
PROJECT_NAME="$(basename "${PROJECT_ROOT}")"

SITE_CONTAINER="${SITE_CONTAINER:-kazzydeaz-site}"
SELENIUM_CONTAINER="${SELENIUM_CONTAINER:-kazzydeaz-selenium}"
SITE_PORT="${SITE_PORT:-8787}"
SELENIUM_PORT="${SELENIUM_PORT:-4444}"

container_exists() {
  docker container inspect "$1" >/dev/null 2>&1
}

container_running() {
  [ "$(docker container inspect -f '{{.State.Running}}' "$1" 2>/dev/null || true)" = "true" ]
}

ensure_selenium() {
  if container_exists "${SELENIUM_CONTAINER}"; then
    if container_running "${SELENIUM_CONTAINER}"; then
      echo "Reusing running Selenium container: ${SELENIUM_CONTAINER}"
    else
      echo "Starting existing Selenium container: ${SELENIUM_CONTAINER}"
      docker start "${SELENIUM_CONTAINER}" >/dev/null
    fi
    return
  fi

  echo "Creating Selenium container: ${SELENIUM_CONTAINER}"
  docker run -d \
    --name "${SELENIUM_CONTAINER}" \
    --shm-size=2g \
    -p "${SELENIUM_PORT}:4444" \
    selenium/standalone-chrome:latest >/dev/null
}

ensure_site() {
  if container_exists "${SITE_CONTAINER}"; then
    if container_running "${SITE_CONTAINER}"; then
      echo "Reusing running site container: ${SITE_CONTAINER}"
    else
      echo "Starting existing site container: ${SITE_CONTAINER}"
      docker start "${SITE_CONTAINER}" >/dev/null
    fi
    return
  fi

  echo "Creating site container: ${SITE_CONTAINER}"
  docker run -d \
    --name "${SITE_CONTAINER}" \
    -p "${SITE_PORT}:8787" \
    -v "${WORKSPACE_ROOT}:/workspace" \
    -w "/workspace/${PROJECT_NAME}" \
    node:22-bookworm-slim \
    bash -lc "npm run pidp:build:metadata && npx wrangler dev --ip 0.0.0.0 --port 8787" >/dev/null
}

ensure_selenium
ensure_site

echo "Site: http://localhost:${SITE_PORT}"
echo "Selenium: http://localhost:${SELENIUM_PORT}/wd/hub"
