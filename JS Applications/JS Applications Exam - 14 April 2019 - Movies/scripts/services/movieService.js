let movieService = (() => {
	function addMovie(data) {
		return remote.post('appdata', 'movies', 'kinvey', data);
	}

	function getCinema() {
		return remote.get('appdata', 'movies', 'kinvey', '?query={}&sort={"tickets": -1}')
	}

	function getAMovie(ticketId) {
		return remote.get('appdata', 'movies', 'kinvey', `/${ticketId}`);
	}

	function buyTicket(movieId, data) {
		return remote.update('appdata', 'movies', 'kinvey', data, `/${movieId}`);
	}

	function editMovie(movieId, data) {
		return remote.update('appdata', 'movies', 'kinvey', data, `/${movieId}`);
	}

	function deleteMovie(movieId) {
		return remote.remove('appdata', 'movies', 'kinvey', `/${movieId}`)
	}

	return {
		addMovie,
		getCinema,
		getAMovie,
		buyTicket,
		editMovie,
		deleteMovie,
	}
})();