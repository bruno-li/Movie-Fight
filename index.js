//helper function to fetch data from API using Axios
// receive an argument from event listener with user input
const fetchData = async (searchTerm) => {
	const response = await axios.get('http://www.omdbapi.com/', {
		// use axios to pass an object parameters for the api
		params: {
			apiKey: '7cab3882',
			//property, from the API documentation to look up a movie
			s: searchTerm
		}
	});
	console.log(response.data);
};

const input = document.querySelector('input');

//function to get the user input value by calling debounce from Utils.js file
const onInput = debounce((event) => {
	fetchData(event.target.value);
});
//listen for every key press in the input field, and call onInput callback function
input.addEventListener('input', onInput);
