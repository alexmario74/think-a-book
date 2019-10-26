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
        this.sr.innerHTML = "";

        if (this._books) {
            const bookList = document.createElement("ul");
            this.sr.appendChild(bookList);
            if (this._books.length === 0) {
                this.sr.appendChild(document.createTextNode("No books found"));
            } else {
                this._books.forEach(book => {
                    const container = document.createElement("li");
                    bookList.appendChild(container);

                    const bookEl = document.createElement("book-info");
                    bookEl.book = book;

                    container.appendChild(bookEl);
                });
            }
        } else {
            this.sr.appendChild(document.createTextNode("Please select a title"));
        }
    }
}

customElements.define("book-list", BookList);
