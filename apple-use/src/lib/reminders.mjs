import { ensureSuccess, runCommand } from "./shell.mjs";

function parseJson(stdout, context) {
  try {
    return JSON.parse(stdout);
  } catch (error) {
    throw new Error(`${context}: ${error.message}`);
  }
}

export async function showReminders({ filter, list }) {
  const args = ["show"];
  if (filter) args.push(filter);
  if (list) args.push("--list", list);
  args.push("--json", "--no-input");

  const result = ensureSuccess(runCommand("remindctl", args), "remindctl show failed");
  return parseJson(result.stdout, "Invalid remindctl show JSON");
}

export async function listReminderLists({ name }) {
  const args = ["list"];
  if (name) args.push(name);
  args.push("--json", "--no-input");

  const result = ensureSuccess(runCommand("remindctl", args), "remindctl list failed");
  return parseJson(result.stdout, "Invalid remindctl list JSON");
}

export async function addReminder(input, run = runCommand) {
  if ((input.radius !== undefined || input.leaving) && !input.location) throw new Error("location is required for radius/leaving");
  if (input.radius !== undefined && (!Number.isFinite(input.radius) || input.radius <= 0)) throw new Error("radius must be positive");
  const args = ["add"];
  if (input.title) args.push("--title", input.title);
  if (input.list) args.push("--list", input.list);
  if (input.due) args.push("--due", input.due);
  if (input.notes !== undefined) args.push("--notes", input.notes);
  if (input.priority) args.push("--priority", input.priority);
  if (input.url) args.push("--url", input.url);
  if (input.location) args.push("--location", input.location);
  if (input.radius !== undefined) args.push("--radius", String(input.radius));
  if (input.leaving) args.push("--leaving");
  args.push("--json", "--no-input");

  const result = ensureSuccess(run("remindctl", args), "remindctl add failed");
  return parseJson(result.stdout, "Invalid remindctl add JSON");
}

export async function editReminder(input, run = runCommand) {
  if (input.complete && input.incomplete) throw new Error("complete conflicts with incomplete");
  if (input.due && input.clearDue) throw new Error("due conflicts with clearDue");
  if (input.url && input.clearUrl) throw new Error("url conflicts with clearUrl");
  const args = ["edit", input.id];
  if (input.title) args.push("--title", input.title);
  if (input.list) args.push("--list", input.list);
  if (input.due) args.push("--due", input.due);
  if (input.notes !== undefined) args.push("--notes", input.notes);
  if (input.priority) args.push("--priority", input.priority);
  if (input.url) args.push("--url", input.url);
  if (input.clearUrl) args.push("--clear-url");
  if (input.clearDue) args.push("--clear-due");
  if (input.complete) args.push("--complete");
  if (input.incomplete) args.push("--incomplete");
  args.push("--json", "--no-input");

  const result = ensureSuccess(run("remindctl", args), "remindctl edit failed");
  return parseJson(result.stdout, "Invalid remindctl edit JSON");
}

export async function completeReminder(id) {
  const result = ensureSuccess(
    runCommand("remindctl", ["complete", id, "--json", "--no-input"]),
    "remindctl complete failed",
  );
  return parseJson(result.stdout, "Invalid remindctl complete JSON");
}

export async function deleteReminder({ ids }) {
  const args = ["delete", ...ids, "--force", "--json", "--no-input"];
  const result = ensureSuccess(runCommand("remindctl", args), "remindctl delete failed");
  return parseJson(result.stdout, "Invalid remindctl delete JSON");
}

export async function authorizeReminders() {
  const result = runCommand("remindctl", ["authorize", "--json", "--no-input"]);
  if (result.status !== 0) {
    return {
      ok: false,
      output: (result.stderr || result.stdout).trim(),
    };
  }

  return {
    ok: true,
    data: parseJson(result.stdout, "Invalid remindctl authorize JSON"),
  };
}


export async function remindersStatus(run = runCommand) {
  return parseJson(ensureSuccess(run("remindctl", ["status", "--json", "--no-input"]), "remindctl status failed").stdout, "Invalid status JSON");
}
export async function searchReminders({ query, list, completed = true }, run = runCommand) {
  if (!query?.trim()) throw new Error("query must not be empty");
  const args = ["search", query];
  if (list) args.push("--list", list);
  if (completed) args.push("--completed");
  args.push("--json", "--no-input");
  return parseJson(ensureSuccess(run("remindctl", args), "remindctl search failed").stdout, "Invalid search JSON");
}
