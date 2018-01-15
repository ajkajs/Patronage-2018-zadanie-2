import MoviesStorage from './movies-storage.js'
import setCounterOfTo from './movies-counter.js'

let storage = new MoviesStorage();



(function(){
	setCounterOfTo(document.getElementById("moviesCounterAll"), storage.get().length);

	let moviesSeen = storage.get().filter(( movie) => {
		return movie.seen === "T";
	});

	setCounterOfTo(document.getElementById("moviesCounterSeen"), moviesSeen.length);

	let moviesList = document.getElementById("moviesList");

	function updateSeen (seen, e) {
		document.getElementById("seen_" + e.currentTarget.id).textContent="seen: " + seen;
		storage.get().map((movie) => {
			if (parseInt(e.currentTarget.id) === movie.id) {
				movie.seen = seen;
			};
			return movie;
		});
	};


	function markSeen (e) {
		if (e.currentTarget.checked) {
			updateSeen("T", e);
		} else {
			updateSeen("F", e);
		};

		let moviesSeen = storage.get().filter((movie) => {
			return movie.seen === "T";
		});

		document.getElementById("moviesCounterSeen").innerHTML = moviesSeen.length;
	};

	storage.get().forEach((movie) => {
		let li = document.createElement("li");
		let liContent = `
						id: ${movie.id} </br> 
						title: ${movie.title} </br>
						year: ${movie.year} </br>
						genre: ${movie.genre} </br>
						summary: ${movie.summary} </br>
						<span id="seen_${movie.id}">seen: ${movie.seen}</span>
						<input type="checkbox" id="${movie.id}" ${movie.seen === 'T' ? "checked=true" : ""}/>
						`;
		li.innerHTML = liContent;
		moviesList.appendChild(li);
		document.getElementById(movie.id).addEventListener("click",markSeen);
	});

	document.getElementById("moviesCountersContainer").setAttribute("class", "moviesCountersContainer");
	document.getElementById("moviesListContainer").setAttribute("class", "moviesListContainer");
	document.getElementById("moviesList").setAttribute("class", "moviesList");
})();