class SearchField extends HTMLElement {
    constructor() {
        super();

        this.sr = this.attachShadow({ mode: "open" }); 
    }

    connectedCallback() {
        const field = document.createElement("input");
        field.type = "text";

        this.sr.appendChild(field);
        
        const searchButton = document.createElement("button");
        searchButton.appendChild(document.createTextNode("Search..."));

        searchButton.onclick = _ => {
            this.dispatchEvent(
                new CustomEvent("onSearch", {
                    detail: field.value,
                    composed: true,
                    bubbles: true
                })
            );
        };

        this.sr.appendChild(searchButton);
    }
}

customElements.define("search-field", SearchField);