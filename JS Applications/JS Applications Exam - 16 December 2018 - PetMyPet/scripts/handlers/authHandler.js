handlers.getWelcomePage = function (ctx) {
	ctx.isLogged = auth.isAuth();
	ctx.username = sessionStorage.getItem('username');

	ctx.loadPartials({
		header: './templates/common/header.hbs',
		footer: './templates/common/footer.hbs'
	}).then(function () {
			this.partial('./templates/welcome.hbs');
		})
};

handlers.getRegisterPage = function (ctx) {
	ctx.loadPartials({
		header: './templates/common/header.hbs',
		footer: './templates/common/footer.hbs'
	}).then(function () {
		this.partial('./templates/register/register.hbs');
	})
};

handlers.registerUser = function (ctx) {
	const username = ctx.params.username;
	const password = ctx.params.password;

	if(username.length < 3){
		notify.showError('The username must be at least 3 characters long!');
	} else if(password.length < 6){
		notify.showError('The password must be at least 6 characters long!');
	} else {
		auth.register(username, password)
			.then(function (userData) {
				auth.saveSession(userData);
				notify.showInfo('User registration successful.');
				ctx.redirect('#/home');
			})
			.catch(notify.handleError);
	}
};

handlers.getLoginPage = function(ctx) {
	ctx.loadPartials({
		header: 'templates/common/header.hbs',
		footer: 'templates/common/footer.hbs'
	}).then(function () {
		this.partial('./templates/login/login.hbs');
	})
};

handlers.loginUser = function (ctx) {
	const username = ctx.params.username;
	const password = ctx.params.password;

	if(username.length < 3) {
		notify.showError('The username must be at least 3 characters long!');
	} else if(password.length < 6){
		notify.showError('The password must be at least 6 characters long!');
	} else {
		auth.login(username, password)
			.then(function (userData) {
				auth.saveSession(userData);
				notify.showInfo('Login successful.');
				ctx.redirect('#/dashboard');
			})
			.catch(notify.handleError);
	}
};

handlers.logout = async function () {
	await auth.logout()
		.then(() => {
			sessionStorage.clear();
			notify.showInfo('Logout successful.');
			this.redirect('#/home')
		})
};