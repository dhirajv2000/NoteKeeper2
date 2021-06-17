function getTemplate() {
  return tempelate = `
    <div class = 'note-header'>
      <button id='delete-btn'><i class="fas fa-times"></i></button>
    </div>
    <div class = 'note-title' contenteditable="true" data-placeholder = "Title Goes here"></div>
    <div class = 'note-content'contenteditable="true"  data-placeholder = "Content Goes here"></div>
    <div class="note-btns">
    <button  id ='bold-btn'><i class="fas fa-bold"></i></button>
    <button  id ='italic-btn'><i class="fas fa-italic"></i></button>
    <button  id ='underline-btn'><i class="fas fa-underline"></i></button>
    <button  id ='strike-btn'><i class="fas fa-strikethrough"></i></button>
    </div>
    `;
}

function generateID() {
  return Math.random().toString(36).substr(2, 6)
}

function fetchSessionDetails() {
	return new Promise(function(resolve, reject) {
	    var xhr = new XMLHttpRequest();
	    xhr.onload = function() {
	     let sessionId = JSON.parse(this.response)
	     resolve(sessionId['sessionDetails']);
	     //resolve( sessionId['sessionId']);
	    };
	    xhr.onerror = reject;
	    xhr.open('GET', '/NoteKeeper2/getsession.action');
	    xhr.send();
	  });
}

function intialiseSessionDetails() {
	fetchSessionDetails().then(function(response){
		sessionid = response[0];
		sessionuser = response[1];
		//localStorage.setItem('sessionid', sessionid)
		noteControl.displayAll();
		document.getElementById('usernameHeader').innerHTML = "Hello, " + sessionuser;
	})
}
var sessionid;
var sessionuser;

/*function doLogout() {
	location.href='/NoteKeeper2/logout.action'
}*/

function intialiseBroadcast() {
	document.querySelector('#logout-btn').addEventListener('click', e => {
		location.href='/NoteKeeper2/logout.action'
		authChannel.postMessage({action:'logout'});
	});
	
	authChannel.onmessage = function(e) {
		if(e.data.action === 'logout'){
			location.href='/NoteKeeper2/logout.action'
		}
	}
}
	

	

	
