import { renderList } from "./modules/list.js";
import { renderDetail } from "./modules/detail.js";
import { setCurrentId, loadNotesIndex } from "./modules/state.js";
import { initBackToTop } from "./modules/backtotop.js";

async function init() {
    await loadNotesIndex();
    function goToList() {
        renderList((id) => {
            setCurrentId(id);
            renderDetail(id, goToList);
        });
    }
    goToList();
    initBackToTop();
}

init();
