handlers.getAddMovieView = function (ctx) {
	ctx.isLogged = auth.isAuth();
	ctx.username = sessionStorage.getItem('username');

	ctx.loadPartials({
		header: './templates/common/header.hbs',
		footer: './templates/common/footer.hbs'
	}).then(function () {
		this.partial('./templates/movies/addMovie.hbs')
	})
};

handlers.postAddMovie = function (ctx) {
	let title = ctx.params.title;
	let description = ctx.params.description;
	let imageUrl = ctx.params.imageUrl;
	let tickets = ctx.params.tickets;
	let genres = ctx.params.genres;

	let pattern = new RegExp('http[s]*:\\/\\/\\w+.+');
	let isImageUrlValid = pattern.test(imageUrl);

	if(title.length < 6){
		notify.showError('Title must be at least 6 characters long!');
	} else if(description.length < 10){
		notify.showError('Description must be at least 10 characters long!')
	} else if(!isImageUrlValid){
		notify.showError('Invalid image URL!')
	} else if(isNaN(parseInt(tickets))){
		notify.showError('Available tickets must be a number!')
	} else {
		genres = genres.split(' ');
		let movie = {title, description, imageUrl, tickets, genres}

		movieService.addMovie(movie)
			.then(() => {
				notify.showInfo('Movie created successfully.');
				ctx.redirect('#/home');
			})
	}


};

handlers.getCinemaView = async function (ctx) {
	ctx.isLogged = auth.isAuth();
	ctx.username = sessionStorage.getItem('username');

	let movies = await movieService.getCinema();
	let sorted = movies.sort(function(a, b) {return b.tickets - a.tickets});
	ctx.movies = sorted;

	ctx.loadPartials({
		header: './templates/common/header.hbs',
		footer: './templates/common/footer.hbs',
		movie: './templates/movies/movie.hbs'
	}).then(function () {
		this.partial('./templates/movies/cinema.hbs')
	})
};

handlers.buyTicket = async function (ctx) {
	let movieId = ctx.params.id;

	let movie = await movieService.getAMovie(movieId);
	let tickets = movie.tickets;

	if(tickets > 0){
		movie.tickets = movie.tickets - 1;
		movieService.buyTicket(movieId, movie)
			.then(() => {
				notify.showInfo(`Successfully bought ticket for ${movie.title}!`);
				ctx.redirect('#/cinema')
			})
	}
};

handlers.getMovieDetails = async function (ctx) {
	ctx.isLogged = auth.isAuth();
	ctx.username = sessionStorage.getItem('username');

	let movieId = ctx.params.id;
	let movie = await movieService.getAMovie(movieId);

	ctx.id = movie._id;
	ctx.title = movie.title;
	ctx.imageUrl = movie.imageUrl;
	ctx.description = movie.description;
	ctx.genres = movie.genres;
	ctx.tickets = movie.tickets;

	ctx.loadPartials({
		header: './templates/common/header.hbs',
		footer: './templates/common/footer.hbs'
	}).then(function () {
		this.partial('./templates/movies/detailsMovie.hbs');
	})
};

handlers.getMyMovies = async function (ctx) {
	ctx.isLogged = auth.isAuth();
	ctx.username = sessionStorage.getItem('username');

	let token = sessionStorage.getItem('userId');
	let movies = await movieService.getCinema();

	let myMovies = movies.filter((movie) => movie._acl.creator === token);
	ctx.movies = myMovies.sort(function(a, b) {return b.tickets - a.tickets});

	ctx.loadPartials({
		header: './templates/common/header.hbs',
		footer: './templates/common/footer.hbs',
		movie: './templates/movies/myMovie.hbs'
	}).then(function () {
		this.partial('./templates/movies/myMovies.hbs')
	})
};

handlers.getEditMovieView = async function (ctx) {
	ctx.isLogged = auth.isAuth();
	ctx.username = sessionStorage.getItem('username');

	let movieId = ctx.params.id;
	let movie = await movieService.getAMovie(movieId);

	ctx.id = movie._id;
	ctx.title = movie.title;
	ctx.imageUrl = movie.imageUrl;
	ctx.description = movie.description;
	ctx.genres = movie.genres;
	ctx.tickets = movie.tickets;

	ctx.loadPartials({
		header: './templates/common/header.hbs',
		footer: './templates/common/footer.hbs'
	}).then(function () {
		this.partial('./templates/movies/editMovie.hbs');
	})
};

handlers.postEditMovie = function (ctx) {
	let movieId = ctx.params.id;
	let title = ctx.params.title;
	let imageUrl = ctx.params.imageUrl;
	let description = ctx.params.description;

	let genres = ctx.params.genres;
	let tickets = ctx.params.tickets;
	genres = genres.split(' ');

	let data = {title, imageUrl, description, genres, tickets};

	movieService.editMovie(movieId, data)
		.then(() => {
			notify.showInfo(`Movie ${title} updated successfully!`);
			ctx.redirect('#/movies/myMovies');
		})
};

handlers.getDeleteMovieView = async function (ctx) {
	ctx.isLogged = auth.isAuth();
	ctx.username = sessionStorage.getItem('username');

	let movieId = ctx.params.id;
	let movie = await movieService.getAMovie(movieId);

	ctx.id = movie._id;
	ctx.title = movie.title;
	ctx.imageUrl = movie.imageUrl;
	ctx.description = movie.description;
	ctx.genres = movie.genres;
	ctx.tickets = movie.tickets;

	ctx.loadPartials({
		header: './templates/common/header.hbs',
		footer: './templates/common/footer.hbs'
	}).then(function () {
		this.partial('./templates/movies/deleteMovie.hbs');
	})
};

handlers.postDeleteMovie = function (ctx) {
	let movieId = ctx.params.id;
	console.log(movieId);
	movieService.deleteMovie(movieId)
		.then(() => {
			notify.showInfo('Movie deleted successfully.');
			this.redirect('#/movies/myMovies');
		})
};

handlers.searchGenre = async function(ctx){
	let genre = $('#searchVal').val();

	let searchResult = Array.from(await movieService.getCinema())
		.filter((movie) => movie.genres.includes(genre));

	ctx.isLogged = auth.isAuth();
	ctx.username = sessionStorage.getItem('username');
	if(searchResult.length === 0){
		ctx.noResult = true;
	}
	ctx.movies = searchResult;

	ctx.loadPartials({
		header: './templates/common/header.hbs',
		footer: './templates/common/footer.hbs',
		movie: './templates/movies/movie.hbs'
	}).then(function () {
		this.partial('./templates/movies/cinema.hbs')
	})
};
