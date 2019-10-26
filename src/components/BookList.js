import "./Book";

class BookList extends HTMLElement {
    constructor() {
        super();

        this.sr = this.attachShadow({ mode: "open" });
        this.addEventListener("updated", this.render.bind(this));
    }

    connectedCallback() {
        this.render();
    }

    get books() {
        return this._books;
    }

    set books(books) {
        this._books = books;
        this.dispatchEvent(new CustomEvent("updated", {}));
    }

    render() {
        this.sr.innerHTML = this.styles();

        if (this._books) {
            if (this._books.length === 0) {
                const content = document.createElement("div");
                content.textContent = "No books found";
                this.sr.appendChild(content);
            } else {
                const bookList = document.createElement("ul");
                this.sr.appendChild(bookList);
                this._books.forEach(book => {
                    const container = document.createElement("li");
                    bookList.appendChild(container);

                    const bookEl = document.createElement("book-info");
                    bookEl.book = book;

                    container.appendChild(bookEl);
                });
            }
        } else {
            const content = document.createElement("div");
            content.textContent = "Please select a title";
            this.sr.appendChild(content);
        }
    }

    styles() {
        return `<style>
div {
    text-align: center;
    font-weight: center;
    font-size: 2.4rem;
}
li {
    list-style-type: none;
}
</style>`;
    }
}

customElements.define("book-list", BookList);
