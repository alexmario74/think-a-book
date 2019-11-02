class ProgressBar extends HTMLElement {
    constructor() {
        super();

        this.sr = this.attachShadow({ mode: "open" });
    }
    
    connectedCallback() {
        if (this.isVisible()) {
            this.render();
        }
    }

    disconnectedCallback() {
        clearInterval(this.countProgress);
    }

    static get observedAttributes() {
        return ["visible"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "visible") {
            if (oldValue === newValue) {
                return;
            }

            const visible = newValue === "true";

            if (visible) {
                this.render();
            } else {
                this.sr.innerHTML = "";
            }
        }
    }

    render() {
        this.sr.innerHTML = this.styles();
        
        const container = document.createElement("div");
        container.classList.add("progress-bar-overlay");

        this.sr.appendChild(container);

        const bar = document.createElement("div");
        bar.classList.add("progress-bar");

        container.appendChild(bar);

        const stick = document.createElement("div");
        stick.classList.add("stick");

        bar.appendChild(stick);
        this.countProgress = setInterval(() => {
            let p = stick.style.left ? +stick.style.left.replace(/px$/,"") : 0;
            p += 18;

            if (p > bar.offsetWidth) {
                p = 0;
            }
            stick.style.left = `${p}px`;
        }, 90);
    }

    styles() {
        return `<style>
        .progress-bar-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            background-color: #444;
            opacity: .7;
            z-index: 99999;
            text-align: center;
        }
        .progress-bar {
            position: relative;
            left: 30%;
            top: 44%;
            background-color: #eee;
            width: 40%;
            height: 45px;
            z-index: 999999;
            box-sizing: box-model;
            opacity: 1;
            overflow: hidden;
            border-radius: 8px;
        }
        .stick {
            position: relative;
            top: 0px;
            left: 0px;
            width: 10%;
            height: 100%;
            background: linear-gradient(0deg, #fff 0%, #00ff00 50%, #fff 100%);
        }
        </style>`;
    }

    isVisible() {
        return this.getAttribute("visible") === "true";
    }
}

customElements.define("progress-bar", ProgressBar);
