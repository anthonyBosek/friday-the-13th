//! ----- Global Variables -----
const movieList = document.getElementById("movie-list");
const movieInfoImg = document.getElementById("detail-image");
const movieInfoTitle = document.getElementById("title");
const movieInfoYear = document.getElementById("year-released");
const movieInfoDesc = document.getElementById("description");
const movieInfoBtn = document.getElementById("watched");
const movieInfoBldAmnt = document.getElementById("amount");
const bloodForm = document.getElementById("blood-form");

//! ----- Helper Functions -----
//* submit action on form
const handleSubmit = (e) => {
  e.preventDefault();
  const _id = movieInfoBtn.dataset.btn;
  const drops = movieInfoBldAmnt.textContent;
  const addDrops = e.target["blood-amount"].value;
  const payload = { blood_amount: parseInt(drops) + parseInt(addDrops) };
  patchJSON(`http://localhost:3000/movies/${_id}`, payload)
    .then(({ blood_amount }) => (movieInfoBldAmnt.textContent = blood_amount))
    .catch((err) => console.log("Error: ", err));
  e.target.reset();
};

//* toggle, patch, update watched btn
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

//* dynamically update select movie details
const renderMovieInfo = (movie) => {
  movieInfoImg.setAttribute("src", movie.image);
  movieInfoTitle.textContent = movie.title;
  movieInfoYear.textContent = movie.release_year;
  movieInfoDesc.textContent = movie.description;
  movieInfoBtn.textContent = movie.watched ? "watched" : "unwatched";
  movieInfoBtn.dataset.btn = movie.id;
  movieInfoBldAmnt.textContent = movie.blood_amount;
};

//* dynamically create movie poster nav images
const renderMovieImages = (movieArray) => {
  renderMovieInfo(movieArray[0]); //* initial movie to display
  movieArray.forEach((movie) => {
    const img = document.createElement("img");
    img.setAttribute("id", `movie-img-${movie.id}`);
    img.setAttribute("src", movie.image);
    img.setAttribute("alt", movie.title);
    img.addEventListener("click", () => getOneMovie(movie.id));
    movieList.appendChild(img);
  });
};

//* get one book
const getOneMovie = (_id) => {
  getJSON(`http://localhost:3000/movies/${_id}`)
    .then((movie) => renderMovieInfo(movie))
    .catch((err) => console.log("Error: ", err));
};

//! ----- Execute Code on pageload -----
//* initial fetch to 'GET' all movie data
getJSON("http://localhost:3000/movies")
  .then((movies) => renderMovieImages(movies))
  .catch((err) => console.log("Error: ", err));
//* btn event listener to invoke 'watched' toggle helper func
movieInfoBtn.addEventListener("click", handleWatchedToggle);
//* form submit listener
bloodForm.addEventListener("submit", handleSubmit);
