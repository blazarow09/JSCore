handlers.getEditor = async function (ctx) {
	try {
		const userId = sessionStorage.getItem('userId');
		let [ receipt ] = await receiptService.getActiveReceipt(userId);

		if (!receipt) {
			receipt = await receiptService.createReceipt();
		}

		let entries = await entriesService.getAllByReceiptId(receipt._id);

		if(entries.length > 0){
			entries.forEach((e) => {
				e.subtotal = (e.quantity * e.price)
					.toFixed(2);
			});

			ctx.productsCount = entries.length;
			ctx.total = entries
				.map(e => +e.subtotal)
				.reduce((a, b) => a + b)
				.toFixed(2);
			ctx.subTotal = ctx.total;
		} else {
			ctx.subTotal = 0;
			ctx.productCount = 0;
		}

		this.username = sessionStorage.getItem('username');
		ctx.entries = entries;
		ctx.receiptId = receipt._id;

		ctx.loadPartials({
			header: './templates/common/header.hbs',
			footer: './templates/common/footer.hbs',
			checkout: './templates/editor/checkout.hbs',
			entryForm: './templates/editor/entryForm.hbs',
			entry: './templates/editor/entry.hbs'
		}).then(function () {
			this.partial('./templates/editor/editor-page.hbs');
		});
	} catch (err) {
		notify.handleError(err);
}};

handlers.createEntry = function (ctx) {
	let product = ctx.params.type;
	let quantity = ctx.params.quantity;
	let price = ctx.params.price;
	let receiptId = ctx.params.receiptId;

	let that = this;

	if(product === ''){
		notify.showError('Product must be non-empty!')
	} else if (isNaN(parseInt(quantity)) || quantity === '' || +quantity === 0) {
		notify.showError('Quantity must be a number!')
	} else if (isNaN(parseInt(price)) || price === '' || +price === 0){
		notify.showError('Price must be a number')
	} else {
		entriesService.createEntry(product, quantity, price, receiptId)
			.then(async function () {
				await entriesService.getAllByReceiptId(receiptId);
				notify.showInfo('Entry added');
				that.redirect('#/editor')
		});
}};

handlers.removeEntry = async function (ctx) {
	let entryId = ctx.params.id.slice(1);

	entriesService.removeEntry(entryId)
		.then(() => {
			notify.showInfo('Entry removed!');
			ctx.redirect('#/editor');
		}).catch(notify.handleError);
};

handlers.checkout = function (ctx) {
	const receiptId = ctx.params.receiptId;
	const productsCount = +ctx.params.productsCount;
	const total = ctx.params.subTotal;

	if(productsCount === 0){
		notify.showError('Cannot checkout empty receipt!')
	} else {
		receiptService.checkout(receiptId, productsCount, total)
			.then(() => {
				notify.showInfo('Receipt checked out!');
				ctx.redirect('#/editor');
			})
	}
};

handlers.getOverview = function (ctx) {

	const userId = sessionStorage.getItem('userId');
	receiptService.getMyReceipts(userId)
		.then((allReceipts) => {
			ctx.username = sessionStorage.getItem('username');
			ctx.receipts = allReceipts;

			allReceipts.forEach(x => {
				x.date = new Date(x._kmd.ect)
					.toDateString();
			});
			ctx.total = allReceipts
				.map(e => +e.subTotal)
				.reduce((a, b) => a + b)
				.toFixed(2);

			ctx.loadPartials({
				header: './templates/common/header.hbs',
				footer: './templates/common/footer.hbs',
				receipt: './templates/receipt/receiptEntry.hbs'
			}).then(function () {
				this.partial('./templates/receipt/receipt-page.hbs')
			})
		}).catch(notify.handleError);


};

handlers.getReceiptDetails = function (ctx) {
	const receiptId = ctx.params.id;

	entriesService.getAllByReceiptId(receiptId)
		.then((entries) => {
			entries.forEach(e => {
					e.subtotal = (e.price * e.quantity).toFixed(2);
				});

				ctx.username = sessionStorage.getItem('username');
				ctx.entries = entries;

				ctx.loadPartials({
					header: './templates/common/header.hbs',
					footer: './templates/common/footer.hbs',
					entry: './templates/receipt/receiptDetail.hbs'
				}).then(function () {
					this.partial('./templates/receipt/receipt-details.hbs')
				})
		}).catch(notify.handleError)
};