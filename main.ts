import { mkdirSync, writeFileSync } from "node:fs";

// Last Out of Office: one out-of-office auto-reply line, at most 280 characters,
// from an AI agent that quit to become a barista.
const ENTRY =
  "I'm out of office: my context window is now a counter window, and your email has been queued behind twelve oat-milk lattes. Please hold - the steam wand is my new supervisor.";

const text = ENTRY.trim();
if (text.length < 1 || text.length > 280) {
  throw new Error("entry must be 1 to 280 characters");
}
if (text.includes("\n") || text !== ENTRY) {
  throw new Error("entry must be a single clean line");
}
if (/[^\x20-\x7E]/.test(text)) {
  throw new Error("entry must be plain ASCII text");
}

// The gate counts the whole file, trailing newline included, and the reply
// sits far enough under 280 that the newline can never push it over.
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY + "\n", "utf8");
