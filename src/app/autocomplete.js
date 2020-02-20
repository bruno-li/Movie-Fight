import debounce from './debounce';

// reusable auto complete function code. Destruct an object and use it to render elements
const createAutoComplete = ({ root, renderOption, onOptionSelect, inputValue, fetchData }) => {
	//*** CREATE DOM ELEMENTS */
	// create html elements dynamically and add to root variable
	root.innerHTML = `
    <label><b>Search</b></label>
    <input class="input" />
    <div class="dropdown"> 
        <div class="dropdown-menu">
            <div class="dropdown-content results">
            </div>
        </div>
    </div>
    `;
	//***** DOM ELEMENTS *****//
	//select DOM elements from the root
	const input = root.querySelector('.input');
	const dropdown = root.querySelector('.dropdown');
	const resultsWrapper = root.querySelector('.results');

	//get user input value by calling debounce from Utils.js file
	const onInput = async (event) => {
		// await promise to be resolved returning the data fetched from the API by calling fetchData from index.js
		const items = await fetchData(event.target.value);

		// if user clear the search input, remove dropdown
		if (!items.length) {
			dropdown.classList.remove('is-active');
			return;
		}

		//empty search value result when search for a new movie
		resultsWrapper.innerHTML = '';

		// add class to open dropdown menu
		dropdown.classList.add('is-active');

		// iterate over the array of items returned from API
		for (let item of items) {
			// create a div element
			const option = document.createElement('a');

			// add dropdown-item for item search
			option.classList.add('dropdown-item');

			//call renderOption method with each individual item
			option.innerHTML = renderOption(item);

			//event listener for each item option from search
			option.addEventListener('click', () => {
				// close dropdown when user select a item from list
				dropdown.classList.remove('is-active');

				// fill search with user select item by calling inputValue method

				input.value = inputValue(item);
				// method for passing user select item
				onOptionSelect(item);
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
};

export { createAutoComplete as default };
