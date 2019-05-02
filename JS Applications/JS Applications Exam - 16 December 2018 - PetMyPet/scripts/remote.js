let remote = (() => {
	const BASE_URL = 'https://baas.kinvey.com/';
	const APP_KEY = 'kid_SyZkz93YN';
	const APP_SECRET = '4a8d8cfde5f7417889da4fada736113d';

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