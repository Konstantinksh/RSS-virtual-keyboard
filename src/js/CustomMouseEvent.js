export class CustomMouseEvent {  
  constructor (event) {
  this.nodeName = event.target.nodeName;
  this.newEventCode = event.target.dataset.code;
  this.type = '';
  this.newEventValue = '';
  this.eventInner = event.target.innerHTML
  this.eventInnerType = '';
  this.eventType = event.type
  }

  isTargetButton() {
    return (this.nodeName === 'BUTTON')
  }

  getInnerType(arr) {
    arr.forEach((element) => {
      if (element.code === this.newEventCode) {
        this.eventInnerType = element.type;
      }
    })
  }

  getNewEventValue() {
    if (this.eventInnerType === 'char' || this.eventInnerType === 'digit') {
      this.newEventValue = this.eventInner;
    } else if (this.eventInner === 'ENTER') {
      this.newEventValue = '\n';
    } else if (this.eventInner === 'TAB') {
      this.newEventValue = '  ';
    }
  }

  getNewEventType() {
    if (this.eventType === 'mousedown') {
      this.type = 'keydown';
    } else if (this.eventType === 'mouseup' || this.eventType === 'mouseout') {
      this.type = 'keyup';
    }
  }
}