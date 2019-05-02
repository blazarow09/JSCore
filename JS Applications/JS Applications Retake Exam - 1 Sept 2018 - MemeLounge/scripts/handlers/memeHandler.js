handlers.getMemeFeed = async function (ctx) {
	this.isLogged = auth.isAuth();
	this.username = sessionStorage.getItem('username');
	let userId = sessionStorage.getItem('userId');

	let memes = await memeService.getAllMemes();

	memes.forEach((meme) => meme.isCreator = meme.creator === this.username);

	ctx.memes = memes;
	ctx.isEmptyMemeDb = memes.length === 0;

	ctx.loadPartials({
		header: 'templates/common/header.hbs',
		footer: 'templates/common/footer.hbs',
		meme: 'templates/memeFeed/meme.hbs'
	}).then(function () {
		this.partial('templates/memeFeed/feed.hbs');
	})
};

handlers.getCreateMemePage = function (ctx) {
	this.isLogged = auth.isAuth();
	this.username = sessionStorage.getItem('username');

	ctx.loadPartials({
		header: 'templates/common/header.hbs',
		footer: 'templates/common/footer.hbs'
	}).then(function () {
		this.partial('templates/createMeme/createMemePage.hbs');
	})
};

handlers.createMeme = function (ctx) {
	let creator = sessionStorage.getItem('username');
	let title = ctx.params.title;
	let description = ctx.params.description;
	let imageUrl = ctx.params.imageUrl;

	memeService.createMeme(creator ,title, description, imageUrl)
		.then(function () {
			notify.showInfo('Meme created!');
			ctx.redirect('#/feed');
		});
};

handlers.getMemeDetails = async function (ctx) {
	this.isLogged = auth.isAuth();
	this.username = sessionStorage.getItem('username');
	let username = this.username = sessionStorage.getItem('username');
	let memeId = ctx.params.id;

	memeService.getAMeme(memeId)
		.then(function (meme) {

			ctx.title = meme.title;
			ctx.description = meme.description;
			ctx.imageUrl = meme.imageUrl;
			ctx.creator = meme.creator;
			ctx.isCreator = meme.creator === username;

			ctx.loadPartials({
				header: 'templates/common/header.hbs',
				footer: 'templates/common/footer.hbs',
			}).then(function () {
				this.partial('templates/memeDetails/details.hbs')
			})
		});
};

handlers.getEditPage =  function (ctx) {
	this.isLogged = auth.isAuth();
	this.username = sessionStorage.getItem('username');
	let memeId = ctx.params.id;

	memeService.getEditMeme(memeId)
		.then(function (res) {

			ctx.title = res.title;
			ctx.description = res.description;
			ctx.imageUrl = res.imageUrl;
			ctx.id = res.id;
			ctx.creator = res.creator;

			ctx.loadPartials({
				header: 'templates/common/header.hbs',
				footer: 'templates/common/footer.hbs',
			}).then(function () {
				this.partial('templates/editMeme/edit.hbs')
			});
		});
};

handlers.editMeme = function (ctx) {

	ctx.isLogged = auth.isAuth();
	ctx.username = sessionStorage.getItem('username');

	let memeId = ctx.params.id;

	let title = ctx.params.title;
	let description = ctx.params.description;
	let imageUrl = ctx.params.imageUrl;
	let creator = ctx.username;

	if (title.length > 33 || title === '') {
		notify.showError('The title length must not exceed 33 characters and should be at least 1!');
	} else if (description.length > 450 || description.length < 5 || title === '') {
		notify.showError('The description length must not exceed 450 characters and should be at least 30!');
	} else if (!imageUrl.startsWith('http' || imageUrl === '')) {
		notify.showError('Link url should start with “http”.')
	} else {
		let data = {
			title,
			description,
			imageUrl,
			creator
		};

		memeService.editMeme(memeId, data)
			.then(function (res) {
				notify.showInfo(`Meme ${title} updated.`);
				ctx.redirect('#/feed');
			}).catch(function (err) {
				notify.handleError(err)
		})
	}
};