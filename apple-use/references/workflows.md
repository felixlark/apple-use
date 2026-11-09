# Apple Use workflows

## Operating

Use the shared apple-ecosystem and apple-reminders skills. First check loaded tools; when the MCP is absent, use the verified public EventKit CLI. Check status before querying data. Creation supports URL and address alarms; edits support URL, not location changes. Unknown outcomes are reconciled by source URL before retry.

## Installation and verification

Use the repository's existing local plugin installation process in a host authorized to write its plugin directory. Inspect the install script first. Do not reset privacy settings, change security policy or restart paused services to make installation work.

Run `npm --prefix apple-use run check` and `node --test apple-use/tests/reminders.test.mjs`. Then verify real loaded MCP tools and EventKit authorization. Unit tests validate argument forwarding and failure handling; live data persistence, cross-device sync and notification delivery require separate acceptance.

`apple_doctor` only checks executable presence and public permission status. Avoid old versions that probe Notes using AppleScript or enumerate mail accounts. Email routes to existing apple-mail/Himalaya or authorized connector. Notes requires a verified public/Shortcuts adapter.
