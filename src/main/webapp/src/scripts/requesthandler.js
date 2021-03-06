//Handles all get and post request
const requestHandler = {
	get: function (url) {
		return new Promise(function (resolve, reject) {
			let request = new XMLHttpRequest();
			request.onload = function () {
				let response = JSON.parse(this.response);
				if (response.statusCode == 401) {
					localStorage.clear();
					location.href = '/NoteKeeper2/loginTokenExpired.jsp';
				} else if (response.statusCode == 403) {
					location.href = '/NoteKeeper2/loginError.jsp'
				} else {
					resolve(response);
				}
			};
			request.onerror = reject;
			request.open('GET', url);
			request.send();
		})
	},
	post: function (url, payload) {
		return new Promise(function (resolve, reject) {
			let request = new XMLHttpRequest(); // new HttpRequest instance
			request.onerror = reject;
			request.onload = function () {
				let response = JSON.parse(this.response)
				if (response.statusCode === 401) {
					localStorage.clear();
					location.href = '/NoteKeeper2/loginTokenExpired.jsp';
				}
			};
			request.open("POST", url);
			request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
			request.send(payload);
		});
	}
}