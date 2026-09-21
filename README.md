# Apple Use

Local-first Apple app tooling for coding agents on macOS.

This legacy repository now has two supported responsibilities:

- Apple Notes through `apple-notes` and `memo`
- Apple Reminders through `apple-reminders` and `remindctl`

Every Apple Mail or email task routes to the standalone `apple-mail` skill. Himalaya is the primary protocol-level execution surface; Apple Mail is the native review client; `macos-use` is reserved for Apple-Mail-only features and UI recovery. The former `apple_mail_*` plugin tools, `fruitmail`, AppleScript-backed Mail helpers, and direct Mail database access have been retired.

## Surfaces

- `apple-use/`: optional Codex-local Notes/Reminders MCP plugin
- `apple-ecosystem/`: router skill
- `apple-notes/`: Apple Notes skill
- `apple-reminders/`: Apple Reminders skill
- `apple-mail/`: canonical hybrid workflow using Himalaya, Apple Mail, and bounded `macos-use`

Shared invariants are in [docs/agent-contract.md](./docs/agent-contract.md).

## Install the Notes/Reminders plugin

```bash
cd /path/to/apple-use/apple-use
npm install
./scripts/install-local-plugin.sh
```

The plugin intentionally exposes no Mail tools.

## Requirements

- macOS with the relevant Apple apps
- `memo` for Apple Notes
- `remindctl` for Apple Reminders
- Himalaya 2.x with accounts configured through Keychain-backed credential commands
- enabled, Developer-ID-signed `macos-use` MCP server for native Mail edge behavior

## Verification

```bash
npm --prefix apple-use install
npm --prefix apple-use run check
npm --prefix apple-use run doctor
himalaya account list --json
himalaya account check -a <account> -b imap --json
himalaya account check -a <account> -b smtp --json
codex mcp get macos-use
python3 ~/.codex/skills/.system/skill-creator/scripts/quick_validate.py apple-mail
python3 ~/.codex/skills/.system/skill-creator/scripts/quick_validate.py apple-ecosystem
python3 ~/.codex/skills/.system/skill-creator/scripts/quick_validate.py apple-use/skills/apple-use
```

For email acceptance, check IMAP and SMTP sequentially, then generate a local RFC 5322 compose preview with a harmless attachment and no `--send`. Use a bounded Apple Mail regression only when native UI behavior changed.

## Guardrails

- Himalaya is the primary email source and execution surface.
- Apple Mail is the native review surface; use `macos-use` only for native features or recovery.
- Reserve Computer Use for Mail system dialogs, permissions, unlock, or recovery documented by `apple-mail`.
- Do not use provider webmail, `fruitmail`, AppleScript/`osascript`, ad-hoc Accessibility scripts, private Mail APIs, or direct Mail database access.
- Never send email during infrastructure or skill acceptance.

Repository: [github.com/felixlark/apple-use](https://github.com/felixlark/apple-use)
