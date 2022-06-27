import './css/styles.css';


// Import searching function
import { fetchImages } from './js/fetchImage';


import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';


import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';


// Input and output elements
const searchForm = document.querySelector(".search-form");
const searchInput = document.querySelector(".search-form__input");
const loadMoreImgBtn = document.querySelector(".load-more");
const gallery = document.querySelector(".gallery");

let pageNumber;
let displayedImages;
let totalOfHits;
let lightbox;

// Start searching after submit
searchForm.addEventListener("submit", newSearch);

// Load more images after clicking button Load more
loadMoreImgBtn.addEventListener("click", loadMoreImg);

// Clear old search resoult
function newSearch(e) {
    e.preventDefault();
    loadMoreImgBtn.style.display = "none"
    pageNumber = 1;
    displayedImages = 0;
    searchingImages();
    gallery.innerHTML = "";
}

// Pagination of resoult
function loadMoreImg() {
    pageNumber += 1;
    searchingImages();
}

// Definition of the image search function contained in the backend
function searchingImages() {
    fetchImages(searchInput.value, pageNumber)
        .then(images => {
            renderImages(images);
        })
        .catch(error => console.log(error));
}

// Definition of the images rendering function based on the data taken from the backend
function renderImages({ hits, totalHits }) {
    totalOfHits = totalHits;

    const markups = hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
  <div class="gallery__item">
    <a class="gallery__link" href="${largeImageURL}"><img class="gallery__img" src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
    <div class="gallery__info">
      <p class="info__item">
        <b class="info__label">Likes</b>
        <span class="info__data">${likes}</span>
      </p>
      <p class="info__item">
        <b class="info__label">Views</b>
        <span class="info__data">${views}</span>
      </p>
      <p class="info__item">
        <b class="info__label">Comments</b>
        <span class="info__data">${comments}</span>
      </p>
      <p class="info__item">
        <b class="info__label">Downloads</b>
        <span class="info__data">${downloads}</span>
      </p>
    </div>
  </div>
  `)
        .join("");

    gallery.insertAdjacentHTML("beforeend", markups);

    if (typeof lightbox === "object") {
        lightbox.destroy();
    }

    lightbox = new SimpleLightbox(".gallery__item a");

    displayedImages += hits.length;
    checkingForImagesLeft();

    if (displayedImages === 0) {
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    } else if (displayedImages > 0 && displayedImages === totalOfHits && pageNumber === 1) {
        Notiflix.Notify.info(`Hooray! We found ${totalOfHits} images, but you've reached the end of search results.`);
    }
    else if (displayedImages > 0 && displayedImages === totalOfHits) {
                Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    } else if (displayedImages > 0 && pageNumber === 1) {
        Notiflix.Notify.success(`Hooray! We found ${totalOfHits} images.`);
    }

    if (pageNumber > 1) {
        const { height: cardHeight } = document
            .querySelector('.gallery .gallery__item').getBoundingClientRect();

        window.scrollBy({
            top: cardHeight * 2,
            behavior: 'smooth',
        });
    }
}

// Hidding Load More button
function checkingForImagesLeft() {
    if (totalOfHits === displayedImages) {
        loadMoreImgBtn.style.display = "none";
    } else {
        loadMoreImgBtn.style.display = "block";
    }
}