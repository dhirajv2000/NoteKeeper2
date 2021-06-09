//Manages localstorage
function StorageManager() {}

//Stores array of objects
StorageManager.prototype.setStorage = function (notesList) {
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