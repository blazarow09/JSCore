
handlers.getMySongsList = async function(ctx) {
	this.isLogged = auth.isAuth();
	this.username = sessionStorage.getItem('username');

	try {
		let songs = await songService.getAllSongs();
		let userId = sessionStorage.getItem('userId');
		songs.forEach((song) => song.isCreator = song._acl.creator === userId);

		ctx.songs = songs.filter((currSong) => currSong.isCreator === true);

		ctx.loadPartials({
			header: 'templates/common/header.hbs',
			footer: 'templates/common/footer.hbs',
			song: 'templates/songs/song.hbs'
		}).then(function () {
			this.partial('./templates/songs/mySongs.hbs')
		})
	} catch (e) {
		console.log(e);a
	}
};

handlers.getAllSongsPage = async function (ctx) {
	this.isLogged = auth.isAuth();
	this.username = sessionStorage.getItem('username');
	let that = this;
	try {
		let songs = await songService.getAllSongs();
		let userId = sessionStorage.getItem('userId');
		songs.forEach((song) => song.isCreator = song._acl.creator === userId);

		ctx.songs = songs;
		ctx.loadPartials({
			header: 'templates/common/header.hbs',
			footer: 'templates/common/footer.hbs',
			song: 'templates/songs/song.hbs'
		}).then(function () {
			this.partial('./templates/songs/allSongs.hbs');
		})
	} catch (e) {
		notify.handleError(e);
	}
};

handlers.getCreateSongPage = function (ctx) {
	this.isLogged = auth.isAuth();
	this.username = sessionStorage.getItem('username');

	ctx.loadPartials({
		header: 'templates/common/header.hbs',
		footer: 'templates/common/footer.hbs'
	}).then(function () {
		this.partial('./templates/songs/createSong.hbs')
	})
};

handlers.postCreateSong = function (ctx) {
	try {
		let title = ctx.params.title;
		let artist = ctx.params.artist;
		let imageURL = ctx.params.imageURL;

		let pattern = new RegExp('http[s]*:\\/\\/\\w+.+');
		let isImageUrlValid = pattern.test(imageURL);
		let that = this;
		if (title.length < 6) {
			notify.showError('The song title must be at least 6 characters long!')
		} else if (artist.length < 3) {
			notify.showError('The song title must be at least 3 characters long!')
		} else if (!isImageUrlValid) {
			notify.showError('Invalid image URL!')
		} else {
			let data = {title, artist, imageURL, likes: 0, listened: 0};

			songService.createSong(data)
				.then(() => {
					notify.showInfo('Song created successfully.');
					that.redirect('#/mySongs')
				})
				.catch(notify.handleError);
		}
	} catch (e) {
		console.log(e);
	}
};

handlers.likeSong = async function (ctx) {
	let songId = ctx.params.id;
	let song = await songService.getASong(songId);

	song.likes = Number(song.likes) + 1;

	songService.likeSong(songId, song)
		.then(function () {
			notify.showInfo(`Liked`);
			ctx.redirect('#/allSongs');
		})
		.catch(notify.handleError);
};

handlers.listenSong = async function(ctx){
	let songId = ctx.params.id;
	let song = await songService.getASong(songId);

	song.listened = Number(song.listened) + 1;

	songService.listenSong(songId, song)
		.then(function () {
			notify.showInfo(`You just listened ${song.title}`);
			ctx.redirect('#/allSongs');
		})
};

handlers.removeSong = async function (ctx) {
	await songService.removeSong(ctx.params.id)
		.then(function () {
			notify.showInfo('Song removed successfully!');
			ctx.redirect('#/mySongs')
		});
};