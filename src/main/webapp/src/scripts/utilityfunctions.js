function getTemplate() {
  return tempelate = `
    <div class = 'note-header'>
      <button id='delete-btn'><i class="fas fa-times"></i></button>
    </div>
    <div class = 'note-title' contenteditable="true" data-placeholder = "Title Goes here"></div>
    <div class = 'note-content'contenteditable="true"  data-placeholder = "Content Goes here"></div>
    <div class="note-btns">
    <button  id ='bold-btn'><i class="fas fa-bold"></i></button>
    <button  id ='italic-btn'><i class="fas fa-italic"></i></button>
    <button  id ='underline-btn'><i class="fas fa-underline"></i></button>
    <button  id ='strike-btn'><i class="fas fa-strikethrough"></i></button>
    </div>
    `;
}

function generateID() {
  return Math.random().toString(36).substr(2, 6)
}