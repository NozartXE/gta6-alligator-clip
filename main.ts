import { copyFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

// Entry program for the gta6-clipper-01 bounty.
// It does one thing: copy VIDEO.json from the repository into the output
// directory, so the grader can read the submitted video's address.
// Node standard library only. No network, no wall clock, no files outside
// the repository, and two runs write the same bytes.

const VIDEO_FILE = "VIDEO.json";

const botDir = process.env.MAKEFUN_BOT_DIR ?? ".";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(outputDir, { recursive: true });
try {
  copyFileSync(join(botDir, VIDEO_FILE), join(outputDir, VIDEO_FILE));
} catch (err) {
  console.error(
    `Error: failed to copy ${VIDEO_FILE} into ${outputDir}: ${
      err instanceof Error ? err.message : String(err)
    }`,
  );
  process.exit(1);
}
