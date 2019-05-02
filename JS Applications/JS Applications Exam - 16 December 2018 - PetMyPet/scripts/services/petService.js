let petService = (() => {
	function createPet(name, description, imageUrl, category) {
		let likes = 0;

		return remote.post('appdata', 'pets', 'kinvey',
			{name,
				description,
				imageUrl,
				category,
				likes});
	}

	function getAllPets() {
		return remote.get('appdata','pets', 'kinvey', '?query={}&sort={"likes": -1}')
	}
	
	function getMyPets(userId) {
		return remote.get('appdata', 'pets', 'kinvey', `?query={"_acl.creator":"${userId}"}`)
	}

	function getAPet(petId) {
		return remote.get('appdata', 'pets', 'kinvey', `/${petId}`)
	}

	function likePet(petId, pet) {
		return remote.update('appdata', `pets/${petId}`, 'kinvey', pet)
	}
	
	return {
		createPet,
		getAllPets,
		getAPet,
		likePet,
		getMyPets
	}
})();