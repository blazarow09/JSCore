handlers.getWelcomePage = function(ctx) {
	this.isLogged = auth.isAuth();

	if(auth.isAuth()){
		ctx.redirect('#/cars/allCars');
	} 

	this.username = sessionStorage.getItem('username');

	ctx.loadPartials({
		header: 'templates/common/header.hbs',
		footer: 'templates/common/footer.hbs'
	}).then(function () {
		this.partial('./templates/welcomePage.hbs')
	});
};