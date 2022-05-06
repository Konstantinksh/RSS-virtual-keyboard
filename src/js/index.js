console.log('start')

import '../scss/style.scss'


const Keyboard = {
  elements: {
    main: null,
    mainContainer: null,
    keysContainer: null,
    keys: []
  },

  eventHandlers: {
    oninput: null,
    onclose: null
  },

  properties: {
    value: "",
    capsLock: false
  },

  init() {
    console.log('init')
    this.elements.main = document.createElement('div');
    this.elements.mainContainer = document.createElement('div');
    this.elements.keysContainer = document.createElement('div');

    this.elements.main.classList.add('keyboard');
    this.elements.mainContainer.classList.add('keyboard__conteiner');
    this.elements.keysContainer.classList.add('keyboard__keys', 'key', '_wrapper');

    this.elements.keysContainer.append(this._createKeys())
    this.elements.mainContainer.append(this.elements.keysContainer);
    this.elements.main.append(this.elements.mainContainer);
    document.body.append(this.elements.main)
  },

  _createKeys() {    
    const fragment = document.createDocumentFragment();
    const keyLayout = [
        "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace",
        "Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\", "DEL",
        "Caps Lock", "A", "S", "D", "F", "G", "H", "J", "K", "L", "ENTER",
        "Shift", "\\", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "&#9650", "Shift",
        "Ctrl", "Win", "Alt", "space", "Alt", "Ctrl", "&#9668", "&#9660", "&#9658"
    ];

    function createButtonHTML(key) {
      let keyButton = document.createElement('button');

      keyButton.setAttribute('type', 'button');
      keyButton.classList.add('key__container');

      keyButton.innerHTML = `${key}`;

      return keyButton
    }

    keyLayout.forEach(key => {
      const keyElement = createButtonHTML(key);

      fragment.append(keyElement)
    })

    function setKeyClasses(key) {
      
    }

    return fragment
  },

  _trigerEvent(handlerName) {
    console.log("Event Triggered! Name:" + handlerName)
  },

  _toggleCapsLock() {
    console.log("Caps Lock Toggled!")
  },

  open(initialValue, oninput, onclose) {

  },

  close() {

  }
}

window.addEventListener("DOMContentLoaded", function() {
  Keyboard.init();
})

console.log('end')