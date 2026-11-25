import fs from "node:fs";
import path from "node:path";

const postsDir = path.resolve("radar/posts");
const outputFile = path.resolve("radar/index.json");

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const rawVal = line.slice(idx + 1).trim();
    data[key] = rawVal.replace(/^["']|["']$/g, "");
  }
  return data;
}

const files = fs.existsSync(postsDir)
  ? fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"))
  : [];

const posts = files
  .map((file) => {
    const filePath = path.join(postsDir, file);
    const raw = fs.readFileSync(filePath, "utf8");
    const meta = parseFrontmatter(raw);
    const slug = file.replace(/\.md$/, "");
    const timestamp = meta.date || fs.statSync(filePath).mtime.toISOString();
    return {
      slug,
      file,
      title: meta.title || slug,
      date: timestamp,
      working_on: meta.working_on || "",
      goal: meta.goal || "",
      interests: meta.interests || "",
      summary: meta.summary || "",
    };
  })
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

fs.writeFileSync(outputFile, JSON.stringify(posts, null, 2) + "\n");
console.log(`Updated ${outputFile} with ${posts.length} post(s).`);
