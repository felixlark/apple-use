import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { runDoctor } from "./lib/doctor.mjs";
import {
  addReminder,
  remindersStatus,
  searchReminders,
  authorizeReminders,
  completeReminder,
  deleteReminder,
  editReminder,
  listReminderLists,
  showReminders,
} from "./lib/reminders.mjs";

function toContent(value) {
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(value, null, 2),
      },
    ],
  };
}

function withDeleteConfirmation(confirm, label) {
  if (!confirm) {
    throw new Error(`${label} requires explicit confirm=true.`);
  }
}

const server = new McpServer({
  name: "apple-use",
  version: "0.1.0",
});

server.tool("apple_doctor", "Check local Apple CLI dependencies and permissions.", async () =>
  toContent(await runDoctor()),
);

server.tool("apple_reminders_status", "Check EventKit authorization without prompting or reading reminders.", async () => toContent(await remindersStatus()));

server.tool("apple_reminders_search", "Find reminders by title, notes or source URL, including completed items by default for deduplication.", { query: z.string().min(1), list: z.string().optional(), completed: z.boolean().default(true) }, async (input) => toContent(await searchReminders(input)));

server.tool(
  "apple_reminders_authorize",
  "Trigger the macOS Reminders permission prompt when available.",
  async () => toContent(await authorizeReminders()),
);

server.tool(
  "apple_reminders_show",
  "Show reminders by filter and optional list.",
  {
    filter: z.string().optional(),
    list: z.string().optional(),
  },
  async (input) => toContent(await showReminders(input)),
);

server.tool(
  "apple_reminders_lists",
  "List reminder lists or show one list.",
  {
    name: z.string().optional(),
  },
  async (input) => toContent(await listReminderLists(input)),
);

server.tool(
  "apple_reminders_add",
  "Add an Apple Reminder through EventKit. Check status and search by source URL first. Location is an address; radius/leaving require location.",
  {
    title: z.string(),
    url: z.string().url().optional(),
    location: z.string().min(1).optional(),
    radius: z.number().positive().optional(),
    leaving: z.boolean().optional(),
    list: z.string().optional(),
    due: z.string().optional(),
    notes: z.string().optional(),
    priority: z.enum(["none", "low", "medium", "high"]).optional(),
  },
  async (input) => toContent(await addReminder(input)),
);

server.tool(
  "apple_reminders_edit",
  "Edit an Apple Reminder by index or ID prefix.",
  {
    id: z.string(),
    title: z.string().optional(),
    list: z.string().optional(),
    due: z.string().optional(),
    notes: z.string().optional(),
    priority: z.enum(["none", "low", "medium", "high"]).optional(),
    url: z.string().url().optional(),
    clearUrl: z.boolean().optional(),
    clearDue: z.boolean().optional(),
    complete: z.boolean().optional(),
    incomplete: z.boolean().optional(),
  },
  async (input) => toContent(await editReminder(input)),
);

server.tool(
  "apple_reminders_complete",
  "Complete an Apple Reminder by index or ID prefix.",
  {
    id: z.string(),
  },
  async (input) => toContent(await completeReminder(input.id)),
);

server.tool(
  "apple_reminders_delete",
  "Delete one or more Apple Reminders.",
  {
    ids: z.array(z.string()).min(1),
    confirm: z.boolean().default(false),
  },
  async (input) => {
    withDeleteConfirmation(input.confirm, "apple_reminders_delete");
    return toContent(await deleteReminder(input));
  },
);

const transport = new StdioServerTransport();
await server.connect(transport);

