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

	if (response.data.Error) {
		return [];
	}

	// return only the Search property from the API object, containing the user search input value
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
//function to get the user input value by calling debounce from Utils.js file
const onInput = async (event) => {
	// await promise to be resolved returning the data fetched from the API
	const movies = await fetchData(event.target.value);

	//clear search value result when search for a new title
	resultsWrapper.innerHTML = '';

	// add class to open dropdown menu
	dropdown.classList.add('is-active');

	// iterate over the array of movies returned from API
	for (let movie of movies) {
		// create a div element
		const option = document.createElement('a');
		// check of poster image is available, if N/A we pass a empty strgint to img src
		const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
		// add dropdown-item for movie search
		option.classList.add('dropdown-item');
		// create img and h1 tag inside the div element
		option.innerHTML = `
        <img src="${imgSrc}" />
        ${movie.Title}
        `;
		// append element created to HTML
		resultsWrapper.appendChild(option);
	}
};

//***** EVENT LISTENERS */
//listen for every key press in the input field, and call onInput callback function with user input values and a time for the setTimeout() to be executed
input.addEventListener('input', debounce(onInput, 700));

// event listener  if user clicks within  div.autocomplete class. If user clicks outside of that block, remove the class is-active and close the dropdown menu. contains( ) method checks if user is clicking within the element, so it will not close the dropdown as long as user clicks within that block.
document.addEventListener('click', (event) => {
	if (!root.contains(event.target)) dropdown.classList.remove('is-active');
});
