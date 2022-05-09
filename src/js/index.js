console.log('start')

import '../scss/style.scss';
import { keysData } from './KeysData';
import { KeyButton } from './KeyButton';
import { CustomMouseEvent } from './CustomMouseEvent';

window.addEventListener("DOMContentLoaded", function() {
  Keyboard.init();
  Keyboard._getCurrentLang();
  Keyboard._listen();
})

const InputArea = {
  elements: {
    main: null,
    textArea: null 
  },

  init() {
    this.elements.main = document.createElement('div');
    this.elements.textArea = document.createElement('textarea');

    this.elements.main.classList.add('textarea');
    this.elements.textArea.setAttribute('name', 'aim-area');    
    this.elements.textArea.setAttribute('autofocus', '');

    this.elements.main.append(this.elements.textArea);
    document.body.prepend(this.elements.main);
  }
}

InputArea.init();

const Keyboard = {
  elements: {
    main: null,
    mainContainer: null,
    keysContainer: null,
    keys: new Set(),
    activeButtons: new Set(),
    inputArea: document.querySelector('textarea')
  },

  properties: {
    value: "",
    capsState: false,
    shiftState: false,
    ctrlState: false,
    altState: false,
    langState: 'Eng',
    cursorPosition: 0,
    arrowState: 'nav'
  },

  init() {
    // console.log('init')
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
    // console.log('referesh'
    this.elements.keysContainer = document.querySelector('.keyboard__keys');
    this.elements.keysContainer.innerHTML = '';
    this.elements.keysContainer.append(this._createKeys())
  },

  input(value) {
    this._getCursorPosition(value.length);
    this.elements.inputArea.value = (
      this.elements.inputArea.value.slice(0, Keyboard.properties.cursorPosition-1) +
      value + 
      this.elements.inputArea.value.slice(Keyboard.properties.cursorPosition-1)
      );
    this._setCursorPosition(0);  
  },

  _createKeys() {    
    const fragment = document.createDocumentFragment();

    keysData.forEach(elem => {
      const keyElement = new KeyButton(elem, this.properties);
      const keyElementHTML = keyElement.createButton();
      setKeyClasses(keyElement.code, keyElementHTML);
      Keyboard.elements.keys.add(keyElement.code);
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
    this.elements.inputArea.addEventListener("focusout", () => this._focusBack());
    this.elements.keysContainer.addEventListener('mousedown', this._trigerMouseEvent);
    document.addEventListener("visibilitychange", () => this._windowFocusoutAction())
  },
  
  _focusBack() {
    console.log('Focus Back')
    Keyboard.elements.inputArea.focus()
    this._setCursorPosition(0);
  },

  _windowFocusoutAction() {
    this.elements.activeButtons.clear();
    this.refresh();
  },

  _trigerMouseEvent(event){
    let newMouseEvent = new CustomMouseEvent(event);

    if (newMouseEvent.isTargetButton()) {
      newMouseEvent.getInnerType(keysData);
      newMouseEvent.getNewEventType();

      if (event.type === 'mousedown') {
        Keyboard.elements.keysContainer.addEventListener('mouseout', Keyboard._trigerMouseEvent);
        Keyboard.elements.keysContainer.addEventListener('mouseup', Keyboard._trigerMouseEvent);
      } else if (event.type === 'mouseup' || event.type === 'mouseout') {
        Keyboard.elements.keysContainer.removeEventListener('mouseup', Keyboard._trigerMouseEvent);
        Keyboard.elements.keysContainer.removeEventListener('mouseout', Keyboard._trigerMouseEvent);
      }
      // console.log(newMouseEvent)
      let newButtonEvent = new KeyboardEvent(newMouseEvent.type, {code: newMouseEvent.newEventCode})
      document.body.dispatchEvent(newButtonEvent)
    }
  },

  _trigerKeyboardEvent(event) {
    // console.log("Event Triggered! Name:", event)
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
        event.preventDefault();
        Keyboard._toggleAltState(event);
        Keyboard._toggleLangState();
        break;
      case "ControlLeft":
      case "ControlRight":
        Keyboard._toggleControlState(event);
        Keyboard._toggleLangState();
        break;
      case "Backspace":
        event.preventDefault();
        Keyboard._backspaceAction(event);
        break;
      case "Delete":
        event.preventDefault();
        Keyboard._deleteAction(event);
        break;
      case "Enter":
      case "Fn":
      case "Tab":
        event.preventDefault();
        Keyboard._newKeyboardEvent(event);
        break;
      case "ArrowUp":
        event.preventDefault();
        (Keyboard.properties.arrowState === 'nav') ?
        Keyboard._moveCursorUp(event) :
        Keyboard._newKeyboardEvent(event);
        break;
      case "ArrowRight":
        event.preventDefault();
        (Keyboard.properties.arrowState === 'nav') ?
        Keyboard._moveCursorRight(event) :
        Keyboard._newKeyboardEvent(event);
        break;
      case "ArrowLeft":
        event.preventDefault();
        (Keyboard.properties.arrowState === 'nav') ?
        Keyboard._moveCursorLeft(event) :
        Keyboard._newKeyboardEvent(event);
        break;
      case "ArrowDown":
        event.preventDefault();
        (Keyboard.properties.arrowState === 'nav') ?
        Keyboard._moveCursorDown(event) :
        Keyboard._newKeyboardEvent(event);
        break;
      default:
        if (!Keyboard.properties.ctrlState && Keyboard.elements.keys.has(event.code)) {
          event.preventDefault();
          Keyboard._newKeyboardEvent(event);
        }
        break;
    }
  },

  _deleteAction(event) {
    if (event.type === 'keydown') {
      this._getCursorPosition(0);
      Keyboard.elements.inputArea.value = 
      Keyboard.elements.inputArea.value.slice(0, Keyboard.properties.cursorPosition) +
      Keyboard.elements.inputArea.value.slice(Keyboard.properties.cursorPosition + 1);
      this._setCursorPosition(0);
    }
  },

  _moveCursorLeft(event) {
    if (event.type === 'keydown') {
      Keyboard._getCursorPosition(-1);
      Keyboard._setCursorPosition(0);
      // console.log('cursorleft', event)
    }
  },  

  _moveCursorUp(event) {
    if (event.type === 'keydown') {
      Keyboard._getCursorPosition(0);
      let indexToMove = Keyboard.elements.inputArea.value.lastIndexOf('\n', Keyboard.properties.cursorPosition-1);
      console.log(indexToMove)
      Keyboard.properties.cursorPosition = indexToMove;
      Keyboard._setCursorPosition(0);
      // console.log('cursorleft', event)
    }
  },

  _moveCursorDown(event) {
    if (event.type === 'keydown') {
      Keyboard._getCursorPosition(0);
      let indexToMove = Keyboard.elements.inputArea.value.indexOf('\n', Keyboard.properties.cursorPosition+1);
      console.log(indexToMove)
      Keyboard.properties.cursorPosition = indexToMove;
      Keyboard._setCursorPosition(0);
      // console.log('cursorleft', event)
    }
  },

  _moveCursorRight(event) {
    if (event.type === 'keydown') {
      Keyboard._getCursorPosition(+1);
      Keyboard._setCursorPosition(0);
    }
  },

  _setCursorPosition(step) {
    Keyboard.elements.inputArea.selectionStart = Keyboard.elements.inputArea.selectionEnd = Keyboard.properties.cursorPosition + step;
    console.log('set CP', Keyboard.properties.cursorPosition)
  },

  _getCursorPosition(step) {
    Keyboard.properties.cursorPosition = Keyboard.elements.inputArea.selectionStart + step;
    console.log('get CP', Keyboard.properties.cursorPosition)
  },

  _backspaceAction(event) {
    if (event.type === 'keydown') {
      this._getCursorPosition(-1);
      Keyboard.elements.inputArea.value = 
      Keyboard.elements.inputArea.value.slice(0, Keyboard.properties.cursorPosition) +
      Keyboard.elements.inputArea.value.slice(Keyboard.properties.cursorPosition + 1);
      this._setCursorPosition(0);
    }
  },

  _newKeyboardEvent(event){
    if (event.type === 'keydown') {
      let newValue = '';
      if (event.code === 'Tab') {
        newValue = '    ';
      } else if (event.code === 'Enter') {
        newValue = '\n';
      } else if (event.code === 'Fn') {
        (Keyboard.properties.arrowState === 'nav') ? (Keyboard.properties.arrowState = 'text') : (Keyboard.properties.arrowState = 'nav');
      } else {
        newValue = document.querySelector(`button[data-code=${event.code}]`).innerHTML;
      }
      Keyboard.input(newValue)
    }
  },

  _toggleCapsState(event) {
    if (event.type === 'keydown') {
      this.properties.capsState === true ? this.properties.capsState = false : this.properties.capsState = true;
    } else {return}
    Keyboard.refresh();
    // console.log(this.properties.capsState, event.code);
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
    // console.log(this.properties.altState, this.properties.ctrlState)
    if (this.properties.altState && this.properties.ctrlState) {
      this.properties.langState === 'Eng' ? this.properties.langState = 'Ru' : this.properties.langState = 'Eng';
      // console.log("Lang Toggled!");
      Keyboard.refresh();
    }
    Keyboard._setCurrentLang();
  },

  _makeButtonActive(event) {
    if (event.type === 'keydown') {
      Keyboard.elements.activeButtons.add(event.code);
      Keyboard.refresh();
      // console.log(Keyboard.elements.activeButtons);
    } else if (event.type === 'keyup') {
      Keyboard.elements.activeButtons.delete(event.code);
      Keyboard.refresh();
      // console.log(Keyboard.elements.activeButtons)
    }
  },  

  _getCurrentLang() {
    if (!localStorage.RSS_KSH_lang) {
      localStorage.RSS_KSH_lang = 'Eng';
    }
    Keyboard.properties.langState = localStorage.RSS_KSH_lang;
    Keyboard.refresh()
  },

  _setCurrentLang() {
    localStorage.RSS_KSH_lang = this.properties.langState;
  }
}

console.log('end')