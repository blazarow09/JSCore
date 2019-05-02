handlers.getWelcomePage = function (ctx) {
	ctx.loadPartials({
		loginForm: './templates/forms/loginForm.hbs',
		regForm: './templates/forms/regForm.hbs',
		footer: './templates/common/footer.hbs'
	}).then(function () {
		this.partial('./templates/welcome.hbs');
	})
};

handlers.registerUser = function (ctx) {
	const username = ctx.params.username;
	const password = ctx.params.password;
	const passwordCheck = ctx.params.passwordCheck;

	if(username.length < 5){
		notify.showError('Username must me at least 5 symbols long!')
	} else if (password === '' || passwordCheck === '') {
		notify.showError('Password can not be empty!')
	} else if (password !== passwordCheck) {
		notify.showError('Both passwords must match each other!')
	} else {
		auth.register(username, password)
			.then(function (userData) {
				auth.saveSession(userData);
				notify.showInfo('User registration successful.');
				ctx.redirect('#/editor')
		}).catch(notify.handleError);
}};

handlers.loginUser = function (ctx) {
	const username = ctx.params.username;
	const password = ctx.params.password;

	if(username.length < 5){
		notify.showError('Username must me at least 5 symbols long!')
	} else if (password === '') {
		notify.showError('Password can not be empty!')
	} else {
		auth.login(username, password)
			.then(function (userData) {
				auth.saveSession(userData);
				notify.showInfo('Login successful.');
				ctx.redirect('#/editor');
			}).catch(notify.handleError);
	}
};

handlers.logout = async function () {
	await auth.logout()
		.then(() => {
			sessionStorage.clear();
			notify.showInfo('Logout successful.');
			this.redirect('#/home')

		});
};