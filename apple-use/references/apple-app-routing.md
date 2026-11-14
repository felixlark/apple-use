# Apple ecosystem: API first

Use public frameworks or verified protocol connectors. For calendars and reminders use EventKit. Do not use UI clicks, AppleScript, private frameworks, or app database reads to replace this control plane. Permission failures require diagnosis and the normal system authorization flow; do not reset privacy permissions or switch executable identity to bypass denial.

## Routing

| Data | Control plane | Boundary |
|---|---|---|
| Reminders | `apple-reminders` / verified `apple_reminders_*` adapter / `remindctl` public EventKit commands | Verify installed CLI flags; location creation and location editing can differ |
| Calendar | Authorized EventKit adapter | Calendar source + ID and explicit time window; calendar access is separate from reminders |
| Contacts | Authorized Contacts framework adapter | Discover capability and access before invoking |
| Photos | Authorized PhotoKit adapter | Preserve limited-library scope |
| Mail | Existing `apple-mail`, Himalaya or authorized mail connector | EventKit does not manage mail; sending requires user authorization |
| Notes | Verified public/Shortcuts connector if available | EventKit does not manage Notes; old `memo`/AppleScript workflows are not approved fallback |

Framework availability is not proof an adapter is installed. Discover actual tools before claiming support. Missing capabilities remain explicit; do not build a second general automation system just to hide a gap.

## Task loop

1. Identify the authoritative record and intended Apple action. Preserve existing data and paused services.
2. Inspect adapter version/help and noninteractive permission status. Do not run diagnostics that read private databases or unrelated mail/notes.
3. For authorized writes, search by stable action ID or source URL, including completed records. Match exact list/source. Ambiguous results require reconciliation, not another create.
4. Apply one scoped change using stable IDs. Do not infer visit/rating from checking a reminder.
5. Read back via the same public API: ID, list/source, title, URL, completion, alarms, location/proximity/radius. Record the actual result in the authoritative task.
6. Distinguish local API persistence, iCloud replication, and notification delivery. Device replication and crossing a geofence need their own evidence.

For GitHub-backed personal administration, GitHub holds facts and action history; Apple apps are user interaction surfaces. Completing/deleting an Apple projection must not erase the original archive. Do not silently overwrite changes on either side or replay cancelled actions. A user-requested one-shot action does not restore paused background workers.

See [API references](apple-apis.md).

Use a unique single-action UUID or action Issue URL for deduplication. A restaurant archive URL alone is not a unique visit. The add tool is a non-idempotent primitive: the caller must serialize writes for the same action and reconcile unknown outcomes. Search-then-create is not atomic and does not prevent concurrent duplicates.
