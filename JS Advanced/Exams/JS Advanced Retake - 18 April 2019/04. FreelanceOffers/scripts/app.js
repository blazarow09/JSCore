(function solve() {
	$('#create-offers').css('display', 'none');
	let loginBtn = $('#loginBtn');

	loginBtn.on('click', function (e) {
		e.preventDefault();

		if(loginBtn.text() === 'Login') {
			let username = $('#username');

			if(username.val().length >= 4 && username.val().length <= 10){
				$('#create-offers').css('display', 'block');

				loginBtn.text('Logout');
				username.val(`Hello, ${username.val()}!`);
				username.addClass('border-0 bg-light');
				username.attr('disabled', 'disabled');

			} else {
				$('#notification').text('The username length should be between 4 and 10 characters.');
			}
		} else if(loginBtn.text() === 'Logout'){
			$('#create-offers').css('display', 'none');
			loginBtn.text('Login');
			let username = $('#username');
			username.val('');
			username.removeClass('border-0 bg-light');
			username.addClass('form-control mr-sm-2');
			username.prop('disabled', false);
		}
	});

	$('#notification').text('');

	let createOfferBtn = $('#create-offer-Btn');

	createOfferBtn.on('click', function (e) {
		e.preventDefault();

		let offerName = $('#create-offers form input').eq(0);
		let companyName = $('#create-offers form input').eq(1);
		let description = $('#description');

		if(offerName.val() && companyName.val() && description.val()) {
			let offers = $('#offers-container');
			let form = `<div class="col-3"><div class="card text-white bg-dark mb-3 pb-3" style="max-width: 18rem;"><div class="card-header">${offerName.val()}</div><div class="card-body"><h5 class="card-title">${companyName.val()}</h5><p class="card-text">${description.val()}</p></div></div></div>`;

			let html = $.parseHTML(form);
			offers.append(html);

			offerName.val('');
			companyName.val('');
			description.val('');
		}
	})
})();



