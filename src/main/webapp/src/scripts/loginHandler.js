function onSubmit(e){
	e.preventDefault();
	let uname = document.querySelector('#uname-box').value;
	let password = document.querySelector('#password-box').value;
	var xhr = new XMLHttpRequest();
    xhr.onload = function () {
    		let response = JSON.parse(this.response);
    		let sessionToken = response["sessionToken"]
    		localStorage.setItem("sessionToken", sessionToken);
    		localStorage.setItem("username", uname);
    		location.href = '/NoteKeeper2/index.jsp';
    };
    xhr.open('GET', '/NoteKeeper2/loginauth.action?uname=' +uname + '&password=' + password);
    xhr.send();
}

document.querySelector('#submit-btn').addEventListener('click', onSubmit)

