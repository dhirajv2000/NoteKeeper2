StorageManager.prototype.getStorage = function () {
	 return new Promise(function(resolve, reject) {
		    var xhr = new XMLHttpRequest();
		    xhr.onload = function() {
		      let nl = JSON.parse(this.response)
		      var notesList = nl["dataList"];
		      console.log(JSON.parse(notesList))
		      resolve( notesList != null ? JSON.parse(notesList) : []);
		    };
		    xhr.onerror = reject;
		    xhr.open('GET', '/NoteKeeper2/getdata.action');
		    xhr.send();
		  });
}