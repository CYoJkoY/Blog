const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const frontMatter = require("front-matter");
const marked = require("marked");
const hljs = require("highlight.js");

const POSTS_DIR = path.join(__dirname, "public", "posts");
const OUTPUT_DIR = path.join(__dirname, "public", "data");
const NOTES_DIR = path.join(OUTPUT_DIR, "notes");
const INDEX_PATH = path.join(OUTPUT_DIR, "index.json");
const CACHE_PATH = path.join(__dirname, ".buildcache.json");

[OUTPUT_DIR, NOTES_DIR].forEach((dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`📁 创建目录：${dir}`);
    }
});

let cache = {};
if (fs.existsSync(CACHE_PATH)) {
    try {
        cache = JSON.parse(fs.readFileSync(CACHE_PATH, "utf-8"));
    } catch (e) {
        console.warn("⚠️ 缓存文件损坏，将重新构建所有笔记。");
        cache = {};
    }
}

const renderer = new marked.Renderer();
renderer.code = function (code) {
    let codeStr, lang;
    if (typeof code === "object" && code !== null) {
        codeStr = code.text || "";
        lang = code.lang || "";
    } else {
        codeStr = String(code);
        lang = "";
    }

    const langMarker = codeStr.match(/^<!--lang:(\w+)-->\n/);
    if (langMarker) {
        lang = langMarker[1];
        codeStr = codeStr.slice(langMarker[0].length);
    }

    let highlighted;
    if (lang) {
        try {
            highlighted = hljs.highlight(codeStr, { language: lang }).value;
        } catch (e) {
            highlighted = codeStr;
        }
    } else {
        highlighted = codeStr;
    }

    const langLabel = lang ? `<span class="code-lang">${lang}</span>` : "";
    return `<pre><code class="hljs language-${lang}">${highlighted}</code>${langLabel}</pre>`;
};

if (!fs.existsSync(POSTS_DIR)) {
    console.error(`❌ 文章目录不存在：${POSTS_DIR}`);
    process.exit(1);
}
const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));

const notesIndex = [];
let cacheChanged = false;
let addedCount = 0;
let cachedCount = 0;

for (const file of files) {
    const filePath = path.join(POSTS_DIR, file);
    const stat = fs.statSync(filePath);
    const rawContent = fs.readFileSync(filePath, "utf-8");
    const contentHash = crypto
        .createHash("sha256")
        .update(rawContent)
        .digest("hex")
        .slice(0, 7);

    const cached = cache[file];
    if (
        cached &&
        cached.hash === contentHash &&
        cached.lastModified === stat.mtimeMs
    ) {
        notesIndex.push({
            id: cached.id,
            title: cached.title,
            date: cached.date,
            tags: cached.tags,
            summary: cached.summary,
            url: `/data/notes/${cached.outputFile}`,
        });
        cachedCount++;
        console.log(`⏩ 缓存命中：${file}`);
        continue;
    }

    console.log(`🔄 处理：${file}`);
    let attributes = {};
    let body = rawContent;
    try {
        const parsed = frontMatter(rawContent);
        attributes = parsed.attributes;
        body = parsed.body;
    } catch (e) {
        console.warn(`⚠️ 解析 Front Matter 失败 (${file})，使用默认值。`);
    }

    const id = path.basename(file, ".md").replace(/\s+/g, "-");
    const title = attributes.title || id;

    let date = attributes.date;
    if (!date) {
        date = stat.mtime.toISOString().split("T")[0];
        console.log(`📅 未指定日期，使用文件修改时间：${date}`);
    } else {
        const parsedDate = new Date(date);
        if (!isNaN(parsedDate.getTime())) {
            date = parsedDate.toISOString().split("T")[0];
        } else {
            console.warn(`⚠️ 无效日期格式 (${date})，回退为文件修改时间。`);
            date = stat.mtime.toISOString().split("T")[0];
        }
    }

    const tags = attributes.tags || [];

    const processedBody = body.replace(
        /!\[(.*?)\]\((.+?)(?:\s*=\s*(\d+)x(\d+))?\)/g,
        (match, alt, url, w, h) => {
            if (
                url.startsWith("http") ||
                url.startsWith("//") ||
                url.startsWith("/")
            ) {
                return match;
            }

            let cleanUrl = url.replace(/^\.\//, "");

            let imgSrc = `/posts/${cleanUrl}`;

            if (w && h) {
                return `<img src="${imgSrc}" alt="${alt}" width="${w}" height="${h}" style="width:${w}px;height:${h}px;">`;
            }
            return `![${alt}](${imgSrc})`;
        },
    );

    let htmlContent = "";
    try {
        htmlContent = marked.parse(processedBody, { renderer });
    } catch (e) {
        console.error(`❌ 转换 Markdown 失败 (${file})：`, e.message);
        htmlContent = `<p>内容解析出错。</p>`;
    }

    const plainText = htmlContent.replace(/<[^>]+>/g, "");
    const summary = plainText.slice(0, 200).replace(/\s+/g, " ").trim();

    const outputFile = `note-${id}-${contentHash}.json`;
    const outputPath = path.join(NOTES_DIR, outputFile);
    const noteData = { id, title, date, tags, content: htmlContent };

    try {
        fs.writeFileSync(outputPath, JSON.stringify(noteData));
        console.log(`✅ 输出：${outputPath}`);
    } catch (e) {
        console.error(`❌ 写入失败 (${file})：`, e.message);
        continue;
    }

    if (cached && cached.outputFile !== outputFile) {
        const oldPath = path.join(NOTES_DIR, cached.outputFile);
        if (fs.existsSync(oldPath)) {
            fs.unlinkSync(oldPath);
            console.log(`🗑️ 删除旧文件：${cached.outputFile}`);
        }
    }

    cache[file] = {
        hash: contentHash,
        lastModified: stat.mtimeMs,
        outputFile,
        id,
        title,
        date,
        tags,
        summary,
    };
    cacheChanged = true;
    addedCount++;

    notesIndex.push({
        id,
        title,
        date,
        tags,
        summary,
        url: `data/notes/${outputFile}`,
    });
}

notesIndex.sort((a, b) => (a.date > b.date ? -1 : 1));

try {
    fs.writeFileSync(INDEX_PATH, JSON.stringify(notesIndex));
    console.log(`📋 索引已写入：${INDEX_PATH}`);
    fs.writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2));
    console.log(`💾 缓存已更新：${CACHE_PATH}`);
} catch (e) {
    console.error("❌ 写入索引或缓存失败：", e.message);
    process.exit(1);
}

console.log(
    `✅ 构建完成！共 ${notesIndex.length} 篇笔记，新增/更新 ${addedCount} 篇，缓存命中 ${cachedCount} 篇。`,
);
