let notesIndex = [];
let noteCache = new Map();
let currentId = null;
let currentTag = null;
let searchKeyword = "";

export async function loadNotesIndex() {
    const res = await fetch(`data/index.json?_t=${Date.now()}`);
    notesIndex = await res.json();
    return notesIndex;
}

export function getNotesIndex() {
    return notesIndex;
}

export function getNoteFromCache(id) {
    return noteCache.get(id);
}

export function setNoteCache(id, data) {
    noteCache.set(id, data);
}

export function getCurrentId() {
    return currentId;
}
export function setCurrentId(id) {
    currentId = id;
}
export function getCurrentTag() {
    return currentTag;
}
export function setCurrentTag(tag) {
    currentTag = tag;
}
export function getSearchKeyword() {
    return searchKeyword;
}
export function setSearchKeyword(keyword) {
    searchKeyword = keyword.trim().toLowerCase();
}

export function getAllTagsWithCount() {
    const tagMap = new Map();
    notesIndex.forEach((note) => {
        (note.tags || []).forEach((tag) => {
            tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
        });
    });
    return Array.from(tagMap.entries())
        .sort((a, b) => b[1] - a[1])
        .map(([tag, count]) => ({ tag, count }));
}

export function getFilteredNotes() {
    let result = notesIndex;
    if (currentTag) {
        result = result.filter((note) => note.tags.includes(currentTag));
    }
    if (searchKeyword) {
        result = result.filter((note) =>
            note.title.toLowerCase().includes(searchKeyword),
        );
    }
    return result;
}
