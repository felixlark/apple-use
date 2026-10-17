# Apple-Use Runbook

## Repo Scope

- Owner/escalation: Longbiao for local macOS tooling.
- This legacy repo is retained for explicit maintenance only and is not installed into Codex by default.
- The plugin owns Apple Notes and Reminders workflows. Every email task routes to the standalone global `apple-mail` skill, with Himalaya as the primary protocol surface and Apple Mail as the review surface.
- Do not reintroduce `apple_mail_*`, `fruitmail`, AppleScript/`osascript` Mail automation, or direct Mail database reads.

## Canonical Commands

- Repo doctor: `npm --prefix apple-use run doctor`
- Local plugin install: `bash apple-use/scripts/install-local-plugin.sh`
- Notes list/search: `memo notes` or `memo notes -s "query"`
- Reminders: `remindctl today` or `remindctl add --title "Task" --list Personal --due tomorrow`
- Mail runtime: `himalaya account list --json`
- Mail skill validation: `python3 ~/.codex/skills/.system/skill-creator/scripts/quick_validate.py apple-mail`

## Verification

| Scope | Command or surface | Acceptance |
| --- | --- | --- |
| Plugin | `npm --prefix apple-use run check && npm --prefix apple-use run doctor` | Notes/Reminders tools pass; no `apple_mail_*` tools are registered |
| Skills | validate `apple-mail`, `apple-ecosystem`, and `apple-use/skills/apple-use` | Every skill passes and routes email to Himalaya first |
| Mail runtime | sequential Himalaya IMAP and SMTP checks | Each configured backend reports `ok: true` |
| Mail GUI edge | `codex mcp get macos-use` plus signing verification | MCP is available for Apple-Mail-only features |

## Guardrails

- Follow the global `~/.codex/AGENTS.md` Mail-specific control rule. It overrides the general native-GUI default.
- Use Himalaya for protocol-level email work. Use `macos-use` only for native Mail review, Apple-Mail-only features, or documented recovery.
- Do not read email bodies or send email during infrastructure acceptance.
- Preserve Notes and Reminders behavior unless the task explicitly changes it.
- Treat `~/.openclaw` as separate host state unless the task explicitly targets it.

## Development Workflow

- Follow the global `~/.codex/AGENTS.md` and workspace `/Users/longbiao/Documents/AGENTS.md` development workflow; use the canonical checkout with one writer and do not create new worktrees.
- Start with `git status --short --branch`, preserve unrelated changes, run exact checks, then commit and push the scoped change.
- Use a task branch in the canonical checkout only when needed; do not create new worktrees or clean pre-existing residue without a separate exact user request.
