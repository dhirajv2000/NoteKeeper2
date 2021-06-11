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
    //localStorage.setItem('notesList', JSON.stringify(notesList))
}

//Retrieves array of objects
StorageManager.prototype.getStorage = function () {
	 var xhr = new XMLHttpRequest();

	 xhr.open('GET', '/NoteKeeper2/getdata.action', false);
	  xhr.send('');
	    if (xhr.readyState === 4) {
	      var abc = JSON.parse(xhr.response);
	      var notesList = abc["dataList"];
	      console.log(JSON.parse(notesList));
	      //console.log(localStorage.hasOwnProperty('notesList') ? JSON.parse(localStorage.getItem('notesList')) : []);
	    }
	   // return localStorage.hasOwnProperty('notesList') ? JSON.parse(localStorage.getItem('notesList')) : [];
	    return notesList ? JSON.parse(notesList) : [];
}


//Clears storage
StorageManager.prototype.clearStorage = function () {
	var request = new XMLHttpRequest();
	request.open("POST", '/NoteKeeper2/cleardata.action');
	request.send('hi');
    //localStorage.clear();
}