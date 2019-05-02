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
			
		/*AddMovie*/
		this.get('#/movie/create', handlers.getAddMovieView);
		this.post('#/movie/create', handlers.postAddMovie);

		/*Cinema*/
		this.get('#/cinema', handlers.getCinemaView);

		/*BuyTicket*/
		this.get('#/ticket/buy/:id', handlers.buyTicket);

		/*DetailsMovie*/
		this.get('#/movie/details/:id', handlers.getMovieDetails);

		/*MyMovies*/
		this.get('#/movies/myMovies', handlers.getMyMovies);

		/*EditMovie*/
		this.get('#/movie/edit/:id', handlers.getEditMovieView);
		this.post('#/movie/edit/:id', handlers.postEditMovie);

		/*DeleteMovie*/
		this.get('#/movie/delete/:id', handlers.getDeleteMovieView);
		this.post('#/movie/delete/:id', handlers.postDeleteMovie);

		/*Search*/
		this.get('#/movies/search', handlers.searchGenre)
	});

	app.run('#/home');
});