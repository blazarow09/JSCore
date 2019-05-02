const handlers = {};

$(() => {
	const app = Sammy('#container', function () {
		this.use('Handlebars', 'hbs');

		/*Home*/
		//this.get('index.html', handlers.getWelcomePage);
		this.get('#/home', handlers.getWelcomePage);

		/*Register*/
		this.get('#/register', handlers.getRegisterPage);
		this.post('#/register', handlers.registerUser);

		/*Login*/
		this.get('#/login', handlers.getLoginPage);
		this.post('#/login', handlers.loginUser);

		/*Logout*/
		this.get('#/logout', handlers.logout);

		/*MySongs*/
		this.get('#/mySongs', handlers.getMySongsList);

		/*AllSongs*/
		this.get('#/allSongs', handlers.getAllSongsPage);

		/*CreateSong*/
		this.get('#/createSong', handlers.getCreateSongPage);
		this.post('#/createSong', handlers.postCreateSong);

		/*Like*/
		this.get('#/like/:id', handlers.likeSong);

		/*Listen*/
		this.get('#/listen/:id', handlers.listenSong);

		/*Remove*/
		this.get('#/remove/:id', handlers.removeSong);
	});

	app.run('#/home');
});