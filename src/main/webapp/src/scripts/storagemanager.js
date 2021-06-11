//Manages localstorage
function StorageManager() {}

//Stores array of objects
StorageManager.prototype.setStorage = function (notesList) {
	let dataObj = {data:""};
	dataObj["data"] = notesList;
	var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
	var theUrl = "/NoteKeeper2/writeJSON.action";
	xmlhttp.open("POST", theUrl);
	xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xmlhttp.send(JSON.stringify(dataObj));
    localStorage.setItem('notesList', JSON.stringify(notesList))
}

//Retrieves array of objects
StorageManager.prototype.getStorage = function () {
    return localStorage.hasOwnProperty('notesList') ? JSON.parse(localStorage.getItem('notesList')) : [];
}

//Clears storage
StorageManager.prototype.clearStorage = function () {
    localStorage.clear();
}