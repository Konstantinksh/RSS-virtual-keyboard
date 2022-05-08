export class KeyButton {
  constructor (elem, properties) {
    this.type = elem.type;
    this.code = elem.code;
    this.key = elem.key;
    this.shift = elem.shift;
    this.capsState = properties.capsState;
    this.shiftState = properties.shiftState;
    this.ctrlState = properties.ctrlState;
    this.altState = properties.altState;
    this.langState = properties.langState;
   }
  
  createButton() {
    let keyButton = document.createElement('button');

    keyButton.setAttribute('type', 'button');
    keyButton.setAttribute('data-code', this.code);
    keyButton.classList.add('key__container');

    if (this.capsState && !this.shiftState) {
      keyButton.innerHTML = this.key[this.langState].toUpperCase();
    } else if (this.capsState && this.shiftState) {
      this.shift[this.langState] ? 
      keyButton.innerHTML = this.shift[this.langState] :
        (this.type === 'char' ?
        keyButton.innerHTML = this.key[this.langState].toLowerCase():
        keyButton.innerHTML = this.key[this.langState]);
    } else if (this.shiftState && !this.shift[this.langState]) {
      keyButton.innerHTML = this.key[this.langState].toUpperCase();
    } else if (this.shiftState && this.shift[this.langState]) {
      keyButton.innerHTML = this.shift[this.langState];
    } else if (!this.shiftState && this.type === 'char') {
      keyButton.innerHTML = this.key[this.langState].toLowerCase();
    } else {
      keyButton.innerHTML = this.key[this.langState];
    }
    return keyButton  
  }
}