//Sets limit on content editable div
//Code from https://codepen.io/ramonsenadev/pen/jywRQg

settings = {
  maxLen: 240
}

keys = {
  'backspace': 8,
  'shift': 16,
  'ctrl': 17,
  'alt': 18,
  'delete': 46,
  // 'cmd':
  'leftArrow': 37,
  'upArrow': 38,
  'rightArrow': 39,
  'downArrow': 40,
}

utils = {
  special: {},
  navigational: {},
  isSpecial(e) {
    return typeof this.special[e.keyCode] !== 'undefined';
  },
  isNavigational(e) {
    return typeof this.navigational[e.keyCode] !== 'undefined';
  }
}

utils.special[keys['backspace']] = true;
utils.special[keys['shift']] = true;
utils.special[keys['ctrl']] = true;
utils.special[keys['alt']] = true;
utils.special[keys['delete']] = true;

utils.navigational[keys['upArrow']] = true;
utils.navigational[keys['downArrow']] = true;
utils.navigational[keys['leftArrow']] = true;
utils.navigational[keys['rightArrow']] = true;

function maxLength(event) {
  let len = event.target.innerText.trim().length;
  hasSelection = false;
  selection = window.getSelection();
  isSpecial = utils.isSpecial(event);
  isNavigational = utils.isNavigational(event);

  if (selection) {
    hasSelection = !!selection.toString();
  }

  if (isSpecial || isNavigational) {
    return true;
  }

  if (len >= settings.maxLen && !hasSelection) {
    event.preventDefault();
    return false;
  }

}