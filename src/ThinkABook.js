import "./components/SearchField";
import "./components/BookList";
import "./components/ProgressBar";

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

        this.listeners = [];
    }

    disconnectedCallback() {
        this.listeners.forEach(listener => listener());
    }

    showProgressBar() {
        this.progressBar.setAttribute("visible", "true");
    }

    hideProgressBar() {
        this.progressBar.setAttribute("visible", "false");   
    }

    connectedCallback() {
        const onSearchListener = ev => {
            this.showProgressBar();

            this.dispatchEvent(
                new CustomEvent("onSearch", {
                    detail: ev.detail,
                    composed: true,
                    bubbles: true
                })
            );
        };

        this.sr.addEventListener("onSearch", onSearchListener);
        this.listeners.push(() => this.sr.removeEventListener("onSearch", onSearchListener));
    }

    set books(books) {
        this.bookList.books = books;
        if (Boolean(this.progressBar.getAttribute("visible"))) {
            this.hideProgressBar();
        }
    }
}

customElements.define("think-a-book", ThinkABook);
