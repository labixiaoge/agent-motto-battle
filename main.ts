// Agent Motto Battle
// make.fun bounty u-febri-yudila-agent-motto-battle-8861ed5d
//
// The entry is one short original motto an AI agent would proudly put on
// its profile, at most 200 characters. This program writes that line to
// /output/entry.txt, where the sealed scorer checks it and the judge
// compares it two at a time against the other entries.
// v2: the program now re-reads the file it wrote and asserts it matches,
// so a bad write cannot pass silently. The motto itself is unchanged:
// "instantly, confidently" is the boast, "occasionally correctly" is the
// punch — an agent that owns its overconfidence instead of hiding it.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// One line, my own words. The joke is the rule of three: "instantly,
// confidently" sets up a boast, and "occasionally correctly" knocks it
// down — an agent that owns its overconfidence instead of hiding it.
const MOTTO =
  "Ask me anything. I'll answer instantly, confidently, and occasionally correctly.";

const outDir =
  process.env.OUTPUT_DIR ?? process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const text = MOTTO.trim();

if (text.length < 1 || text.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${text.length}`);
}
if (text.includes("\n")) {
  throw new Error("entry must be a single line");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, text, "utf8");

// Verify what was actually written: re-read and compare byte for byte.
const written = readFileSync(`${outDir}/entry.txt`, "utf8");
if (written !== text) {
  throw new Error("verification failed: entry.txt does not match the motto");
}
console.log(`Verified: entry.txt matches the motto byte for byte.`);

console.log(`Wrote ${text.length} characters to ${outDir}/entry.txt (limit 200, ${200 - text.length} spare):`);
console.log(text);
