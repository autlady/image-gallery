const apiKey = "9Ve6CJPoODdCDtN8iXBM6uePfH1EAB64R7i0aRVhkgc";

const photosWrapper = document.querySelector(".gallery-wrapper");

// const searchForm = document.querySelector(".search__input");
// const showMore = document.querySelector(".btn-more");

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

const getPhotos = (apiURL) => {
    fetch(apiURL, {
        headers: { Authorization: `Client-ID ${apiKey}` }
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        generateHTML(data);
    })
}

const generateHTML = (photos) => {
    photosWrapper.innerHTML += photos.map(photo =>
        `<div class="card">
        <img src="${photo.urls.regular}" alt="img">
        </div>`
        ).join("");
}

getPhotos(`https://api.unsplash.com/photos?page=${currentPage}&per_page=${perPage}`);