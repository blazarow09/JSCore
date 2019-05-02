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

		/*Feed*/
		this.get('#/feed', handlers.getMemeFeed);

		/*CreateMeme*/
		this.get('#/createMeme', handlers.getCreateMemePage);
		this.post('#/createMeme', handlers.createMeme);

		/*MemeDetails*/
		this.get('#/details/:id', handlers.getMemeDetails);

		/*EditMeme*/
		this.post('#/edit/:id', handlers.editMeme);
		this.get('#/edit/:id', handlers.getEditPage);
	});

	app.run('#/home');
});