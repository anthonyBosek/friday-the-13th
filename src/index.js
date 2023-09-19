//! Global Variables
const movieList = document.getElementById("movie-list");
const movieInfoImg = document.getElementById("detail-image");
const movieInfoTitle = document.getElementById("title");
const movieInfoYear = document.getElementById("year-released");
const movieInfoDesc = document.getElementById("description");
const movieInfoBtn = document.getElementById("watched");
const movieInfoBldAmnt = document.getElementById("amount");
const bloodForm = document.getElementById("blood-form");

//! Helper Functions
const handleWatchedToggle = (e) => {
  const _id = e.target.dataset.btn;
  const isWatched = e.target.textContent === "watched" ? true : false;
  const payload = { watched: !isWatched };
  patchJSON(`http://localhost:3000/movies/${_id}`, payload)
    .then(
      ({ watched }) =>
        (movieInfoBtn.textContent = watched ? "watched" : "unwatched")
    )
    .catch((err) => console.log("Error: ", err));
};

const renderMovieInfo = (movie) => {
  movieInfoImg.setAttribute("src", movie.image);
  movieInfoTitle.textContent = movie.title;
  movieInfoYear.textContent = movie.release_year;
  movieInfoDesc.textContent = movie.description;
  movieInfoBtn.textContent = movie.watched ? "watched" : "unwatched";
  movieInfoBtn.dataset.btn = movie.id;
  movieInfoBldAmnt.textContent = movie.blood_amount;
};

const renderMovieImages = (movieArray) => {
  renderMovieInfo(movieArray[0]);
  movieArray.forEach((movie) => {
    const img = document.createElement("img");
    img.setAttribute("id", `movie-img-${movie.id}`);
    img.setAttribute("src", movie.image);
    img.setAttribute("alt", movie.title);
    img.addEventListener("click", () => renderMovieInfo(movie));
    movieList.appendChild(img);
  });
};

//! Execute Code on pageload
getJSON("http://localhost:3000/movies")
  .then((movies) => renderMovieImages(movies))
  .catch((err) => console.log("Error: ", err));

movieInfoBtn.addEventListener("click", handleWatchedToggle);
