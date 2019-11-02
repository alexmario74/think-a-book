import "./components/SearchField";
import "./components/BookList";
import "./components/ProgressBar";

import store from "./store/index";

import search from "./lib/GoogleAPI";

const template = () =>
    '<div class="container">\
    <div class="row">\
        <search-field />\
    </div>\
    <div class="row">\
        <book-list/>\
    </div>\
</div>\
<progress-bar visible="false"/>\
<style>\
.container {\
    margin: 20px auto;\
    padding: 8px;\
    height: 100vh;\
    width: 80%;\
}\
.row {\
    margin: 8px;\
    width: 100%;\
}\
</style>';

class ThinkABook extends HTMLElement {
    constructor() {
        super();

        this.sr = this.attachShadow({ mode: "open" });
        this.sr.innerHTML = template();

        this.progressBar = this.sr.querySelector("progress-bar");

        store.addEventListener("SEARCH", this.performSearch.bind(this));
        store.addEventListener("RESULTS_FETCHED", this.onBooksChanged.bind(this));
    }

    connectedCallback() {
        this.sr.addEventListener("onSearch", q =>
            store.dispatch("SEARCH", q));
        this.bookList = this.sr.querySelector("book-list");
    }

    async performSearch({ detail }) {
        this.progressBar.setAttribute("visible", "true");
        const books = await search(detail);
        store.dispatch("RESULTS_FETCHED", books);
    }

    onBooksChanged(books) {
        this.bookList.books = books;
        this.progressBar.setAttribute("visible", "false");
    }
}

customElements.define("think-a-book", ThinkABook);
