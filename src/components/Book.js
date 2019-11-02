
class Book extends HTMLElement {
    constructor() {
        super();

        this.sr = this.attachShadow({ mode: "open"});
    }

    connectedCallback() {
        const { title, author, description } = this._book;
        
        this.sr.innerHTML = this.styles();

        const titleContainer = document.createElement("div");
        titleContainer.classList.add("title");

        titleContainer.textContent = title;

        const authorContainer = document.createElement("div");
        authorContainer.classList.add("author");

        authorContainer.textContent = author;

        const descriptionContainer = document.createElement("div");
        descriptionContainer.classList.add("description");
        if (description && description.length > 120) {
            const preview = document.createElement("div");
            preview.classList.add("preview");
            descriptionContainer.appendChild(preview);
            preview.textContent = description.substring(0, 120);

            const fullContent = document.createElement("div");
            fullContent.classList.add("full-content");
            fullContent.classList.add("hide");
            fullContent.textContent = description;

            descriptionContainer.appendChild(fullContent);

            preview.addEventListener("click", evt => {
                const el = evt.target;
                el.classList.add("hide");
                fullContent.classList.remove("hide");
            });

            fullContent.addEventListener("click", evt => {
                const el = evt.target;
                el.classList.add("hide");
                preview.classList.remove("hide");
            });
        } else {
            descriptionContainer.textContent = !description || description.length === 0 ? " - " : description;
        }

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
.preview, .full-content {
    pointer-events: none;
}
.preview::after {
    content: " ...Show more";
    font-weight: bold;
    pointer-events: auto;
}
.full-content::after {
    content: " ...Show less";
    font-weight: bold;
    pointer-events: auto;
}
.hide {
    display: none;
}
</style>`;
    }
}

customElements.define("book-info", Book);
