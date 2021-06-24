//Manages localstorage
function StorageManager() {}

// Prepare payload
StorageManager.prototype.preparePayload = function(notesList){
	 let noteArray = Object.assign([], notesList);
     let dataObj = {
         data: ""
     };
     let userid = {
         id: ""
     };
     userid['id'] = sessiontoken.toString();
     noteArray.unshift(userid);
     dataObj["data"] = noteArray;
     return dataObj;
}
// Stores array of objects
StorageManager.prototype.saveNotes = function (notesList, displayAll = null) { 
      return requestHandler.post("/NoteKeeper2/savenotes.action", JSON.stringify(this.preparePayload(notesList)))
}

// Retrieves array of objects
StorageManager.prototype.getNotes = function () {
	return requestHandler.get('/NoteKeeper2/getnotes.action?sessionToken='+sessiontoken)
}


// Clears storage
StorageManager.prototype.clearAllNotes = function (displayAll) {
	return requestHandler.get('/NoteKeeper2/clearnotes.action?sessionToken=' + sessiontoken)
}

StorageManager.prototype.deleteSelectedNote = function (deletedNote) {
	return requestHandler.post("/NoteKeeper2/deletenote.action", JSON.stringify(this.preparePayload(deletedNote)))
}

