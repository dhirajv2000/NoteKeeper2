//function to create a new note object
function CreateNote(id, title = '', content = '') {
    this.id = id;
    this.title = title;
    this.content = content;
    this.font = {
        italic: false,
        bold: false,
        underline: false,
        strike: false
    }
}