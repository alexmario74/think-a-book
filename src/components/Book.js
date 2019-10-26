
class Book extends HTMLElement {
    constructor() {
        super();

        this.sr = this.attachShadow({ mode: "open"});
    }

    connectedCallback() {
        const { title, author, description } = this._book;
        
        this.sr.innerHTML = this.styles();

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

        const descriptionContainer = document.createElement("div");
        const descriptionLabel = document.createElement("span");
        descriptionLabel.textContent = "Description:";
        descriptionContainer.appendChild(descriptionLabel);
        const descriptionValue = document.createElement("span");
        descriptionValue.textContent = description;

        descriptionContainer.appendChild(descriptionValue);

        this.sr.appendChild(titleContainer);
        this.sr.appendChild(authorContainer);
        this.sr.appendChild(descriptionContainer);
    }

    set book(book) {
        this._book = book;
    }

    get book() {
        return this._book;
    }

    styles() {
        return `<style>
div {
    max-width: 90%;
}
div > span {
    margin-right: 8px;
}
span {
    line-height: 1.6rem;
    color: #444;
}
span:first-child {
    font-weight: bold;
}
div:last-child {
    margin-bottom: 50px;
}
</style>`;
    }
}

customElements.define("book-info", Book);
