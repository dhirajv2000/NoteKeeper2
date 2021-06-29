//function to create a new note object
function CreateNote(id, title = '', content = '') {
    this.id = id;
    this.title = title;
    this.content = content;
}

//Generate Random unique id for each note
function generateID() {
  return Math.random().toString(36).substr(2, 6)
}

//General debounce function
function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}