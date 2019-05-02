handlers.getWelcomePage = function(ctx) {
	this.isLogged = auth.isAuth();
	this.username = sessionStorage.getItem('username');

	ctx.loadPartials({
		header: 'templates/common/header.hbs',
		footer: 'templates/common/footer.hbs'
	}).then(function () {
		this.partial('templates/welcomePage.hbs')
	});
};

handlers.getRegisterPage = function(ctx) {
	ctx.loadPartials({
		header: 'templates/common/header.hbs',
		footer: 'templates/common/footer.hbs'
	}).then(function () {
		this.partial('templates/register/registerPage.hbs');
	});
};

handlers.registerUser = function (ctx) {
	const username = ctx.params.username;
	const password = ctx.params.password;
	const repeatPassword = ctx.params.repeatPassword;
	const email = ctx.params.email;
	const avatarUrl = ctx.params.avatarUrl;

	if(username.length < 3){
		notify.showError('The username must be at least 3 characters long!');
	} else if(password.length < 6){
		notify.showError('The password must be at least 6 characters long!');
	} else if(password !== repeatPassword){
		notify.showInfo('Both passwords must match!')
	} else {
		auth.register(username, password, email, avatarUrl)
			.then(function (userData) {
				auth.saveSession(userData);
				notify.showInfo('User registration successful.');
				ctx.redirect('#/feed');
			})
			.catch(notify.handleError);
	}
};

handlers.getLoginPage = function(ctx) {
	ctx.loadPartials({
		header: 'templates/common/header.hbs',
		footer: 'templates/common/footer.hbs'
	}).then(function () {
		this.partial('templates/login/loginPage.hbs');
	})
};
handlers.loginUser = function (ctx) {
	const username = ctx.params.username;
	const password = ctx.params.password;

	if(username.length < 3) {
		notify.showError('The username must be at least 3 characters long!');
	} else if(password < 6){
		notify.showError('The password must be at least 6 characters long!');
	} else {
		auth.login(username, password)
			.then(function (userData) {
				auth.saveSession(userData);
				notify.showInfo('Login successful.');
				ctx.redirect('#/feed');
			})
			.catch(notify.handleError);
	}
};

handlers.logout = async function () {
	await auth.logout()
		.then(() => {
			sessionStorage.clear();
			notify.showInfo('Logout successful.');
			this.redirect('#/login')
		})
};