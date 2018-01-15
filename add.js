import MoviesStorage from './movies-storage.js'
import setCounterOfTo from './movies-counter.js'

class Add {

	constructor() {

		this.storage = new MoviesStorage();
		this.myErrorMessages = [];

		document.getElementsByClassName("add")[0].addEventListener("click", (event) => {

			event.preventDefault();
			this.validateGenre();
			this.validateTitle();
			this.validateYear();

			if(this.myErrorMessages.length > 0) {
				alert(this.myErrorMessages.join(" "));
				this.myErrorMessages = [];
			} else {
				this.storage.set({
				        "id": document.getElementsByClassName("id")[0].value,
				        "title": document.getElementsByClassName("title")[0].value,
				        "year": document.getElementsByClassName("year")[0].value,
				        "genre": document.getElementsByClassName("genre")[0].value,
				        "summary": document.getElementsByClassName("summary")[0].value,
				        "seen": this.getSeenValue()
				    });
				document.getElementsByTagName("form")[0].reset();
			};

			this.updateCounters();
		});

		this.updateCounters();
	};

	updateCounters() {

		setCounterOfTo(document.getElementById("anotherMoviesCounterAll"), this.storage.get().length);

		let moviesSeen = this.storage.get().filter(( movie) => {
			return movie.seen === "T";
		});

		setCounterOfTo(document.getElementById("anotherMoviesCounterSeen"), moviesSeen.length);
	};

	validateGenre() {

	    let genre = document.getElementsByClassName("genre")[0].value;

	    if (genre == "") {
	        this.myErrorMessages.push("Please fill the genre field.");
	        return false;
	    } else {
	    	return true;
	    };
	};

	validateYear() {

		let year = document.getElementsByClassName("year")[0];
		let fieldLength = year.value.length;
		let pattern = /^[0-9]{4}$/;  
		      	
		if(year.value.match(pattern)) {  
			return true;  
		} else {  
			this.myErrorMessages.push("Year must be four digits.");
			return false;  
		};		
	};

	validateTitle() {
		let title = document.getElementsByClassName("title")[0].value;

		if (title !== "") {
			let filteredTable = this.storage.get().filter((movie) => {
				return movie.title === title;
			});
			let alreadyExist = filteredTable.length > 0;

			if (alreadyExist) {
				this.myErrorMessages.push("This title is already used.");
			};
		} else {
			this.myErrorMessages.push("Please fill the title field.");
		};
	};

	getSeenValue() {

		let radio = document.getElementsByClassName("seen");

		for (let i = 0, length = radio.length; i < length; i++) {

			if (radio[i].checked) {
				return radio[i].value;
				break;
			};		
		};
	};	
};

let myAdd = new Add();