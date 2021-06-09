NoteView.prototype = Object.create(StorageManager.prototype);
NoteView.prototype.constructor = NoteView;
//creating instance of NoteControl
const noteView = new NoteView;




//NoteControl inherits properties of StorageManager
NoteControl.prototype = Object.create(StorageManager.prototype);
NoteControl.prototype.constructor = NoteControl;

//Create NoteControl Object
const noteControl = new NoteControl(noteView);

//Adding Event listeners
document.querySelector('#add-btn').addEventListener('click', noteControl.addNewNote)
document.querySelector('#clear-btn').addEventListener('click', noteControl.clearNotes)
document.querySelector('#save-btn').addEventListener('click', noteControl.saveAll)
document.addEventListener('DOMContentLoaded', noteControl.displayAll)

document.addEventListener('keydown', function (e) {
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        noteControl.saveAll();
    }
})

window.onbeforeunload = function (event) {
    if (noteControl.isUnsaved) return "Confirm refresh";
};