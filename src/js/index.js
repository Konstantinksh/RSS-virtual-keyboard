console.log('start')


const Keyboard = {
  elements: {
    main: null,
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
    this.elements.keysContainer = document.createElement('div');

    this.elements.main.classList.add('keyboard');
    this.elements.keysContainer.classList.add('keyboard__conteiner');

    this.elements.main.append(this.elements.keysContainer);
    document.body.append(this.elements.main)
  },

  _createKeys() {

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