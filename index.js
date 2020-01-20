//****** API CALL  */
//helper function to fetch data from API using Axios
// search for user input value
const fetchData = async (searchTerm) => {
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
};

// call createAutoComplete config function object, specific for this application
createAutoComplete({
	root: document.querySelector('.autocomplete'),
	//method to render movie poster
	renderOption: (movie) => {
		// check of if poster image N/A
		const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
		return `
            <img src="${imgSrc}" />
            ${movie.Title} (${movie.Year})
             `;
	},
	onOptionSelect: (movie) => {
		// call onMovieSelect from utils.js passing the select movie
		onMovieSelect(movie);
	},
	//get user input and assign to input field
	inputValue: (movie) => {
		return movie.Title;
	},
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
});

// get the user select movie from dropdown menu list
const onMovieSelect = async (movie) => {
	const response = await axios.get('http://www.omdbapi.com/', {
		// use axios to pass an object parameters for the api
		params: {
			apiKey: '7cab3882',
			//property, from the API documentation to look individual movie
			i: movie.imdbID
		}
	});
	//create movie summary by calling movieTemplate and passing the movie ID
	document.querySelector('#summary').innerHTML = movieTemplate(response.data);
};

// HTML template to render movie summary from user selection
const movieTemplate = (movieDetail) => {
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
