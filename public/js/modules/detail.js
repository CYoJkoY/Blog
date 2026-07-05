import { listView, detailView } from "./dom.js";
import {
    getNoteFromCache,
    setNoteCache,
    getCurrentId,
    getNotesIndex,
    getFilteredNotes,
    setCurrentTag,
} from "./state.js";

const lightbox = document.getElementById("image-lightbox");
const lightboxImg = lightbox?.querySelector(".lightbox-img");
const lightboxClose = lightbox?.querySelector(".lightbox-close");

const langExtensionMap = {
    javascript: "js",
    js: "js",
    typescript: "ts",
    ts: "ts",
    python: "py",
    py: "py",
    html: "html",
    css: "css",
    json: "json",
    bash: "sh",
    shell: "sh",
    sh: "sh",
    markdown: "md",
    md: "md",
    c: "c",
    cpp: "cpp",
    java: "java",
    go: "go",
    rust: "rs",
    php: "php",
    ruby: "rb",
    sql: "sql",
    yaml: "yml",
    xml: "xml",
    text: "txt",
    plaintext: "txt",
};

async function loadNoteData(id) {
    let data = getNoteFromCache(id);
    if (data) return data;

    const indexEntry = getNotesIndex().find((n) => n.id === id);
    if (!indexEntry) throw new Error("笔记不存在");
    const res = await fetch(indexEntry.url);
    data = await res.json();
    setNoteCache(id, data);
    return data;
}

function generateTOC(container) {
    const headings = container.querySelectorAll("h1, h2, h3");
    if (headings.length === 0) return "";

    let tocHtml = '<nav class="toc"><h2>📑 目录</h2><ul>';
    const stack = [{ level: 0 }];

    headings.forEach((heading, index) => {
        const level = parseInt(heading.tagName.charAt(1));
        const text = heading.textContent.trim();
        const id = `heading-${index}`;
        heading.id = id;

        while (level > stack[stack.length - 1].level) {
            tocHtml += "<ul>";
            stack.push({ level });
        }

        while (level < stack[stack.length - 1].level) {
            tocHtml += "</ul>";
            stack.pop();
        }

        tocHtml += `<li><a href="#${id}">${text}</a></li>`;
    });

    while (stack.length > 1) {
        tocHtml += "</ul>";
        stack.pop();
    }
    tocHtml += "</nav>";
    return tocHtml;
}

function addCodeActions() {
    const pres = detailView.querySelectorAll(".note-content pre");
    pres.forEach((pre) => {
        if (pre.querySelector(".code-tools")) return;

        const langSpan = pre.querySelector(".code-lang");
        const codeEl = pre.querySelector("code");
        const codeText = codeEl ? codeEl.textContent : "";

        const tools = document.createElement("div");
        tools.className = "code-tools";

        const copyBtn = document.createElement("button");
        copyBtn.className = "code-action-btn";
        copyBtn.title = "复制代码";
        copyBtn.innerHTML = "⧉";
        copyBtn.addEventListener("click", async (e) => {
            e.stopPropagation();
            try {
                await navigator.clipboard.writeText(codeText);
            } catch {
                const ta = document.createElement("textarea");
                ta.value = codeText;
                document.body.appendChild(ta);
                ta.select();
                document.execCommand("copy");
                document.body.removeChild(ta);
            }
            copyBtn.innerHTML = "✓";
            copyBtn.style.color = "var(--accent-cyan)";
            setTimeout(() => {
                copyBtn.innerHTML = "⧉";
                copyBtn.style.color = "";
            }, 1200);
        });

        const downloadBtn = document.createElement("button");
        downloadBtn.className = "code-action-btn";
        downloadBtn.title = "下载代码";
        downloadBtn.innerHTML = "⤓";
        downloadBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            const lang = langSpan
                ? langSpan.textContent.trim().toLowerCase()
                : "";
            const ext = langExtensionMap[lang] || "txt";
            const blob = new Blob([codeText], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `code.${ext}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });

        tools.appendChild(copyBtn);
        tools.appendChild(downloadBtn);

        pre.appendChild(tools);
    });
}

export async function renderDetail(id, onBack) {
    let note;
    try {
        note = await loadNoteData(id);
    } catch (err) {
        detailView.innerHTML = `<p style="color: var(--text-muted);">笔记加载失败或不存在</p>`;
        return;
    }

    const filtered = getFilteredNotes();
    const currentIndex = filtered.findIndex((n) => n.id === id);
    const prevNote = currentIndex > 0 ? filtered[currentIndex - 1] : null;
    const nextNote =
        currentIndex < filtered.length - 1 ? filtered[currentIndex + 1] : null;

    const wordCount = note.content.replace(/<[^>]+>/g, "").length;
    const readTime = Math.max(1, Math.round(wordCount / 200));

    let tagsHtml = "";
    if (note.tags && note.tags.length > 0) {
        tagsHtml =
            " · " +
            note.tags
                .map(
                    (tag) =>
                        `<span class="note-tag" data-tag="${tag}">#${tag}</span>`,
                )
                .join(" ");
    }

    let navHtml = `<div class="post-nav">`;
    navHtml += prevNote
        ? `<a class="nav-prev" data-id="${prevNote.id}">← ${prevNote.title}</a>`
        : `<span class="nav-placeholder"></span>`;
    navHtml += nextNote
        ? `<a class="nav-next" data-id="${nextNote.id}">${nextNote.title} →</a>`
        : `<span class="nav-placeholder"></span>`;
    navHtml += `</div>`;

    detailView.innerHTML = `
        <div class="back-link" id="back-link">← 返回列表</div>
        <article>
            <header class="post-header">
                <h1>${note.title}</h1>
                <div class="post-meta">
                    <span class="post-date">📅 ${note.date}</span>
                    ${tagsHtml}
                    <span class="post-read-time">⏱ ${readTime} min read</span>
                </div>
            </header>
            <div class="note-content">${note.content}</div>
        </article>
        ${navHtml}
    `;

    const contentDiv = detailView.querySelector(".note-content");
    const tocHtml = generateTOC(contentDiv);
    if (tocHtml) {
        contentDiv.insertAdjacentHTML("afterbegin", tocHtml);
    }

    addCodeActions();

    detailView.querySelector("#back-link").addEventListener("click", () => {
        if (typeof onBack === "function") onBack();
    });

    detailView.querySelectorAll(".note-tag").forEach((el) => {
        el.addEventListener("click", function (e) {
            e.stopPropagation();
            const tag = this.dataset.tag;
            setCurrentTag(tag);
            if (typeof onBack === "function") onBack();
        });
    });

    detailView.querySelectorAll(".nav-prev, .nav-next").forEach((el) => {
        el.addEventListener("click", function () {
            const targetId = this.dataset.id;
            renderDetail(targetId, onBack);
        });
    });

    detailView.querySelectorAll(".note-content img").forEach((img) => {
        img.style.cursor = "zoom-in";
        img.addEventListener("click", function () {
            if (!lightbox || !lightboxImg) return;
            lightboxImg.src = this.src;
            lightbox.classList.add("active");
        });
    });

    if (lightbox) {
        lightbox.addEventListener("click", function (e) {
            if (e.target === lightbox || e.target === lightboxClose) {
                lightbox.classList.remove("active");
                lightboxImg.src = "";
            }
        });

        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape" && lightbox.classList.contains("active")) {
                lightbox.classList.remove("active");
                lightboxImg.src = "";
            }
        });
    }

    listView.style.display = "none";
    detailView.style.display = "block";
    window.scrollTo({ top: 0, behavior: "smooth" });
}
