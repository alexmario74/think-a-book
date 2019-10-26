import "./components/SearchField";
import "./components/BookList";

import store, { dispatch } from "./store/index";

const template = () =>
    '<div class="container">\
    <div class="row">\
        <search-field />\
    </div>\
    <div class="row">\
        <book-list/>\
    </div>\
</div>\
<style>\
.container {\
    margin: auto 20px;\
    padding: 8px;\
    height: 100vh;\
    width: 100%;\
}\
.row {\
    margin: 8px;\
    width: 100%;\
}\
</style>';

class AppContainer extends HTMLElement {
    constructor() {
        super();

        this.sr = this.attachShadow({ mode: "open" });
        this.sr.innerHTML = template();

        store.addEventListener("RESULTS_FETCHED", this.onBooksChanged.bind(this));
    }

    connectedCallback() {
        this.sr.addEventListener("onSearch", q => {
            dispatch("SEARCH", q);
        });
        this.bookList = this.sr.querySelector("book-list");
    }

    onBooksChanged(books) {
        this.bookList.books = books;
    }
}

customElements.define("app-container", AppContainer);
