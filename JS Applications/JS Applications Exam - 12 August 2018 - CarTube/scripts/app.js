const handlers = {};

$(() => {
	const app = Sammy('#container', function () {
		this.use('Handlebars', 'hbs');

		/*Home*/
		this.get('#/home', handlers.getWelcomePage);

		/*Register*/
		this.get('#/register', handlers.getRegisterPage);
		this.post('#/register', handlers.registerUser);

		/*Login*/
		this.get('#/login', handlers.getLoginPage);
		this.post('#/login', handlers.loginUser);

		/*Logout*/
		this.get('#/logout', handlers.logout);

		/*AllCars*/
		this.get('#/cars/allCars', handlers.getAllCars);

		/*CreateCar*/
		this.get('#/cars/create', handlers.getCreateCarView);
		this.post('#/cars/create', handlers.postCreateCar);

		/*CarDetail*/
		this.get('#/car/details/:id', handlers.getCarDetails);

		/*EditCar*/
		this.get('#/car/edit/:id', handlers.getEditCarView);
		this.post('#/car/edit/:id', handlers.postEditCar);

		/*MyCars*/
		this.get('#/cars/myCars', handlers.getMyCars);

		/*DeleteCar*/
		this.get('#/car/delete/:id', handlers.deleteCar);

	});

	app.run('#/home');
});