$(() => {
    const app = Sammy('#main', function () {
        this.use('Handlebars', 'hbs');

        this.get('#/home', function () {
            this.loggedIn = !!sessionStorage.getItem('authtoken');
            this.username = sessionStorage.getItem('username');

            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            }).then(function () {
                this.partial('./templates/home/home.hbs');
            });
        });

        this.get('#/about', function () {
            this.loggedIn = !!sessionStorage.getItem('authtoken');
            this.username = sessionStorage.getItem('username');

            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            }).then(function () {
                this.partial('./templates/about/about.hbs');
            });
        });

        this.get('#/catalog', function () {
            this.loggedIn = !!sessionStorage.getItem('authtoken');
            this.username = sessionStorage.getItem('username');
            this.hasNoTeam = true;
            this.teams = teamsService.loadTeams();

           this.loadPartials({
               header: './templates/common/header.hbs',
               footer: './templates/common/footer.hbs',
               team: './templates/catalog/team.hbs'
           }).then(function () {

               this.partial('./templates/catalog/teamCatalog.hbs')
           });
        });

        this.get('#/create', function () {
            this.loggedIn = !!sessionStorage.getItem('authtoken');
            this.username = sessionStorage.getItem('username');

            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                createForm: './templates/create/createForm.hbs'
            }).then(function () {
               this.partial('./templates/create/createPage.hbs');
            });
        });

        this.post('#/create', function (context) {
            let that = this;
            let {name, comment} = context.params;
            teamsService.createTeam(name, comment)
                .then(function () {
                    auth.showInfo('Successfully Created Team!');
                    that.redirect('#/catalog')
                });

        });

        this.get('#/login', function () {
           this.loadPartials({
               header: './templates/common/header.hbs',
               footer: './templates/common/footer.hbs',
               loginForm: './templates/login/loginForm.hbs'
           }).then(function () {
              this.partial('./templates/login/loginPage.hbs');
           });
        });

        this.post('#/login', function (context) {
            let that = this;
            let {username, password} = context.params;

            auth.login(username, password)
                .then(function (res) {
                    auth.saveSession(res);
                    auth.showInfo('Login Successfully!');
                    that.redirect('#/home');
                })
                .catch(function (e) {
                    auth.handleError(e);
                });
        });

        this.get('#/register', function () {
            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                registerForm: './templates/register/registerForm.hbs'
            }).then(function () {
                this.partial('./templates/register/registerPage.hbs')
            });
        });

        this.post('#/register', function (context) {
            let that = this;
            let {username, password, repeatPassword} = context.params;
            auth.register(username, password, repeatPassword)
                .then(function (res) {
                    auth.saveSession(res);
                    auth.showInfo('Registered Successfully!');
                    that.redirect('#/home');
                })
                .catch(function (e) {
                    auth.handleError(e);
                });
        });

        this.get('#/logout', async function () {
            await auth.logout();
            sessionStorage.clear();
            this.redirect('#/home');
        })
    });

    app.run('#/home');
});