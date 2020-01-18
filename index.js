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
	// return only the Search property from the API object, containing the user search input value
	return response.data.Search;
};

const input = document.querySelector('input');

//function to get the user input value by calling debounce from Utils.js file
const onInput = async (event) => {
	// await promise to be resolved returning the data fetched from the API
	const movies = await fetchData(event.target.value);
	console.log(movies);
};
//listen for every key press in the input field, and call onInput callback function with user input values and a time for the setTimeout() to be executed
input.addEventListener('input', debounce(onInput, 700));
