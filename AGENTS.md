# Agent Notes

## Prerequisites

- Keep the People's Identity Platform checked out as a sibling directory at
  `../pidp`. This app imports the PIDP Cloudflare Worker from
  `../pidp/serverless/src` and runs PIDP tests from `../pidp/serverless/test`.
- Before running this app's Worker checks, install the sibling Worker
  dependencies with `npm ci` from `../pidp/serverless`.

## Local serving

- When using Docker to view or test the site, start it with
  `npm run docker:serve`. This script starts/reuses the site and Selenium
  containers.
- Keep those Docker containers running after checks complete so the user can
  keep viewing the site. Do not stop them unless the user explicitly asks you
  to stop the Docker server or containers.
