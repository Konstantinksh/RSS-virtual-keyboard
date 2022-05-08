console.log('start')

import '../scss/style.scss';
import { keysData } from './KeysData';
import { KeyButton } from './KeyButton';
import { CustomMouseEvent } from './CustomMouseEvent';


window.addEventListener("DOMContentLoaded", function() {
  Keyboard.init();
  Keyboard._listen();
})

const Keyboard = {
  elements: {
    main: null,
    mainContainer: null,
    keysContainer: null,
    keys: [],
    activeButtons: new Set(),
    inputArea: document.querySelector('textarea')
  },

  properties: {
    value: "",
    capsState: false,
    shiftState: false,
    ctrlState: false,
    altState: false,
    langState: 'Eng'
  },

  init() {
    console.log('init')
    this.elements.main = document.createElement('div');
    this.elements.mainContainer = document.createElement('div');
    this.elements.keysContainer = document.createElement('div');

    this.elements.main.classList.add('keyboard');
    this.elements.mainContainer.classList.add('keyboard__conteiner');
    this.elements.keysContainer.classList.add('keyboard__keys', 'key', '_wrapper');

    this.elements.keysContainer.append(this._createKeys());
    this.elements.mainContainer.append(this.elements.keysContainer);
    this.elements.main.append(this.elements.mainContainer);
    document.body.append(this.elements.main);
  },

  refresh() {
    console.log('referesh')
    this.elements.keysContainer = document.querySelector('.keyboard__keys');
    this.elements.keysContainer.innerHTML = '';
    this.elements.keysContainer.append(this._createKeys())
  },

  input() {

  },

  _createKeys() {    
    const fragment = document.createDocumentFragment();

    keysData.forEach(elem => {
      const keyElement = new KeyButton(elem, this.properties);
      const keyElementHTML = keyElement.createButton();
      setKeyClasses(keyElement.code, keyElementHTML);
      fragment.append(keyElementHTML);
    })

    function setKeyClasses(key, keyElement) {
      // console.log(key, keyElement)
      if (Keyboard.elements.activeButtons.has(key)) {
        keyElement.classList.add('key_active');
      } else if (Keyboard.elements.activeButtons.has(key)) {
        keyElement.classList.add('key_active');
      }
      switch (key) {
        case "Backspace":
        case "Enter":
          keyElement.classList.add('key_blacked', 'key_size-l')
          break;
        case "ShiftLeft":
        case "ShiftRight":
          keyElement.classList.add('key_blacked', 'key_size-xl')
          break;
        case "CapsLock":
          keyElement.classList.add('key_blacked', 'key_size-xxm')
          break;
        case "Tab":
        case "Delete":
        case "Fn":
          keyElement.classList.add('key_blacked', 'key_size-m')
          break;
        case "ControlLeft":
        case "ControlRight":
          keyElement.classList.add('key_blacked', 'key_size-xm')
          break;
        case "ArrowUp":
        case "ArrowRight":
        case "ArrowLeft":
        case "ArrowDown":
        case "AltLeft":
        case "AltRight":
        case "Backquote":
          keyElement.classList.add('key_blacked')
          break;
        case "Space":
          keyElement.classList.add('key_size-xxl')
          break;
      }
    }
    return fragment
  },

  _listen(){
    document.body.addEventListener('keydown', this._trigerKeyboardEvent);
    document.body.addEventListener('keyup', this._trigerKeyboardEvent);
    // console.log(this.elements.inputArea)
    this.elements.inputArea.addEventListener("focusout", () => this.elements.inputArea.focus());
    this.elements.keysContainer.addEventListener('mousedown', this._trigerMouseEvent)
    this.elements.keysContainer.addEventListener('mouseup', this._trigerMouseEvent)
  },

  _trigerMouseEvent(event){
    let newMouseEvent = new CustomMouseEvent(event);

    if (newMouseEvent.isTargetButton) {
      newMouseEvent.getInnerType(keysData);
      newMouseEvent.getNewEventValue();
      newMouseEvent.getNewEventType();

      if (event.type === 'mousedown') {
        Keyboard.elements.inputArea.value += newMouseEvent.newEventValue;
        Keyboard.elements.keysContainer.addEventListener('mouseout', Keyboard._trigerMouseEvent);
      } else if (event.type === 'mouseup' || event.type === 'mouseout') {
        Keyboard.elements.keysContainer.removeEventListener('mouseout', Keyboard._trigerMouseEvent);
      }
      // console.log(newMouseEvent)
      let newButtonEvent = new KeyboardEvent(newMouseEvent.newEventType, {code: newMouseEvent.newEventCode})
      document.body.dispatchEvent(newButtonEvent)
    }
  },

  _trigerKeyboardEvent(event) {
    // console.log("Event Triggered! Name:" + event.code)
    Keyboard._makeButtonActive(event)
    switch (event.code) {
      case "ShiftLeft":
      case "ShiftRight":
        Keyboard._toggleShiftState(event);
        break;
      case "CapsLock":
        Keyboard._toggleCapsState(event);
        break;
      case "AltLeft":
      case "AltRight":
        Keyboard._toggleAltState(event);
        Keyboard._toggleLangState();
        break;
      case "ControlLeft":
      case "ControlRight":
        Keyboard._toggleControlState(event);
        Keyboard._toggleLangState();
        break;
    }
  },

  _toggleCapsState(event) {
    if (event.type === 'keydown') {
      this.properties.capsState === true ? this.properties.capsState = false : this.properties.capsState = true;
    } else {return}
    Keyboard.refresh();
    console.log(this.properties.capsState, event.code);
  },

  _toggleShiftState(event) {
    if (event.type === 'keydown') {
      this.properties.shiftState === true ? this.properties.shiftState = false : this.properties.shiftState = true;
    } else if (event.type === 'keyup') {
      this.properties.shiftState === true ? this.properties.shiftState = false : this.properties.shiftState = true;
    }
    Keyboard.refresh();
    // console.log(this.properties.shiftState);
  },

  _toggleControlState(event) {
    // console.log("Ctrl Toggled!")
    if (event.type === 'keydown') {
      this.properties.ctrlState = true
    } else if (event.type === 'keyup') {
      this.properties.ctrlState = false;
    }
    // console.log(this.properties.ctrlState);
  },

  _toggleAltState(event) {
    // console.log("Alt Toggled!")
    if (event.type === 'keydown') {
      this.properties.altState = true
    } else if (event.type === 'keyup') {
      this.properties.altState = false;
    }
    // console.log(this.properties.altState);
  },

  _toggleLangState() {
    console.log(this.properties.altState, this.properties.ctrlState)
    if (this.properties.altState && this.properties.ctrlState) {
      this.properties.langState === 'Eng' ? this.properties.langState = 'Ru' : this.properties.langState = 'Eng';
      // console.log("Lang Toggled!");
      Keyboard.refresh();
    }
  },

  _makeButtonActive(event) {
    if (event.type === 'keydown') {
      Keyboard.elements.activeButtons.add(event.code);
      Keyboard.refresh();
      console.log(Keyboard.elements.activeButtons);
    } else if (event.type === 'keyup') {
      Keyboard.elements.activeButtons.delete(event.code);
      Keyboard.refresh();
      console.log(Keyboard.elements.activeButtons)
    }
  }
}

console.log('end')