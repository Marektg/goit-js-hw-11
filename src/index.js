// import stylesheet
import './css/styles.css';
// import Notiflix 
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';



// 

// const list = document.querySelector(".gallery");
// // tworzenie galerii
// const photo = galleryItems.map((image) => `
// <a class="gallery__item" href=${image.original}>
//   <img class="gallery__image" src=${image.preview} alt="${image.description}" />
// </a>
//   `).join("");

// list.insertAdjacentHTML("beforeend", photo);

// var lightbox = new SimpleLightbox('.gallery a', { captionsData: "alt", captionDelay: 250 })

// console.log(galleryItems);

// // import debounce
// import debounce from 'lodash.debounce';
// const DEBOUNCE_DELAY = 300;
// // import searching function
// import { fetchCountries } from './js/fetchCountries';

// // Select search element
// const searchBox = document.querySelector("#search-box");
// // Select output elements
// const countryList = document.querySelector(".country-list");
// const countryInfo = document.querySelector(".country-info");


// // Start searching after user input
// searchBox.addEventListener("input", debounce(searchingValue, DEBOUNCE_DELAY));

// // Searching country name in data base
// function searchingValue() {
//     fetchCountries(searchBox.value.trim())
//         .then(countries => resultFromDataBase(countries))
//         .catch((error) => {
//             if (searchBox.value !== "") {
//                 Notiflix.Notify.failure("Oops, there is no country with that name");
//             }
//             clearElements(countryList, countryInfo);
//             console.log(`Error: ${error.message}`);
//         });
// };

// // Filter searching resoult
// function resultFromDataBase(countries) {
//     if (countries.length > 10) {
//         clearElements(countryList, countryInfo);
//         Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");

//     } else if (countries.length >= 2 && countries.length <= 10) {
//         clearElements(countryList, countryInfo);
//         const dataResoult = countries
//             .map(({ name, flags }) =>
//                 `<li class="country-item">
//           <img class="country-flag" src="${flags.svg}" alt="The flag of ${name.common}">
//           <p class="country-name">${name.common}</p>
//         </li>`
//             )
//             .join("");
//         countryList.innerHTML = dataResoult;

//     } else if (countries.length === 1) {
//         clearElements(countryList, countryInfo);
//         const dataResoult = countries
//             .map(({ name, capital, population, flags, languages }) =>
//                 `<h2 class="country-info__name"><img class="country-flag" src="${flags.svg}" alt="The flag of ${name.common}">${name.common}</h2>
//         <p class="country-info__item"><span class="country-info__label">Capital:</span> ${capital}</p>
//         <p class="country-info__item"><span class="country-info__label">Population:</span> ${population}</p>
//         <p class="country-info__item"><span class="country-info__label">Languages:</span> ${Object.values(languages).join(", ")}</p>`
//             );
//         countryInfo.innerHTML = dataResoult;

//     } else if (countries.length < 1) {
//         clearElements(countryList, countryInfo);
//     }
// };

// // Set empty output element
// function clearElements(...outputs) {
//     outputs.forEach(output => output.innerHTML = "");
// };