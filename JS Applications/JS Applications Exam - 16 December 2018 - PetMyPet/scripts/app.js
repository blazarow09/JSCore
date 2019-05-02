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
		//Define routes here...

		/*CreatePet*/
		this.get('#/createPet', handlers.getCreatePetPage);
		this.post('#/createPet', handlers.createPet);

		/*Dashboard*/
		this.get('#/dashboard', handlers.getDashboard);
		this.get('#/like/:id', handlers.likePet);

		/*MyPets*/
		this.get('#/myPets', handlers.getMyPets);
		this.get('#/edit', handlers.getEditPet);
	});

	app.run('#/home');
});