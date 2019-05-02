let memeService = (() => {
	function getAllMemes() {
		return remote.get('appdata', 'memes', 'kinvey');
	}

	function getAMeme(memeId) {
		return remote.get('appdata', 'memes', 'kinvey', `/${memeId}`);
	}

	function createMeme(creator, title, description, imageUrl) {
		let data = {creator, title, description, imageUrl};

		return remote.post('appdata', 'memes', 'kinvey', data );
	}

	function getEditMeme(memeId) {
		return remote.get('appdata', `memes/${memeId}`, 'kinvey');
	}

	function editMeme(memeId, data) {

		return remote.update('appdata', `memes/${memeId}`, 'kinvey', data);
	}

	return {
		getAllMemes,
		createMeme,
		getAMeme,
		editMeme,
		getEditMeme
	}
})();