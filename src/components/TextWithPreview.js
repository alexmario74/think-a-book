const DEFAULT_PREVIEW = 120;

class TextWithPreview extends HTMLElement {
    constructor() {
        super();

        this.sr = this.attachShadow({ mode: "open" });
    
        this.listeners = [];
    }

    get preview() {
        let preview = this.getAttribute("preview");
        if (preview && preview.match(/^[0-9]+$/)) {
            return +preview;
        }

        return DEFAULT_PREVIEW;
    }

    connectedCallback() {
        this.sr.innerHTML = this.styles();

        const content = this.textContent;
        const previewLen = this.preview;

        if (content && content.length > previewLen) {
            const preview = document.createElement("div");
            preview.classList.add("preview");
            this.sr.appendChild(preview);
            preview.textContent = content.substring(0, previewLen);

            const fullContent = document.createElement("div");
            fullContent.classList.add("full-content");
            fullContent.classList.add("hide");
            fullContent.textContent = content;

            this.sr.appendChild(fullContent);

            this.registerToggleVisibilityEventListener(preview, fullContent);
            this.registerToggleVisibilityEventListener(fullContent, preview);
        }
    }

    disconnectedCallback() {
        this.listeners.forEach(cancel => cancel());
    }

    styles() {
        return `<style>
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

    registerToggleVisibilityEventListener(elToHide, elToShow) {
        const listener = evt => {
            const el = evt.target;
            el.classList.add("hide");
            elToShow.classList.remove("hide");
        };
        elToHide.addEventListener("click", listener);
        this.listeners.push(() => elToHide.removeEventListener("click", listener));
    }
}

customElements.define("text-with-preview", TextWithPreview);
