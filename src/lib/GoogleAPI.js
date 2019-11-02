const GOOGLE_API_ENDPOINT = "https://www.googleapis.com/books/v1/volumes";

async function search(term) {
    const query = term.trim();

    return fetch(buildURL(query))
        .then(response => response.json())
        .then(toBookList)
        .catch(e => console.error("Google API error:", e));
}

function buildURL(q) {
    return GOOGLE_API_ENDPOINT + "?q=" + encodeURIComponent(q);
}

function toBookList({ items }) {
    return items
        .map(({ volumeInfo }) => ({
            title: volumeInfo.title,
            author: (volumeInfo.authors || []).join(", "),
            description: volumeInfo.description,
            published: volumeInfo.publishedDate,
            link: volumeInfo.canonicalVolumeLink,
        }));
}

export default search;
