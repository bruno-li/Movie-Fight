//******* OBJECT  ******/
const autocompleteConfig = {
	//method to render movie poster
	renderOption: (movie) => {
		// check of if poster image N/A
		const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
		return `
            <img src="${imgSrc}" />
            ${movie.Title} (${movie.Year})
             `;
	},

	//get user input and assign to input field
	inputValue: (movie) => {
		return movie.Title;
	},
	//****** API CALL  *****/
	// pass fetchData as an argument to autocomplete file
	async fetchData(searchTerm) {
		const response = await axios.get('http://www.omdbapi.com/', {
			// use axios to pass an object parameters for the api
			params: {
				apiKey: '7cab3882',
				//property, from the API documentation to look up a movie
				s: searchTerm
			}
		});
		// return empty if error
		if (response.data.Error) {
			return [];
		}
		// return  Search API object property containing  user search value
		return response.data.Search;
	}
};

//**** FUNCTION CALL ****/
// call function to create left search column
createAutoComplete({
	// spread operator to copies properties from autoComplete object and pass it to autocomplete.js
	...autocompleteConfig,
	// select left search
	root: document.querySelector('#left-autocomplete'),

	onOptionSelect: (movie) => {
		// hides helper when user selects a movie
		document.querySelector('.tutorial').classList.add('is-hidden');
		// call onMovieSelect from utils.js passing the select movie
		onMovieSelect(movie, document.querySelector('#left-summary'), 'left');
	}
});
// call function to create right search column
createAutoComplete({
	// spread operator to copies properties from autoComplete object and pass it to autocomplete.js
	...autocompleteConfig,
	root: document.querySelector('#right-autocomplete'),

	onOptionSelect: (movie) => {
		// hides helper when user selects a movie
		document.querySelector('.tutorial').classList.add('is-hidden');
		// call onMovieSelect with select movie and element for summary
		onMovieSelect(movie, document.querySelector('#right-summary'), 'right');
	}
});
// variables to keep track of select movies
let leftMovie;
let rightMovie;

//****** API CALL  *****/
// receive a movie object and the element for the summary
const onMovieSelect = async (movie, summaryElement, side) => {
	// Async with Axios library
	const response = await axios.get('http://www.omdbapi.com/', {
		// use axios to pass an object parameters for the api
		params: {
			apiKey: '7cab3882',
			//property, from the API documentation to look individual movie
			i: movie.imdbID
		}
	});
	//create movie summary by calling movieTemplate
	summaryElement.innerHTML = movieTemplate(response.data);

	// check if left or right summary was called
	if (side === 'left') {
		// assign movie to left summary
		leftMovie = response.data;
	} else {
		// assign movie to right summary
		rightMovie = response.data;
	}
	// make sure both summary sides have movies select to run comparison
	if (leftMovie && rightMovie) {
		runComparison();
	}
};

const runComparison = () => {
	console.log('Time for comparison');
};

// HTML template to render movie summary from user selection
const movieTemplate = (movieDetail) => {
	// get values, remove the dollar sign and commas
	// then parse to an intenger for comparison
	const dollars = parseInt(movieDetail.BoxOffice.replace(/\$/g, '').replace(/,/g, ''));
	const metascore = parseInt(movieDetail.Metascore);
	const imdbRating = parseFloat(movieDetail.imdbRating);
	const imdbVotes = parseInt(movieDetail.imdbVotes.replace(/,/g, ''));

	return `
	<article class="media">
		<figure class="media-left">
			<p class="image">
				<img class="image" src="${movieDetail.Poster}" />
			</p>
		</figure>
		<div class="media-content">
			<div class="content">
				<h1>${movieDetail.Title}</h1>
				<h4>${movieDetail.Genre}</h4>
				<p>${movieDetail.Plot}</p>
			</div>
		<div>
	</article>
	<article class="notification is-primary">
		<p class="title">${movieDetail.Awards}</p>
		<p class="subtitle">Awards</p>
	</article>
	<article class="notification is-primary">
		<p class="title">${movieDetail.BoxOffice}</p>
		<p class="subtitle">Box Office</p>
	</article>
	<article class="notification is-primary">
		<p class="title">${movieDetail.Metascore}</p>
		<p class="subtitle">Metascore</p>
	</article>
	<article class="notification is-primary">
		<p class="title">${movieDetail.imdbRating}</p>
		<p class="subtitle">IMDB Rating</p>
	</article>
	<article class="notification is-primary">
		<p class="title">${movieDetail.imdbVotes}</p>
		<p class="subtitle">IMDB Votes</p>
	</article>
	`;
};
