class SearchField extends HTMLElement {
    constructor() {
        super();

        this.sr = this.attachShadow({ mode: "open" }); 
    }

    connectedCallback() {
        const container = document.createElement("div");
        container.innerHTML = this.styles();

        const field = document.createElement("input");
        field.type = "text";

        container.appendChild(field);
        
        const searchButton = document.createElement("button");
        searchButton.textContent = "Search...";

        searchButton.onclick = _ =>
            this.dispatchEvent(
                new CustomEvent("onSearch", {
                    detail: field.value,
                    composed: true,
                    bubbles: true
                })
            );

        container.appendChild(searchButton);

        this.sr.appendChild(container);
    }

    styles() {
        return `<style>
div {
    width: 100%;
    line-height: 3.2rem;
    text-align: center;
    margin-bottom: 50px;
}
input, button {
    font-size: 1.2rem;
    line-height: 2.4rem;
}
input {
    width: 40%;
    border: none;
    border-bottom: solid 2px #888;
}
input:focus, button:focus {
    outline: none;
}
button {
    border: none;
    color: #eee;
    background-color: #888;
    border-bottom: solid 2px #888;
    border-top-right-radius: 10% 40%;
    border-bottom-right-radius: 50% 20%;
}
button:hover {
    box-shadow: 3px 3px 6px #bbb;
}
</style>`;
    }
}

customElements.define("search-field", SearchField);