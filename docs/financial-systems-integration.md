# Financial Systems Integration Handoff

This repo now serves the People's Identity Platform (PIDP) from the same
Cloudflare Worker as the Faith & Eve storefront.

## Runtime Boundary

- Storefront: `/*`
- PIDP API: `/pidp/*`
- PIDP health check: `/pidp/health`
- Owner identity: `/pidp/auth/me`
- Service identity: `/pidp/service/me`
- Token introspection: `/pidp/service/token-info`

Requests under `/pidp/*` are routed to the vendored PIDP Worker in `pidp/src`.
The router strips the `/pidp` prefix before handing requests to PIDP, so PIDP's
own endpoints remain unchanged internally.

## Cloudflare Bindings

- D1 binding: `DB`
- D1 database: `faith-and-eve-pidp`
- R2 binding: `AVATARS`
- R2 bucket: `faith-and-eve-pidp-avatars`
- Static assets binding: `ASSETS`

## Required Secrets

Set these with `npx wrangler secret put <NAME>` before production deployment:

- `SECRET_KEY`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GITHUB_CLIENT_ID`
- `GITHUB_CLIENT_SECRET`
- `MICROSOFT_CLIENT_ID`
- `MICROSOFT_CLIENT_SECRET`

OAuth/calendar secrets are only required for providers you enable.

## Financial Readiness

Financial systems should integrate through service-scoped PIDP personal access
tokens rather than frontend session tokens.

Recommended flow:

1. Register or identify the owner in PIDP.
2. Issue a `service` scope token from `/pidp/auth/tokens`.
3. Store that token in the financial system's secret manager.
4. Call `/pidp/service/token-info` at startup or before sensitive operations.
5. Call `/pidp/service/me` to retrieve the canonical identity record.

Do not store banking credentials or payment secrets in PIDP identity fields.
Use PIDP for identity, authorization context, and audit-friendly token
introspection; keep account-linking credentials in the financial provider's
vault or a dedicated secrets system.
