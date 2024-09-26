const apiKey = "9Ve6CJPoODdCDtN8iXBM6uePfH1EAB64R7i0aRVhkgc";

const photosWrapper = document.querySelector(".gallery-wrapper");
const loadMore = document.querySelector(".btn-more");
const searchInput = document.querySelector(".search__input");

window.onload = () => document.querySelector(".search__input").focus();


// let keyword = "";
// let page = 1;

// async function searchImages() {
//     keyword = searchBox.nodeValue;
//     const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${apiKey}`;

//     const response = await fetch(url);
//     const data = await response.json();

//     console.log(data);
// }

const perPage = 9;
let currentPage = 1;
let searchTerm = null;

const getPhotos = (apiURL) => {
    loadMore.innerText = "Loading...";
    loadMore.classList.add("disabled");
    fetch(apiURL, {
        headers: { Authorization: `Client-ID ${apiKey}` }
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        generateHTML(data);
        loadMore.innerText = "Load more";
        loadMore.classList.remove("disabled");
    })
}

const generateHTML = (photos) => {
    photosWrapper.innerHTML += photos.map(photo =>
        `<div class="card">
        <img src="${photo.urls.regular}" alt="img">
        </div>`
        ).join("");
}

const loadMorePhotos = () => {
    currentPage++;
    let apiURL = `https://api.unsplash.com/photos?page=${currentPage}&per_page=${perPage}`;
    getPhotos(apiURL);
}

const loadSearchPhotos = (e) => {
    if(e.key === "Enter") {
        currentPage = 1;
        searchTerm = e.target.value;
        photosWrapper.innerHTML = "";
        getPhotos(`https://api.unsplash.com/search/photos?page=${currentPage}&per_page=${perPage}&query=${searchTerm}`);
    }
}

getPhotos(`https://api.unsplash.com/photos?page=${currentPage}&per_page=${perPage}`);

loadMore.addEventListener("click", loadMorePhotos);
searchInput.addEventListener("keyup", loadSearchPhotos);