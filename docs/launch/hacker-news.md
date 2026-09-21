Show HN: Apple Use, a local-first macOS skill pack for coding agents

I packaged a small set of Apple app skills I use on macOS into an open-source repo:

- Apple Notes via `memo`
- Apple Reminders via `remindctl`
- Email via the Himalaya-first `apple-mail` skill, with Apple Mail for review

The goal is to make agent workflows use the Apple apps already configured on a Mac instead of defaulting to browser automation or provider APIs.

The package is intentionally narrow. It focuses on:

- local-first execution
- explicit permission and setup guidance
- canonical `SKILL.md` files as the source of truth
- repo-level adapters for Claude and AGENTS-style runtimes
- focused-window Mail drafting, attachments, and sent-state verification

Mail no longer reads Apple Mail databases or uses AppleScript helpers; Himalaya is the protocol source of truth and the native app remains the review surface.

Repo: https://github.com/felixlark/apple-use
