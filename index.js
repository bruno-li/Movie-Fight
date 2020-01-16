//helper function to fetch data from API using Axios
const fetchData = async () => {
	const response = await axios.get('http://www.omdbapi.com/', {
		// use axios to pass an object parameters for the api
		params: {
			apiKey: '7cab3882',
			//property, from the API documentation to look up a movie
			i: 'tt0848228'
		}
	});
	console.log(response.data);
};
fetchData();
