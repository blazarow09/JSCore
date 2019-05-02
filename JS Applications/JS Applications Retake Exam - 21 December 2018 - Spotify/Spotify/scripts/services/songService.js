songService = (() => {
	function createSong(data) {
		return remote.post('appdata', 'songs', 'kinvey', data);
	}
	
	function getAllSongs() {
		return remote.get('appdata', 'songs', 'kinvey', '?query={}&sort={"likes": -1, "listened": -1}');
	}

	function getASong(songId) {
		return remote.get('appdata', `songs/${songId}`, 'kinvey');
	}

	function likeSong(songId, song) {
		return remote.update('appdata', `songs/${songId}`, 'kinvey', song);
	}

	function listenSong(songId, song) {
		return remote.update('appdata', `songs/${songId}`, 'kinvey', song);
	}

	function removeSong(id) {
		return remote.remove('appdata', `songs/${id}`, 'kinvey')
	}

	return {
		createSong,
		getAllSongs,
		likeSong,
		removeSong,
		getASong,
		listenSong
	}
})();