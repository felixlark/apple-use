import { runCommand, which } from "./shell.mjs";
// Diagnostics inspect executables and EventKit authorization only. No app UI,
// AppleScript, mail/notes contents, or private databases are accessed.
export async function runDoctor() {
  const tools = ["remindctl", "himalaya", "shortcuts"].map(name => {
    const path = which(name);
    return { name, installed: Boolean(path), path };
  });
  const installed = tools.find(t => t.name === "remindctl").installed;
  const status = installed ? runCommand("remindctl", ["status", "--json", "--no-input"]) : null;
  return { generatedAt: new Date().toISOString(), tools,
    reminders: status ? { ok: status.status === 0, output: (status.stdout || status.stderr).trim() } : { ok: false, output: "remindctl missing" },
    notes: { checked: false, reason: "No verified public Notes CRUD adapter configured" },
    mail: { checked: false, executionSurface: "Himalaya or authorized mail connector" }
  };
}
