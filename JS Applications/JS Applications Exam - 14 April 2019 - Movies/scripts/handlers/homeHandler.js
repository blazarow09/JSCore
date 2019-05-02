handlers.getWelcomePage = function(ctx) {
this.isLogged = auth.isAuth();
this.username = sessionStorage.getItem('username');

ctx.loadPartials({
header: 'templates/common/header.hbs',
footer: 'templates/common/footer.hbs'
}).then(function () {
this.partial('./templates/welcomeScreen.hbs')
});
};