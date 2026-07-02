import { renderList } from "./modules/list.js";
import { renderDetail } from "./modules/detail.js";
import { setCurrentId } from "./modules/state.js";
import { initBackToTop } from "./modules/backtotop.js";

function goToList() {
    renderList((id) => {
        setCurrentId(id);
        renderDetail(id, goToList);
    });
}

goToList();
initBackToTop();
