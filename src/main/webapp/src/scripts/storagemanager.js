//Manages localstorage
function StorageManager() {}

// Stores array of objects
StorageManager.prototype.setStorage = function (notesList, displayAll = null) {
	return new Promise(function(resolve, reject){
	let dataObj = {data:""};
	let userid = {id:""};
	userid['id'] = id.toString();
	notesList.unshift(userid);
	dataObj["data"] = notesList;
	var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
	var theUrl = "/NoteKeeper2/writeJSON.action";
	xmlhttp.open("POST", theUrl);
	xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xmlhttp.send(JSON.stringify(dataObj));
	xmlhttp.onload = function(){
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
		    xhr.open('GET', '/NoteKeeper2/getdata.action');
		    xhr.send();
		  });
}


// Clears storage
StorageManager.prototype.clearStorage = function (displayAll) {
	return new Promise(function(resolve, reject) {
		var request = new XMLHttpRequest();
		request.open("POST", '/NoteKeeper2/cleardata.action');
		let dataObj = {data:[{id:'5'}]};
		request.send(JSON.stringify(dataObj));
		request.onload = function(){
			displayAll()
		}
	  });
    // localStorage.clear();
}