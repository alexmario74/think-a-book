
class Book extends HTMLElement {
    constructor() {
        super();

        this.sr = this.attachShadow({ mode: "open"});
    }

    connectedCallback() {
        const { title, author, year } = this._book;
        
        const titleContainer = document.createElement("div");
        const titleLabel = document.createElement("span");
        titleLabel.textContent = "Title:";
        titleContainer.appendChild(titleLabel);
        const bookTitle = document.createElement("span");
        bookTitle.textContent = title;

        titleContainer.appendChild(bookTitle);

        const authorContainer = document.createElement("div");
        const authorLabel = document.createElement("span");
        authorLabel.textContent = "Author:";
        authorContainer.appendChild(authorLabel);
        const authorName = document.createElement("span");
        authorName.textContent = author;

        authorContainer.appendChild(authorName);

        const yearContainer = document.createElement("div");
        const yearLabel = document.createElement("span");
        yearLabel.textContent = "Year:";
        yearContainer.appendChild(yearLabel);
        const yearValue = document.createElement("span");
        yearValue.textContent = year;

        yearContainer.appendChild(yearValue);

        this.sr.appendChild(titleContainer);
        this.sr.appendChild(authorContainer);
        this.sr.appendChild(yearContainer);
    }

    set book(book) {
        this._book = book;
    }

    get book() {
        return this._book;
    }
}

customElements.define("book-info", Book);
