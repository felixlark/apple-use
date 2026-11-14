---
name: apple-use
description: Use Apple Use public-API tools for EventKit-backed Reminders and route other Apple apps to their supported framework or connector. Check permissions, deduplicate by source URL, and read back writes without UI automation.
---

# Apple Use

Load the shared [Apple ecosystem routing](../../references/apple-app-routing.md) and [Reminders workflow](../../references/reminders-workflow.md).

- `apple_doctor`: executable presence and EventKit authorization only; no unrelated personal data.
- `apple_reminders_status`: permission status without prompting.
- `apple_reminders_search`: title/notes/URL lookup including completed items by default.
- `apple_reminders_add`: title/list/notes/URL plus address, radius, leaving.
- `apple_reminders_edit`: stable ID and scoped edits including source URL; location edit is not exposed.
- `apple_reminders_show` and `apple_reminders_lists`: public-API readback.
- `apple_reminders_authorize`: normal system prompt when needed; never claims consent on the user's behalf.

Notes tools are not registered until an approved public adapter is implemented. Email uses the standalone `apple-mail` workflow.

A source update does not install or connect this server. Verify loaded tool names and actual host authorization before claiming live support. See [workflows](../../references/workflows.md).
