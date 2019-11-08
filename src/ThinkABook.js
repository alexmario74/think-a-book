import "./components/SearchField";
import "./components/BookList";
import "./components/ProgressBar";

import store from "./store/index";

import search from "./lib/GoogleAPI";

const template = () =>
    `<div class="container">
    <div class="row">
        <search-field />
    </div>
    <div class="row">
        <book-list/>
    </div>
</div>
<progress-bar visible="false"/>
<style>
.container {
    margin: 20px auto;
    padding: 8px;
    height: 100vh;
    width: 80%;
    font-family: Arial, Sanse-Serif;
}
.row {
    margin: 8px;
    width: 100%;
}
</style>`;

class ThinkABook extends HTMLElement {
    constructor() {
        super();

        this.sr = this.attachShadow({ mode: "open" });
        this.sr.innerHTML = template();

        this.progressBar = this.sr.querySelector("progress-bar");
        this.bookList = this.sr.querySelector("book-list");

        [
            ["SEARCH", this.performSearch.bind(this)],
            ["SEARCH", this.showProgressBar.bind(this)],
            ["RESULTS_FETCHED", this.onBooksChanged.bind(this)],
            ["RESULTS_FETCHED", this.hideProgressBar.bind(this)]
        ].forEach(([event, listener]) =>
            store.addEventListener(event, listener));

        this.attachComponentsListeners();
    }

    disconnectedCallback() {
        this.listeners.forEach(listener => listener());
    }

    async performSearch({ detail }) {
        const books = await search(detail);
        store.dispatch("RESULTS_FETCHED", books);
    }

    onBooksChanged(books) {
        this.bookList.books = books;
    }

    showProgressBar() {
        this.progressBar.setAttribute("visible", "true");
    }

    hideProgressBar() {
        this.progressBar.setAttribute("visible", "false");   
    }

    attachComponentsListeners() {
        const onSearchListener = this.onSearch.bind(this);
        this.sr.addEventListener("onSearch", onSearchListener);    
        this.listeners.push(() => this.sr.removeEventListener("onSearch", onSearchListener));
    }

    onSearch(q) {
        store.dispatch("SEARCH", q);
    }
}

customElements.define("think-a-book", ThinkABook);
