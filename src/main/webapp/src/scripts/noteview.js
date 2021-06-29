//Returns the template to be injected
function NoteView() {
    const self = this;
    let noteArray, note;

    //returns the id of the button which is clicked
    this.getButtonId = function (node) {
        return node.parentNode.parentNode.id;
    }
    
    //Returns note template
    this.getTemplate = function() {
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

    //Change font
    this.changeFont = function () {
        let buttonClicked = this.id;
        let fontStyle = {
            'italic-btn': 'italic',
            'bold-btn': 'bold',
            'underline-btn': 'underline',
            'strike-btn': 'strikethrough'
        }
        let selectedFont = fontStyle[buttonClicked]
        document.execCommand(selectedFont, false, '')
    }
}