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
	console.log(response.data.Search);
	return response.data.Search;
};

//*** CREATE DOM ELEMENTS */
// select element with autocomplete class in the DOM
const root = document.querySelector('.autocomplete');
// create html elements dynamically and add to root variable
root.innerHTML = `
    <label><b>Search For a Movie </b></label>
    <input class="input" />
    <div class="dropdown"> 
        <div class="dropdown-menu">
            <div class="dropdown-content results">
            </div>
        </div>
    </div>
`;
//***** DOM ELEMENTS *****//
const input = document.querySelector('.input');
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');

//**** FUNCTIONS */
//get user input value by calling debounce from Utils.js file
const onInput = async (event) => {
	// await promise to be resolved returning the data fetched from the API
	const movies = await fetchData(event.target.value);
	// if user clear the search input, remove dropdown and return function
	if (!movies.length) {
		dropdown.classList.remove('is-active');
		return;
	}
	//clear search value result when search for a new title
	resultsWrapper.innerHTML = '';
	// add class to open dropdown menu
	dropdown.classList.add('is-active');
	// iterate over the array of movies returned from API
	for (let movie of movies) {
		// create a div element
		const option = document.createElement('a');
		// check of if poster image N/A
		const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
		// add dropdown-item for movie search
		option.classList.add('dropdown-item');
		// create img and h1 tag inside the div element
		option.innerHTML = `
        <img src="${imgSrc}" />
        ${movie.Title}
        `;
		option.addEventListener('click', () => {
			// close dropdown when user select a movie from list
			dropdown.classList.remove('is-active');
			// fill search with user select movie
			input.value = movie.Title;
			// call function passing user select movie
			onMovieSelect(movie);
		});
		// append element created to HTML
		resultsWrapper.appendChild(option);
	}
};

//***** EVENT LISTENERS */
//listen for input key press and call onInput callback function with user input values and a time for the setTimeout()
input.addEventListener('input', debounce(onInput, 700));

// check if user clicks within  div.autocomplete class. If user clicks outside, remove the class is-active and close the dropdown menu. The contains( ) method checks if user is click within the element, so it will not close the dropdown as long as user clicks within that block.
document.addEventListener('click', (event) => {
	if (!root.contains(event.target)) dropdown.classList.remove('is-active');
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
	`;
};
