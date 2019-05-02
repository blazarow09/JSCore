let carService = (() => {
	function getAllCars() {
		return remote.get('appdata', 'cars', 'kinvey');
	}

	function createCar(data) {
		return remote.post('appdata', 'cars', 'kinvey', data);
	}

	function getACar(carId) {
		return remote.get('appdata', 'cars', 'kinvey', `/${carId}`);
	}

	function editCar(carId, data) {
		return remote.update('appdata', 'cars', 'kinvey', data, `/${carId}`);
	}

	function getMyCars(username, ) {
		return remote.get('appdata', 'cars', 'kinvey', `?query={"seller":"${username}"}&sort={"_kmd.ect": -1}`)
	}

	function deleteCar(carId) {
		return remote.remove('appdata', 'cars', 'kinvey', `/${carId}`);
	}

	return {
		getAllCars,
		createCar,
		getACar,
		editCar,
		getMyCars,
		deleteCar
	}
})();