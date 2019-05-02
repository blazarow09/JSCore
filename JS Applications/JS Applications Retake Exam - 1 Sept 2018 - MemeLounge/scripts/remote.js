let remote = (() => {
	const BASE_URL = 'https://baas.kinvey.com/';
	const APP_KEY = 'kid_S1kci0pYE';
	const APP_SECRET = 'eef83f8ce5df49c9a6c95a282f27ca05';

	function makeAuth(auth) {
		if(auth === 'basic'){
			return `Basic ${btoa(APP_KEY + ':' + APP_SECRET)}`;
		} else {
			return `Kinvey ${sessionStorage.getItem('authtoken')}`;
		}
	}

	function makeRequest(method, module, endpoint, auth) {
		return {
			method: method,
			url: BASE_URL + module + '/' + APP_KEY + '/'+ endpoint,
			headers: {
				'Authorization': makeAuth(auth)
			}
		}
	}

	function get(module, endpoint, auth, query) {
		if(query)
		{
			endpoint += query;
		}
		return $.ajax(makeRequest('GET', module, endpoint, auth));
	}

	function post(module, endpoint, auth, data) {
		let obj = makeRequest('POST', module, endpoint, auth);

		if(data){
			obj.data = data;
		}

		return $.ajax(obj);
	}

	function update(module, endpoint, auth, data) {
		let obj = makeRequest('PUT', module, endpoint, auth);

		obj.data = data;

		return $.ajax(obj);
	}

	function remove(module, endpoint, auth) {
		return $.ajax(makeRequest('DELETE', module, endpoint, auth));
	}

	return {
		get,
		post,
		update,
		remove
	};
})();