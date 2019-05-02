handlers.getCreatePetPage = function (ctx) {
	ctx.isLogged = auth.isAuth();
	ctx.username = sessionStorage.getItem('username');

	ctx.loadPartials({
		header: './templates/common/header.hbs',
		footer: './templates/common/footer.hbs'
	}).then(function () {
		this.partial('./templates/createPet/createPetPage.hbs');
	})
};

handlers.createPet = function (ctx) {
	let name = ctx.params.name;
	let description = ctx.params.description;
	let imageURL = ctx.params.imageURL;
	let category = ctx.params.category;

	petService.createPet(name, description, imageURL, category)
		.then(function () {
			notify.showInfo('Pet Created!');
			ctx.redirect('#/home')
		});
};

handlers.getDashboard = async function (ctx) {
	ctx.isLogged = auth.isAuth();
	ctx.username = sessionStorage.getItem('username');
	let userId = sessionStorage.getItem('userId');

	let pets = await petService.getAllPets();
	ctx.pets = pets.filter((pet) => pet._acl.creator !== userId);

		ctx.loadPartials({
			header: './templates/common/header.hbs',
			footer: './templates/common/footer.hbs',
			pet: './templates/dashboard/pet.hbs'
		}).then(function () {
			this.partial('./templates/dashboard/dashboard.hbs');
		});
};

handlers.likePet = async function(ctx){
	let petId = ctx.params.id;
	let pet = await petService.getAPet(petId);
	console.log(ctx);
	pet.likes = Number(pet.likes) + 1;

	petService.likePet(petId, pet)
		.then(function () {
			ctx.redirect('#/dashboard');
		})
		.catch(notify.handleError);
};

handlers.getMyPets = async function (ctx) {
	ctx.isLogged = auth.isAuth();
	ctx.username = sessionStorage.getItem('username');
	let userId = sessionStorage.getItem('userId');

	ctx.pets = await petService.getMyPets(userId);

	ctx.loadPartials({
		header: './templates/common/header.hbs',
		footer: './templates/common/footer.hbs',
		pet: './templates/myPets/myPet.hbs'
	}).then(function () {
		this.partial('./templates/myPets/myPets.hbs');
	});
};

handlers.getEditPet = async function (ctx) {
	ctx.isLogged = auth.isAuth();
	ctx.username = sessionStorage.getItem('username');
	let petId = ctx.params;

	let pet = await petService.getAPet('5cafe74df1d010597906225f');
	ctx.pet = pet;
	console.log(pet);

	ctx.loadPartials({
		header: './templates/common/header.hbs',
		footer: './templates/common/footer.hbs',
		pet: './templates/editPet/pet.hbs'
	}).then(function () {
		this.partial('./templates/editPet/editPetPage.hbs');
	})
};