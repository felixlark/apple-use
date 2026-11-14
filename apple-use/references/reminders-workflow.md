# Apple Reminders via EventKit

Follow [Apple routing](apple-app-routing.md). Use a verified `apple_reminders_*` tool when loaded; otherwise invoke the installed `remindctl` CLI directly. Do not use Reminders UI or AppleScript as fallback.

## Readiness

Run `remindctl --help`, relevant subcommand help, and `remindctl status --json --no-input`. `not-determined` requires the ordinary `remindctl authorize` prompt and user grant. Denied/restricted access must not be bypassed. Mach 4099 reports a system service connection failure, not successful authorization; inspect the host/sandbox and report evidence. Do not assume another terminal's permission applies to this host.

Avoid `remindctl doctor` on builds that inspect the private Reminders store. Use status/help for public-API diagnostics. Do not use rich/private database modes. Inspect an unfamiliar build before record reads.

## Search before write

```sh
remindctl search 'https://github.com/OWNER/REPO/issues/NUMBER' --list 'LIST' --completed --json --no-input
```

Use an exact stable ID returned by the API. Zero results after a successful complete query permits creation; a permission error or incomplete query does not. Reuse existing items, including ones previously created in the UI. Do not delete/recreate a reminder just to change unsupported fields.

## Create with a verified address

```sh
remindctl add --title 'Visit the restaurant nearby' --list 'LIST' --location 'VERIFIED ADDRESS' --radius 150 --url 'https://github.com/OWNER/REPO/issues/NUMBER' --notes 'Human-readable context' --json --no-input
```

This is an example, not a command to execute without task scope. Radius is meters; default proximity is arrival; `--leaving` changes it to departure. Radius/leaving require location. Do not invent coordinates, trip dates or whole-city boundary guarantees. Date and place are separate triggers, not automatically an AND rule.

## Edit and verify

The installed 0.3.4 CLI accepts URL edits but does not advertise location editing. Check current help before using flags. For unsupported location edits, use an already authorized public EventKit adapter or report the exact missing capability; preserve the item.

`edit ID --url URL` sets the source link. Only edit fields requested. Then read `show`/`search` through EventKit and check list, URL, completion and `locationTrigger` when exposed. A JSON result without alarm metadata does not verify the alarm. If readback is incomplete, report which fields are unverified.

The MCP exposes status, search, add URL/location/radius/leaving, and edit URL. It does not provide autonomous GitHub sync or geofence-delivery receipts. Multiple results, unknown write outcomes or host errors require reconciliation before retrying.

Use a unique single-action UUID or action Issue URL for deduplication. A restaurant archive URL alone is not a unique visit. The add tool is a non-idempotent primitive: the caller must serialize writes for the same action and reconcile unknown outcomes. Search-then-create is not atomic and does not prevent concurrent duplicates.
