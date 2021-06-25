//Manages Operations on notes
function NoteControl(noteView) {
    const self = this;
    let clickID, noteContent, noteTitle, note, timer = null,
        noteArray, updateArray =[];
    const grid = document.querySelector('.grid')

    this.loadNoteArray = function () {
        self.getNotes().then(function (response) {
            noteArray = response["dataList"] != null ? JSON.parse(response["dataList"]) : [];
            self.displayAll();
        })
    }
    
    this.setNoteArray = function (updatedNoteArray) {
    	noteArray = Object.assign([], updatedNoteArray);
    	self.displayAll();
    }
    
    this.updateChannel = function () {
    	 let channelObj = {
             	action: 'update',
             	updatedNoteArray: null
             }
         channelObj.updatedNoteArray = noteArray;
         authChannel.postMessage(channelObj);
    }
    // Adds a new note to local storage
    this.addNewNote = function () {
        let note = new CreateNote(generateID());
        noteArray.push(note);
        updateArray.push(note)
        self.saveNotes(updateArray)
        updateArray = []
        self.updateChannel();
        self.renderNote(note);
    }

    // Displays the note on the page
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
        self.appendListeners(wrapper);
        grid.appendChild(wrapper)
    }

    // Updates notes on click of save button
    this.updateNote = function (id) {
        let clickID = id;
        let isChanged = false;
        const wrapper = document.getElementById(clickID);
        let noteTitle = wrapper.querySelector('.note-title')
        noteContent = wrapper.querySelector('.note-content')
        let clickID1 = clickID
        let note = noteArray.find(note => note.id == clickID1);
        if(note.title !== noteTitle.innerHTML){
        	isChanged = true;
        	note.title = noteTitle.innerHTML;
        }
        if(note.content !== noteContent.innerHTML){
        	isChanged = true;
        	note.content = noteContent.innerHTML;
        }
        if(isChanged) updateArray.push(note);
    }

    // Deletes a note and updates local storage
    this.deleteNote = function () {
        clickID = self.getButtonId(this);
        if (!confirm('Are you sure you want to delete? Notes once deleted cannot be undone.')) return;
        note = noteArray.find(note => note.id == clickID);
        let deletedNote = noteArray.splice(noteArray.findIndex(obj => obj.id === note.id), 1);
        self.deleteSelectedNote(deletedNote);
        self.displayAll();
        self.updateChannel();
    }

    // Displays all the notes
    this.displayAll = function () {
        grid.innerHTML = '';
        noteArray.forEach(note => self.renderNote(note))
    }

    // Saves all notes
    this.saveAll = function () {
        noteArray.forEach(note => {
            self.updateNote(note.id); 
        })
        if(updateArray.length !=0) self.saveNotes(updateArray);
        updateArray = [];
        self.updateChannel();
    }

    // Clears all the notes and local storage.
    this.clearNotes = function () {
        if (!confirm('Are you sure you want to delete? Notes once deleted cannot be undone.')) return;
        noteArray = [];
        self.clearAllNotes().then(function(){
        	self.displayAll();
        });
        self.updateChannel();
    }

    // returns the id of the button which is clicked
    this.getButtonId = function (node) {
        return node.parentNode.parentNode.id;
    }

    // Detects changes and updates the note
    this.detectChange = function () {
        clearTimeout(timer)
        timer = setTimeout(function () {
            self.saveAll();
        }, 3000)
    }

    // appends event listeners to a new note object
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
        
        let contentBox = wrapper.querySelector('.note-content');
        
        contentBox.addEventListener('keydown', function(e){
        	if(e.keyCode != 8 && contentBox.innerText.length >= 240)
            {
        	   e.preventDefault();
               e.stopPropagation();
               return false;
            }
        })
        
        wrapper.addEventListener('input', self.detectChange)

    }
}