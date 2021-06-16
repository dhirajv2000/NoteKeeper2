//Manages localstorage
function StorageManager() {}

// Stores array of objects
StorageManager.prototype.setStorage = function (notesList, displayAll = null) {
	return new Promise(function(resolve, reject){
	let dataObj = {data:""};
	let userid = {id:""};
	userid['id'] = sessionid.toString();
	notesList.unshift(userid);
	dataObj["data"] = notesList;
	var request = new XMLHttpRequest();   // new HttpRequest instance
	request.open("POST", "/NoteKeeper2/setstorage.action");
	request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	request.send(JSON.stringify(dataObj));
	request.onload = function(){
		if(displayAll){
			displayAll();
		}
	}
	});

    // localStorage.setItem('notesList', JSON.stringify(notesList))
}

// Retrieves array of objects
StorageManager.prototype.getStorage = function () {
	 return new Promise(function(resolve, reject) {
		    var xhr = new XMLHttpRequest();
		    xhr.onload = function() {
		      let nl = JSON.parse(this.response)
		      var notesList = nl["dataList"];
		      resolve( notesList != null ? JSON.parse(notesList) : []);
		    };
		    xhr.onerror = reject;
		    xhr.open('GET', '/NoteKeeper2/getstorage.action?id='+sessionid);
		    xhr.send();
		  });
}


// Clears storage
StorageManager.prototype.clearStorage = function (displayAll) {
	return new Promise(function(resolve, reject) {
		var request = new XMLHttpRequest();
		request.open("GET", '/NoteKeeper2/clearstorage.action?userID='+sessionid);
		let dataObj = {data:[{id:'5'}]};
		request.send();
		request.onload = function(){
			displayAll()
		}
	  });
    // localStorage.clear();
}