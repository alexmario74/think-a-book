import "./ThinkABook";

function render(el, app) {
    if (typeof el === "string") {
        el = document.querySelector(el);
    }

    el.innerHTML = app;
}

render("#app", "<think-a-book />");