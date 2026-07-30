# Source architecture

The `src` directory contains application code that is independent of Expo
Router's file-based route declarations.

## Directory responsibilities

- `components/`: reusable application-wide UI and navigation components.
- `data/`: domain models, mock records, and pure query functions.
- `features/`: screen-level UI grouped by product capability.
- `theme/`: theme contracts, tokens, provider, and hooks.

Route files stay in the root `app/` directory and should remain thin. A route
parses navigation parameters and renders a feature screen; it should not own
business logic or data access.

## Data organization

Data is grouped by domain instead of by technical file type:

```text
data/
  assets/
    asset.model.ts
    asset.queries.ts
    mockAssets.ts
  locations/
    location.model.ts
    mockLocations.ts
  organizations/
    organization.model.ts
    mockOrganizations.ts
  shared/
    address.model.ts
```

Models describe domain values. Query files contain deterministic, side-effect
free operations. Mock files are development fixtures and must not contain
real student, staff, credential, or district-confidential data.

## Security boundaries

- Client-side validation is for usability, not authorization.
- The server must authenticate users and authorize every asset operation.
- Tenant or organization scope must come from the authenticated server
  session, never from a trusted client-supplied organization ID.
- Raw passwords, access tokens, and private asset data must not be logged.
- Secrets must not be included in source files or `EXPO_PUBLIC_` variables.
- Sensitive local tokens should use a platform-backed secure storage solution.

## Planned work

- TODO(security): Add session-backed authentication and protected routes.
- TODO(security): Define roles and server-enforced permissions for inventory,
  assignment, transfer, maintenance, retirement, and audit operations.
- TODO(data): Introduce an `AssetRepository` interface with mock and API
  implementations so screens do not depend directly on fixture data.
- TODO(data): Validate API payloads at the network boundary before treating
  them as domain models.
- TODO(feature): Connect header search to the `/assets?q=` route parameter.
- TODO(feature): Add repository-backed loading, refresh, retry, and error
  states to the asset list, details, and dashboard.
- TODO(feature): Model assignment and transfer history as records rather than
  overwriting the current asset location.
- TODO(feature): Add authenticated user and profile-menu behavior.
- TODO(quality): Add unit tests for queries and integration tests for routes.
- TODO(observability): Add privacy-safe error reporting and audit-event
  correlation without recording credentials or unnecessary personal data.
