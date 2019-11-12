import store from "./store/index";

import search from "./lib/GoogleAPI";

import "./ThinkABook";

const el = document.querySelector("#app");
const ThinkABook = document.createElement("think-a-book");

el.appendChild(ThinkABook);

ThinkABook.addEventListener("onSearch", ev => {
    const q = ev.detail;
    store.dispatch("SEARCH", q);
});

store.withActions([
    ["SEARCH", async (term) => {
        const books = await search(term);
        store.dispatch("RESULTS_FETCHED", books);
    }],
    ["RESULTS_FETCHED", books => ThinkABook.books = books]
]);
