let receiptService = (() => {
	function getActiveReceipt(userId) {
		const endpoint = `receipts?query={"_acl.creator":"${userId}","active":"true"}`;

		return remote.get('appdata', endpoint, 'kinvey');
	}
	
	function createReceipt() {
		const data = {
			active: true,
			productCount: 0,
			total: 0
		};

		return remote.post('appdata', 'receipts', 'kinvey', data );
	}
	
	function getMyReceipts(userId) {
		const endpoint = `receipts?query={"_acl.creator":"${userId}","active":"false"}`;

		return remote.get('appdata', endpoint, 'kinvey');
	}

	function getById(receiptId) {
		const endpoint = `receipts/${receiptId}`;

		return remote.get('appdata', endpoint, 'kinvey');
	}

	async function checkout(receiptId, productsCount, total) {
		const endpoint = `receipts/${receiptId}`;

		let receipt = await getById(receiptId);
		receipt['active'] = false;
		receipt['productsCount'] = productsCount;
		receipt['subTotal'] = total;

		return remote.update('appdata', endpoint, 'kinvey', receipt);
	}

	return {
		getActiveReceipt,
		createReceipt,
		getMyReceipts,
		getById,
		checkout
	}
})();