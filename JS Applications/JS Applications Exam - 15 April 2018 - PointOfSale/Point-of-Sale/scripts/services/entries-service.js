let entriesService = (() => {
	function getAllByReceiptId(receiptId) {
		const endpoint = `entries?query={"receiptId":"${receiptId}"}`;

		return remote.get('appdata', endpoint, 'kinvey');
	}

	function createEntry(type, quantity, price, receiptId) {
		const data = {type, quantity, price, receiptId };

		return remote.post('appdata', 'entries', 'kinvey', data);
	}
	
	function removeEntry(entryId) {
		const endpoint = `entries/${entryId}`;

		return remote.remove('appdata', endpoint, 'kinvey')
	}

	return {
		getAllByReceiptId,
		createEntry,
		removeEntry
	}
})();