handlers.getAllCars = function (ctx) {
	this.isLogged = auth.isAuth();
	this.username = sessionStorage.getItem('username');

	carService.getAllCars()
		.then(function (res) {

			let username = sessionStorage.getItem('username');

			ctx.cars = res;
			ctx.areThereCars = res.length === 0;

			res.forEach((car) => car.isCreator = car.seller === username);

			ctx.loadPartials({
				header: 'templates/common/header.hbs',
				footer: 'templates/common/footer.hbs',
				car: 'templates/cars/car.hbs'
			}).then(function () {
				this.partial('./templates/cars/allCars.hbs');
			})
		})
};

handlers.getCreateCarView = function (ctx) {
	this.isLogged = auth.isAuth();
	this.username = sessionStorage.getItem('username');

	ctx.loadPartials({
		header: 'templates/common/header.hbs',
		footer: 'templates/common/footer.hbs'
	}).then(function () {
		this.partial('./templates/cars/createCar.hbs')
	});
};

handlers.postCreateCar = function (ctx) {
	let seller = sessionStorage.getItem('username');
	let title = ctx.params.title;
	let description = ctx.params.description;
	let imageUrl = ctx.params.imageUrl;
	let brand = ctx.params.brand;
	let model = ctx.params.model;
	let year = ctx.params.year;
	let price = ctx.params.price;
	let fuel = ctx.params.fuelType;

	let data = {seller, title, description, imageUrl, brand,  model, fuel, year, price, };

	carService.createCar(data)
		.then(() => {
			notify.showInfo('Listing created.');
			this.redirect('#/cars/allCars');
		})

};

handlers.getCarDetails = async function (ctx) {
	this.isLogged = auth.isAuth();
	this.username = sessionStorage.getItem('username');
	let username = sessionStorage.getItem('username');
	let carId = ctx.params.id;

	let car = await carService.getACar(carId);

	ctx.isCreator = car.seller === 	username;
	ctx.id = car._id;
	ctx.title = car.title;
	ctx.description = car.description;
	ctx.imageUrl = car.imageUrl;
	ctx.brand = car.brand;
	ctx.model = car.model;
	ctx.year = car.year;
	ctx.price = car.price;
	ctx.fuel = car.fuel;

	ctx.loadPartials({
			header: 'templates/common/header.hbs',
			footer: 'templates/common/footer.hbs'
		}).then(function () {
			this.partial('./templates/cars/detailsCar.hbs');
		})
};

handlers.getEditCarView = async function (ctx) {
	this.isLogged = auth.isAuth();
	this.username = sessionStorage.getItem('username');
	let carId = ctx.params.id;

	let car = await carService.getACar(carId);

	ctx.id = car._id;
	ctx.title = car.title;
	ctx.description = car.description;
	ctx.imageUrl = car.imageUrl;
	ctx.brand = car.brand;
	ctx.model = car.model;
	ctx.year = car.year;
	ctx.price = car.price;
	ctx.fuel = car.fuel;

	ctx.loadPartials({
		header: 'templates/common/header.hbs',
		footer: 'templates/common/footer.hbs',
	}).then(function () {
		this.partial('./templates/cars/editCar.hbs');
	})

};

handlers.postEditCar = function (ctx) {
	let seller = sessionStorage.getItem('username');
	let title = ctx.params.title;
	let description = ctx.params.description;
	let imageUrl = ctx.params.imageUrl;
	let brand = ctx.params.brand;
	let model = ctx.params.model;
	let year = ctx.params.year;
	let price = ctx.params.price;
	let fuel = ctx.params.fuelType;

	let data = {seller, title, description, imageUrl, brand,  model, fuel, year, price};
	let carId = ctx.params.id;

	carService.editCar(carId, data)
		.then(function () {
			notify.showInfo(`Listing ${data.title} updated`);
			ctx.redirect('#/cars/allCars');
		})
};

handlers.getMyCars = async function (ctx) {
	let username = sessionStorage.getItem('username');
	this.isLogged = auth.isAuth();
	this.username = sessionStorage.getItem('username');

	let cars = await carService.getMyCars(username);

	ctx.noCarsInDb = cars.length === 0;

	cars.forEach((car) => ctx.id = car._id);
	ctx.cars = cars;

	ctx.loadPartials({
		header: 'templates/common/header.hbs',
		footer: 'templates/common/footer.hbs',
		car: './templates/cars/myCar.hbs'
	}).then(function () {
		this.partial('./templates/cars/myCars.hbs')
	})
};

handlers.deleteCar = function (ctx) {
	let carId = ctx.params.id;

	carService.deleteCar(carId)
		.then(() => {
			notify.showInfo('Car deleted successfully.');
			this.redirect('#/cars/allCars');
		})
};