//Manages localstorage
function StorageManager() {}

// Stores array of objects
StorageManager.prototype.saveNotes = function (notesList, displayAll = null) {
    return new Promise(function (resolve, reject) {
        let noteArray = Object.assign([], notesList);
        let dataObj = {
            data: ""
        };
        let userid = {
            id: ""
        };
        userid['id'] = sessionid.toString();
        noteArray.unshift(userid);
        dataObj["data"] = noteArray;
        var request = new XMLHttpRequest(); // new HttpRequest instance
        request.open("POST", "/NoteKeeper2/savenotes.action");
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request.send(JSON.stringify(dataObj));
        request.onload = function () {
            if (displayAll) {
                displayAll();
            }
        }
    });
}

// Retrieves array of objects
StorageManager.prototype.getNotes = function () {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            let nl = JSON.parse(this.response)
            var notesList = nl["dataList"];
            resolve(notesList);
        };
        xhr.onerror = reject;
        xhr.open('GET', '/NoteKeeper2/getnotes.action?id=' + sessionid);
        xhr.send();
    });
}


// Clears storage
StorageManager.prototype.clearAllNotes = function (displayAll) {
    return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();
        request.open("GET", '/NoteKeeper2/clearnotes.action?userID=' + sessionid);
        request.send();
        request.onload = function () {
            displayAll()
        }
    });
}

StorageManager.prototype.deleteSelectedNote = function (deletedNote, displayAll) {
    return new Promise(function (resolve, reject) {
        let dataObj = {
            data: ""
        };
        let userid = {
            id: ""
        };
        userid['id'] = sessionid.toString();
        deletedNote.unshift(userid);
        dataObj["data"] = deletedNote;
        var request = new XMLHttpRequest(); // new HttpRequest instance
        request.open("POST", "/NoteKeeper2/deletenote.action");
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request.send(JSON.stringify(dataObj));
        request.onload = function () {
            if (displayAll) {
                displayAll();
            }
        }
    });
}

