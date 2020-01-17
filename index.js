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

//timeoutId will be used to reference the number of a setTimout() function. Every setTimout() generates a reference number which we can use to stop the setTimout() from being executed.
let timeoutId;

//function to get the user typing value
const onInput = (event) => {
	// clears the setTimout if user still typing in the input field.
	if (timeoutId) clearTimeout(timeoutId);

	// when user types a key, it will generate a reference number for the setTimout, with that reference we can check if the user still typing letter to search for a movie.
	//when the user finish typing, the setTimout will not be cleared, and setTimeout will execute without being cleared.
	timeoutId = setTimout(() => {
		fetchData(event.target.value);
	}, 1000);
};

//listen for every key press in the input field, and call onInput callback function
input.addEventListener('input', onInput);
