import { notes } from "../data.js";

export function getAllNotes() {
    return notes;
}

export function getNoteById(id) {
    return notes.find((n) => n.id === id);
}

let currentId = null;
export function getCurrentId() {
    return currentId;
}

export function setCurrentId(id) {
    currentId = id;
}

let currentTag = null;
export function getCurrentTag() {
    return currentTag;
}

export function setCurrentTag(tag) {
    currentTag = tag;
}

let searchKeyword = "";
export function getSearchKeyword() {
    return searchKeyword;
}

export function setSearchKeyword(keyword) {
    searchKeyword = keyword.trim().toLowerCase();
}

export function getAllTagsWithCount() {
    const tagMap = new Map();
    notes.forEach((note) => {
        (note.tags || []).forEach((tag) => {
            tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
        });
    });
    return Array.from(tagMap.entries())
        .sort((a, b) => b[1] - a[1])
        .map(([tag, count]) => ({ tag, count }));
}

export function getFilteredNotes() {
    let result = notes;
    if (currentTag) {
        result = result.filter((note) =>
            (note.tags || []).includes(currentTag),
        );
    }
    if (searchKeyword) {
        result = result.filter((note) =>
            note.title.toLowerCase().includes(searchKeyword),
        );
    }
    return result;
}
