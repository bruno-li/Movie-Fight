// helper function to set a limit on how often a function can be called
// default delay of 1s if no time is passed as an argument
const debounce = (callback, delay = 1000) => {
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
		}, delay);
	};
};
