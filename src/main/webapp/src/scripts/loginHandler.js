function onSubmit(e){
	e.preventDefault();
	let uname = document.querySelector('#uname-box').value;
	let password = document.querySelector('#password-box').value;
	requestHandler.get('/NoteKeeper2/loginauth.action?uname=' +uname + '&password=' + password).then(
				function(response) {
					let sessionToken = response["sessionToken"]
		    		localStorage.setItem("sessionToken", sessionToken);
		    		localStorage.setItem("username", uname);
		    		location.href = '/NoteKeeper2/index.jsp';
				}
			)
}

document.querySelector('#submit-btn').addEventListener('click', onSubmit)

