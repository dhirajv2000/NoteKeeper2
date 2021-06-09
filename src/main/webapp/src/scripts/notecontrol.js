//Manages Operations on notes
function NoteControl(noteView) {
    const self = this;
    let clickID, noteContent, noteTitle, note, noteArray = [],
        timer = null;
    const grid = document.querySelector('.grid')
    //this.isUnsaved = false;

    //Adds a new note to local storage
    this.addNewNote = function () {
        let note = new CreateNote(generateID());
        noteArray = self.getStorage();
        noteArray.push(note);
        self.setStorage(noteArray)
        self.renderNote(note);
    }

    //Displays the note on the page
    this.renderNote = function (note) {
        let tempelate = getTemplate();
        const wrapper = document.createElement('div');
        wrapper.setAttribute('id', note.id);
        wrapper.setAttribute('class', 'note-wrapper');
        wrapper.innerHTML += tempelate;
        if (note.title) {
            wrapper.querySelector('.note-title').innerHTML = note.title;
        }
        if (note.content)
            wrapper.querySelector('.note-content').innerHTML = note.content;
        if (note.font.bold)
            wrapper.querySelector('.note-content').classList.add('bold')
        if (note.font.italic)
            wrapper.querySelector('.note-content').classList.add('italic')
        if (note.font.underline)
            wrapper.querySelector('.note-content').classList.add('underline')
        if (note.font.strike)
            wrapper.querySelector('.note-content').classList.add('strike')
        self.appendListeners(wrapper);
        grid.appendChild(wrapper)
    }

    //Updates notes on click of save button
    this.updateNote = function (id) {
        clickID = id;
        const wrapper = document.getElementById(clickID);
        noteTitle = wrapper.querySelector('.note-title')
        noteContent = wrapper.querySelector('.note-content')
        noteArray = self.getStorage();
        note = noteArray.find(note => note.id == clickID);
        note.title = noteTitle.innerHTML;
        note.content = noteContent.innerHTML;
        self.setStorage(noteArray)
        //self.isUnsaved = false;
    }

    //Deletes a note and updates local storage
    this.deleteNote = function () {
        clickID = self.getButtonId(this);
        if (!confirm('Are you sure you want to delete? Notes once deleted cannot be undone.')) return;
        note = noteArray.find(note => note.id == clickID);
        noteArray.splice(noteArray.findIndex(obj => obj.id === note.id), 1)
        self.setStorage(noteArray)
        self.displayAll();
    }

    //Displays all the notes
    this.displayAll = function () {
        noteArray = self.getStorage();
        grid.innerHTML = '';
        noteArray.forEach(note => self.renderNote(note))
    }

    //Saves all notes
    this.saveAll = function () {
        noteArray = self.getStorage();
        noteArray.forEach(note => self.updateNote(note.id))
    }

    //Clears all the notes and local storage.
    this.clearNotes = function () {
        if (!confirm('Are you sure you want to delete? Notes once deleted cannot be undone.')) return;
        self.clearStorage();
        self.displayAll();
    }

    //returns the id of the button whic is clicked
    this.getButtonId = function (node) {
        return node.parentNode.parentNode.id;
    }

    //Detects changes and updates the note
    this.detectChange = function () {
        clearTimeout(timer)
        let id = this.id
        timer = setTimeout(function () {
            self.updateNote(id);
        }, 3000)
    }

    //appends event listeners to a new note object
    this.appendListeners = function (wrapper) {

        let boldButton = wrapper.querySelector('.note-btns').querySelector('#bold-btn')
        boldButton.addEventListener('mousedown', function (e) {
            e.preventDefault()
        })
        boldButton.addEventListener("click", noteView.changeFont)

        let italicButton = wrapper.querySelector('.note-btns').querySelector('#italic-btn')
        italicButton.addEventListener('mousedown', function (e) {
            e.preventDefault()
        })
        italicButton.addEventListener("click", noteView.changeFont)

        let underlineButton = wrapper.querySelector('.note-btns').querySelector('#underline-btn')
        underlineButton.addEventListener('mousedown', function (e) {
            e.preventDefault()
        })
        underlineButton.addEventListener("click", noteView.changeFont)

        let strikeButton = wrapper.querySelector('.note-btns').querySelector('#strike-btn')
        strikeButton.addEventListener('mousedown', function (e) {
            e.preventDefault()
        })
        strikeButton.addEventListener("click", noteView.changeFont)


        let deleteButton = wrapper.querySelector('#delete-btn')
        deleteButton.addEventListener('click', self.deleteNote)

        wrapper.addEventListener('input', self.detectChange)


        //wrapper.querySelector('.note-title').addEventListener('focusin', noteView.clearPlaceholder)
        //wrapper.querySelector('.note-title').addEventListener('focusout', noteView.addPlaceholder)

    }


}