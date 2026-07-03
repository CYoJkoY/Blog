import { listView, detailView } from "./dom.js";
import { getNoteById, getAllNotes, setCurrentTag } from "./state.js";

const lightbox = document.getElementById("image-lightbox");
const lightboxImg = lightbox?.querySelector(".lightbox-img");
const lightboxClose = lightbox?.querySelector(".lightbox-close");

export function renderDetail(id, onBack) {
    const note = getNoteById(id);
    if (!note) {
        detailView.innerHTML = `<p style="color: var(--text-muted);">笔记不存在</p>`;
        return;
    }

    const allNotes = getAllNotes();
    const currentIndex = allNotes.findIndex((n) => n.id === id);
    const prevNote = currentIndex > 0 ? allNotes[currentIndex - 1] : null;
    const nextNote =
        currentIndex < allNotes.length - 1 ? allNotes[currentIndex + 1] : null;

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
    if (prevNote) {
        navHtml += `<a class="nav-prev" data-id="${prevNote.id}">← ${prevNote.title}</a>`;
    } else {
        navHtml += `<span class="nav-placeholder"></span>`;
    }

    if (nextNote) {
        navHtml += `<a class="nav-next" data-id="${nextNote.id}">${nextNote.title} →</a>`;
    } else {
        navHtml += `<span class="nav-placeholder"></span>`;
    }

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

    detailView.querySelector("#back-link").addEventListener("click", () => {
        if (typeof onBack === "function") {
            onBack();
        }
    });

    detailView.querySelectorAll(".note-tag").forEach((el) => {
        el.addEventListener("click", function (e) {
            e.stopPropagation();
            const tag = this.dataset.tag;
            if (tag) {
                setCurrentTag(tag);
                if (typeof onBack === "function") {
                    onBack();
                }
            }
        });
    });

    detailView.querySelectorAll(".nav-prev, .nav-next").forEach((el) => {
        el.addEventListener("click", function () {
            const targetId = this.dataset.id;
            if (targetId) {
                renderDetail(targetId, onBack);
            }
        });
    });

    listView.style.display = "none";
    detailView.style.display = "block";

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

    window.scrollTo({ top: 0, behavior: "smooth" });
}
