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

// helper function to set a limit on how often a function can be called
const debounce = (callback) => {
	//stores setTimout() reference number to be used in clearTimout
	let timeoutId;
	// return  function
	// get all the arguments from user input with rest parameters
	return (...args) => {
		// stop setTimout() from being executed if user still typing by checking if a reference timeoutId is true
		if (timeoutId) clearTimeout(timeoutId);

		// timeoutId is false setTimeout() will be executed if no user input is detected for more than 1 second.
		timeoutId = setTimeout(() => {
			// call calback and apply each argument passed to the callback function with .apply method
			callback.apply(null, args);
		}, 1000);
	};
};

//function to get the user typing value
const onInput = debounce((event) => {
	fetchData(event.target.value);
});
//listen for every key press in the input field, and call onInput callback function
input.addEventListener('input', onInput);
