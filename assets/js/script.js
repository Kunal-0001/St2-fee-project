'use strict';

/**
 * navbar variables
 */

const navOpenBtn = document.querySelector("[data-menu-open-btn]");
const navCloseBtn = document.querySelector("[data-menu-close-btn]");
const navbar = document.querySelector("[data-navbar]");
const overlay = document.querySelector("[data-overlay]");

const navElemArr = [navOpenBtn, navCloseBtn, overlay];

for (let i = 0; i < navElemArr.length; i++) {

  navElemArr[i].addEventListener("click", function () {

    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("active");

  });

}



/**
 * header sticky
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {

  window.scrollY >= 10 ? header.classList.add("active") : header.classList.remove("active");

});



/**
 * go top
 */

const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {

  window.scrollY >= 500 ? goTopBtn.classList.add("active") : goTopBtn.classList.remove("active");

});

//                                            Main-Part

// Function to fetch movie data from the API
async function fetchMovieData(movieTitle) {
  try {
    //const apiKey = 'YOUR_API_KEY'; // Replace with your API key
    const apiUrl = `https://www.omdbapi.com/?s=${movieTitle}&apikey=2b74bea7`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.Response === 'True') {
      return data.Search || [];
    } else {
      throw new Error(data.Error);
    }
  } catch (error) {
    console.error('Error fetching movie data:', error.message);
    return [];
  }
}

// Function to create and append movie cards to the movies-list
function appendMovieCards(movieDataList) {
  const moviesList = document.querySelector('.movies-list');

  if (!moviesList || !Array.isArray(movieDataList)) {
    console.error('Invalid moviesList or movieDataList');
    return;
  }

  // Clear the existing movie cards
  moviesList.innerHTML = '';

  movieDataList.forEach((movieData) => {
    const movieCard = document.createElement('li');
    movieCard.innerHTML = `
      <div class="movie-card">
        <a href="./movie-details.html">
          <figure class="card-banner">
            <img src="${movieData.Poster}" alt="${movieData.Title} movie poster">
          </figure>
        </a>
        <div class="title-wrapper">
          <a href="./movie-details.html">
            <h3 class="card-title">${movieData.Title}</h3>
          </a>
          <time datetime="${movieData.Year}">${movieData.Year}</time>
        </div>
        <div class="card-meta">
          <div class="badge badge-outline">${movieData.Type}</div>
          <div class="duration">
            <ion-icon name="time-outline"></ion-icon>
            <time datetime="${movieData.Runtime}">${movieData.Runtime}</time>
          </div>
          <div class="rating">
            <ion-icon name="star"></ion-icon>
            <data>${movieData.imdbRating}</data>
          </div>
        </div>
      </div>
    `;

    moviesList.appendChild(movieCard);
  });
}

// Function to handle the movie search
async function handleMovieSearch() {
  const searchInput = document.querySelector('#searchInput');
  const movieTitle = searchInput.value.trim();

  if (!movieTitle) {
    alert('Please enter a movie title.');
    return;
  }

  const movieDataList = await fetchMovieData(movieTitle);

  if (movieDataList.length > 0) {
    appendMovieCards(movieDataList);
  } else {
    alert('No movies found for the given title.');
  }
}

// Event listener for the search button
const searchButton = document.querySelector('#searchButton');
searchButton.addEventListener('click', handleMovieSearch);
