const fs = require("fs");
const path = require("path");
const frontMatter = require("front-matter");
const marked = require("marked");

const POSTS_DIR = path.join(__dirname, "posts");
const OUTPUT_FILE = path.join(__dirname, "js", "data.js");

if (!fs.existsSync(POSTS_DIR)) {
    fs.mkdirSync(POSTS_DIR, { recursive: true });
    console.log("📁 已创建 posts 文件夹，请放入 .md 笔记。");
}
if (!fs.existsSync(path.dirname(OUTPUT_FILE))) {
    fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
}

const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));

const notes = files.map((file) => {
    const filePath = path.join(POSTS_DIR, file);
    const stat = fs.statSync(filePath);
    const content = fs.readFileSync(filePath, "utf-8");

    let attributes = {};
    let body = content;
    try {
        const parsed = frontMatter(content);
        attributes = parsed.attributes;
        body = parsed.body;
    } catch (e) {
        console.warn(`⚠️ 解析 Front Matter 失败 (${file})，使用默认值。`);
    }

    const title = attributes.title || path.basename(file, ".md");

    let date = attributes.date;
    if (!date) {
        date = stat.mtime.toISOString().split("T")[0];
    } else {
        const parsedDate = new Date(date);
        if (!isNaN(parsedDate.getTime())) {
            date = parsedDate.toISOString().split("T")[0];
        }
    }

    const tags = attributes.tags || [];

    let htmlContent = "";
    try {
        htmlContent = marked.parse(body);
    } catch (e) {
        console.error(`❌ 转换 Markdown 失败 (${file})：`, e.message);
        htmlContent = `<p>内容解析出错。</p>`;
    }

    return {
        id: path.basename(file, ".md"),
        title,
        date,
        tags,
        content: htmlContent,
    };
});

notes.sort((a, b) => (a.date > b.date ? -1 : 1));

const output = `// 由 build.js 自动生成，请勿手动编辑
export const notes = ${JSON.stringify(notes, null, 2)};
`;

fs.writeFileSync(OUTPUT_FILE, output, "utf-8");
console.log(`✅ 成功生成 ${OUTPUT_FILE}，共 ${notes.length} 篇笔记。`);
