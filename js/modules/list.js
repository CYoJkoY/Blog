import { listView, detailView } from "./dom.js";
import {
    getFilteredNotes,
    getAllTagsWithCount,
    getCurrentTag,
    setCurrentTag,
    getSearchKeyword,
    setSearchKeyword,
    getAllNotes,
} from "./state.js";

export function renderList(onSelect) {
    const allNotes = getFilteredNotes();
    const allTags = getAllTagsWithCount();
    const currentTag = getCurrentTag();
    const searchKeyword = getSearchKeyword();

    let searchHtml = `
        <div class="search-bar">
            <input type="text" id="search-input" placeholder="🔍 搜索标题..." value="${searchKeyword}" />
            <span class="note-count">共 ${allNotes.length} 篇</span>
        </div>
    `;

    let tagHtml = `<div class="tag-bar">`;
    const totalCount = getAllNotes().length;
    tagHtml += `<span class="tag-item ${!currentTag ? "active" : ""}" data-tag="">全部 (${totalCount})</span>`;
    allTags.forEach(({ tag, count }) => {
        const active = tag === currentTag ? "active" : "";
        tagHtml += `<span class="tag-item ${active}" data-tag="${tag}">${tag} (${count})</span>`;
    });
    tagHtml += `</div>`;

    let listHtml = "";
    if (allNotes.length === 0) {
        listHtml = '<p class="empty-state">没有找到匹配的笔记</p>';
    } else {
        allNotes.forEach((note) => {
            let tagsHtml = "";
            if (note.tags && note.tags.length > 0) {
                tagsHtml =
                    " · " +
                    note.tags
                        .map((tag) => `<span class="note-tag">#${tag}</span>`)
                        .join(" ");
            }
            listHtml += `
                <div class="note-item" data-id="${note.id}">
                    <div class="title">${note.title}</div>
                    <div class="meta">${note.date}${tagsHtml}</div>
                </div>
            `;
        });
    }

    listView.innerHTML = searchHtml + tagHtml + listHtml;

    const searchInput = document.getElementById("search-input");
    if (searchInput) {
        searchInput.addEventListener("input", function () {
            setSearchKeyword(this.value);
            renderList(onSelect);
        });
    }

    listView.querySelectorAll(".tag-item").forEach((el) => {
        el.addEventListener("click", function () {
            const tag = this.dataset.tag || null;
            setCurrentTag(tag);
            renderList(onSelect);
        });
    });

    listView.querySelectorAll(".note-item").forEach((el) => {
        el.addEventListener("click", function () {
            const id = this.dataset.id;
            if (typeof onSelect === "function") {
                onSelect(id);
            }
        });
    });

    listView.style.display = "block";
    detailView.style.display = "none";
}
