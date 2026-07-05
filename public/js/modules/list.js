import { listView, detailView } from "./dom.js";
import {
    getFilteredNotes,
    getAllTagsWithCount,
    getCurrentTag,
    setCurrentTag,
    getSearchKeyword,
    setSearchKeyword,
    getNotesIndex,
} from "./state.js";

let searchTimer = null;

export function renderList(onSelect) {
    const allNotes = getFilteredNotes();
    const allTags = getAllTagsWithCount();
    const currentTag = getCurrentTag();
    const searchKeyword = getSearchKeyword();

    const searchBar = document.getElementById("search-bar");

    let searchInput = document.getElementById("search-input");
    if (!searchInput) {
        searchBar.innerHTML = `
            <input type="text" id="search-input" placeholder="🔍 搜索标题..." value="${searchKeyword}" />
            <span class="note-count">共 ${allNotes.length} 篇</span>
        `;
        searchInput = document.getElementById("search-input");

        bindSearchEvents(searchInput, onSelect);
    } else {
        searchInput.value = searchKeyword;
        const countSpan = searchBar.querySelector(".note-count");
        if (countSpan) countSpan.textContent = `共 ${allNotes.length} 篇`;
    }

    const tagBar = document.getElementById("tag-bar");
    let tagHtml = "";
    const totalCount = getNotesIndex().length;
    tagHtml += `<span class="tag-item ${!currentTag ? "active" : ""}" data-tag="">全部 (${totalCount})</span>`;
    allTags.forEach(({ tag, count }) => {
        const active = tag === currentTag ? "active" : "";
        tagHtml += `<span class="tag-item ${active}" data-tag="${tag}">${tag} (${count})</span>`;
    });
    tagBar.innerHTML = tagHtml;

    tagBar.querySelectorAll(".tag-item").forEach((el) => {
        el.addEventListener("click", function () {
            const tag = this.dataset.tag || null;
            setCurrentTag(tag);
            renderList(onSelect);
        });
    });

    const noteList = document.getElementById("note-list");
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
    noteList.innerHTML = listHtml;

    noteList.querySelectorAll(".note-item").forEach((el) => {
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

function bindSearchEvents(input, onSelect) {
    input.addEventListener("input", function () {
        clearTimeout(searchTimer);

        if (this.dataset.composing === "true") return;
        searchTimer = setTimeout(() => {
            setSearchKeyword(this.value);
            renderList(onSelect);
        }, 200);
    });

    input.addEventListener("compositionstart", function () {
        this.dataset.composing = "true";
    });

    input.addEventListener("compositionend", function () {
        this.dataset.composing = "false";

        clearTimeout(searchTimer);
        setSearchKeyword(this.value);
        renderList(onSelect);
    });
}
