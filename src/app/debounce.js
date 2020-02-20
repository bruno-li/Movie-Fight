// helper function to set a limit on how often a function can be called
const debounce = (callback, delay = 1000) => {
	//stores setTimout() reference number to be used in clearTimout
	let timeoutId;
	// function get all the arguments from user input with rest parameters
	return (...args) => {
		// stop setTimout() from being executed if user still typing by checking if a reference timeoutId is true
		if (timeoutId) clearTimeout(timeoutId);

		// timeoutId is false setTimeout() will be executed if no user input is detected for more than 1 second.
		timeoutId = setTimeout(() => {
			// use apply to keep track of how many args to pass to callback. Each key press is stored in args as an array from input search field then pass each argument as arguments array to callback function to look up a movie
			callback.apply(null, args);
		}, delay);
	};
};

export { debounce as default };
