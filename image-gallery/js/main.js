const apiKey = "9Ve6CJPoODdCDtN8iXBM6uePfH1EAB64R7i0aRVhkgc";

const photosWrapper = document.querySelector(".gallery-wrapper");
const loadMore = document.querySelector(".btn-more");
const searchInput = document.querySelector(".search__input");
const searchBtn = document.querySelector(".search__icon");
const deleteBtn = document.querySelector(".close__icon");
const photoWindow = document.querySelector(".photo-window");
const closeBtn = document.querySelector(".btn-close-preview");

//при открытии приложения курсор находится в поле ввода
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

//получаем фото по api
const getPhotos = (apiURL) => {
    loadMore.innerText = "Loading...";
    loadMore.classList.add("disabled");
    fetch(apiURL, {
        headers: { Authorization: `Client-ID ${apiKey}` }
    })
    .then(res => res.json())
    .then(data => {
        generateHTML(data);
        loadMore.innerText = "Load more";
        loadMore.classList.remove("disabled");
    }).catch(() => alert("Failed to load photos"));
}

//показываем превью фото
const showPhoto = (img) => {
    photoWindow.querySelector("img").src = img;
    photoWindow.classList.add("show");
    document.body.classList.add("noscroll");
}

//закрываем превью фото
const closePhoto = () => {
    photoWindow.classList.remove("show");
    document.body.classList.remove("noscroll");
}

//делаем из полученных фото карточки и добавляем в photosWrapper
const generateHTML = (photos) => {
    const photoResult = photos.results ? photos.results : photos;
    photosWrapper.innerHTML += photoResult.map(photo =>
        `<div class="card" onclick="showPhoto('${photo.urls.full}')">
        <img src="${photo.urls.regular}" alt="img">
        </div>`
        ).join("");
}


const loadMorePhotos = () => {
    currentPage++;
    let apiURL = `https://api.unsplash.com/photos?page=${currentPage}&per_page=${perPage}`;
    apiURL = searchTerm ? `https://api.unsplash.com/search/photos?page=${currentPage}&per_page=${perPage}&query=${searchTerm}` : apiURL;
    getPhotos(apiURL);
}

const loadSearchPhotos = (e) => {
    if(e.target.value === "") return searchTerm = null;
    if(e.key === "Enter") {
        currentPage = 1;
        searchTerm = e.target.value;
        photosWrapper.innerHTML = "";
        getPhotos(`https://api.unsplash.com/search/photos?page=${currentPage}&per_page=${perPage}&query=${searchTerm}`);
    }
}

getPhotos(`https://api.unsplash.com/photos?page=${currentPage}&per_page=${perPage}`);

//работа кнопки Load more
loadMore.addEventListener("click", loadMorePhotos);

//поисковый запрос можно отправить нажатием клавиши Enter
searchInput.addEventListener("keyup", loadSearchPhotos);

//клик по лупе
searchBtn.addEventListener("click", function () {
    currentPage = 1;
    searchTerm = searchInput.value;
    photosWrapper.innerHTML = "";
    getPhotos(`https://api.unsplash.com/search/photos?page=${currentPage}&per_page=${perPage}&query=${searchTerm}`);
});

//клик по крестику
deleteBtn.addEventListener("click", function () {
    searchInput.value = "";
    searchInput.focus();
})

//закрытие превью
closeBtn.addEventListener("click", closePhoto);

photoWindow.addEventListener("click", function (e) {
    if (e.target == e.currentTarget) {
        closePhoto();
    }
})