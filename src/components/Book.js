
import "./TextWithPreview";

class Book extends HTMLElement {
    constructor() {
        super();

        this.sr = this.attachShadow({ mode: "open"});
    }

    connectedCallback() {
        const { title, author, description, published, link } = this._book;

        this.sr.innerHTML = this.styles();

        const titleContainer = document.createElement("div");
        titleContainer.classList.add("title");

        titleContainer.innerHTML = `${title}<a href="${link}" target="_blank">&DDotrahd;</a>`;

        const authorContainer = document.createElement("div");
        authorContainer.classList.add("author");

        authorContainer.textContent = author;

        const publishedEdition = document.createElement("div");
        publishedEdition.classList.add("published");

        publishedEdition.textContent = published || "N.A.";

        const descriptionContainer = document.createElement("div");
        descriptionContainer.classList.add("description");
        descriptionContainer.innerHTML = `<text-with-preview>${description}</text-with-preview>`;
  
        this.sr.appendChild(titleContainer);
        this.sr.appendChild(authorContainer);
        this.sr.appendChild(publishedEdition);
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
.title {
    font-weight: bold;
}
.author {
    font-style: italic;
}
.description {
    margin-bottom: 50px;
}
.title, .author, .description {
    line-height: 1.6rem;
    color: #444;
}
.published {
    margin-bottom: 20px;
}
.published::before {
    content: "Published: ";
}
a[target="_blank"] {
    text-decoration: none;
    margin-left: 12px;
}
</style>`;
    }
}

customElements.define("book-info", Book);
