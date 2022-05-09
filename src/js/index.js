import '../scss/style.scss';
import keysData from './KeysData';
import KeyButton from './KeyButton';
import CustomMouseEvent from './CustomMouseEvent';

const InputArea = {
    elements: {
        main: null,
        textArea: null,
        title: null,
        description: null,
    },

    init() {
        this.elements.main = document.createElement('div');
        this.elements.textArea = document.createElement('textarea');
        this.elements.title = document.createElement('div');
        this.elements.description = document.createElement('p');

        this.elements.description.classList.add('description');
        this.elements.title.classList.add('title');
        this.elements.main.classList.add('textarea');
        this.elements.textArea.setAttribute('name', 'aim-area');
        this.elements.textArea.setAttribute('autofocus', '');

        this.elements.title.innerHTML = 'RSS Virtual Keyboard';
        this.elements.description.innerHTML = 'Keyboard was made with OS Windows. Shortcut for change language: Ctrl+Alt. <br> Press "Fn" at virtual-keyboard to choose action for arrows (navigation of input symbols)';

        this.elements.main.append(this.elements.textArea);
        document.body.prepend(this.elements.main);
        document.body.prepend(this.elements.title);
        document.body.append(this.elements.description);
    },
};

InputArea.init();

const Keyboard = {
    elements: {
        main: null,
        mainContainer: null,
        keysContainer: null,
        keys: new Set(),
        activeButtons: new Set(),
        inputArea: document.querySelector('textarea'),
    },

    properties: {
        value: '',
        capsState: false,
        shiftState: false,
        ctrlState: false,
        altState: false,
        langState: 'Eng',
        cursorPosition: 0,
        arrowState: 'nav',
    },

    init() {
        this.elements.main = document.createElement('div');
        this.elements.mainContainer = document.createElement('div');
        this.elements.keysContainer = document.createElement('div');

        this.elements.main.classList.add('keyboard');
        this.elements.mainContainer.classList.add('keyboard__conteiner');
        this.elements.keysContainer.classList.add('keyboard__keys', 'key', '_wrapper');

        this.elements.keysContainer.append(this.createKeys());
        this.elements.mainContainer.append(this.elements.keysContainer);
        this.elements.main.append(this.elements.mainContainer);
        document.body.append(this.elements.main);
    },

    refresh() {
        this.elements.keysContainer = document.querySelector('.keyboard__keys');
        this.elements.keysContainer.innerHTML = '';
        this.elements.keysContainer.append(this.createKeys());
    },

    input(value) {
        this.getCursorPosition(value.length);
        this.elements.inputArea.value = (
            this.elements.inputArea.value.slice(0, Keyboard.properties.cursorPosition - 1)
      + value
      + this.elements.inputArea.value.slice(Keyboard.properties.cursorPosition - 1)
        );
        this.setCursorPosition(0);
    },

    createKeys() {
        const fragment = document.createDocumentFragment();

        function setKeyClasses(key, keyElement) {
            if (Keyboard.elements.activeButtons.has(key)) {
                keyElement.classList.add('key_active');
            }
            switch (key) {
            case 'Backspace':
            case 'Enter':
                keyElement.classList.add('key_blacked', 'key_size-l');
                break;
            case 'ShiftLeft':
            case 'ShiftRight':
                keyElement.classList.add('key_blacked', 'key_size-xl');
                break;
            case 'CapsLock':
                keyElement.classList.add('key_blacked', 'key_size-xxm');
                break;
            case 'Tab':
            case 'Delete':
            case 'Fn':
                keyElement.classList.add('key_blacked', 'key_size-m');
                break;
            case 'ControlLeft':
            case 'ControlRight':
                keyElement.classList.add('key_blacked', 'key_size-xm');
                break;
            case 'ArrowUp':
            case 'ArrowRight':
            case 'ArrowLeft':
            case 'ArrowDown':
            case 'AltLeft':
            case 'AltRight':
            case 'Backquote':
                keyElement.classList.add('key_blacked');
                break;
            case 'Space':
                keyElement.classList.add('key_size-xxl');
                break;
            default:
                break;
            }
        }

        keysData.forEach((elem) => {
            const keyElement = new KeyButton(elem, this.properties);
            const keyElementHTML = keyElement.createButton();
            setKeyClasses(keyElement.code, keyElementHTML);
            Keyboard.elements.keys.add(keyElement.code);
            fragment.append(keyElementHTML);
        });
        return fragment;
    },

    listen() {
        document.body.addEventListener('keydown', this.trigerKeyboardEvent);
        document.body.addEventListener('keyup', this.trigerKeyboardEvent);
        this.elements.inputArea.addEventListener('focusout', () => this.focusBack());
        this.elements.keysContainer.addEventListener('mousedown', this.trigerMouseEvent);
        document.addEventListener('visibilitychange', () => this.windowFocusoutAction());
    },

    focusBack() {
        Keyboard.elements.inputArea.focus();
        this.setCursorPosition(0);
    },

    windowFocusoutAction() {
        this.elements.activeButtons.clear();
        this.refresh();
    },

    trigerMouseEvent(event) {
        const newEvent = new CustomMouseEvent(event);

        if (newEvent.isTargetButton()) {
            newEvent.getInnerType(keysData);
            newEvent.getNewEventType();

            if (event.type === 'mousedown') {
                Keyboard.elements.keysContainer.addEventListener('mouseout', Keyboard.trigerMouseEvent);
                Keyboard.elements.keysContainer.addEventListener('mouseup', Keyboard.trigerMouseEvent);
            } else if (event.type === 'mouseup' || event.type === 'mouseout') {
                Keyboard.elements.keysContainer.removeEventListener('mouseup', Keyboard.trigerMouseEvent);
                Keyboard.elements.keysContainer.removeEventListener('mouseout', Keyboard.trigerMouseEvent);
            }
            const newBtnEvent = new KeyboardEvent(newEvent.type, { code: newEvent.newEventCode });
            document.body.dispatchEvent(newBtnEvent);
        }
    },

    trigerKeyboardEvent(event) {
        Keyboard.makeButtonActive(event);
        switch (event.code) {
        case 'ShiftLeft':
        case 'ShiftRight':
            Keyboard.toggleShiftState(event);
            break;
        case 'CapsLock':
            Keyboard.toggleCapsState(event);
            break;
        case 'AltLeft':
        case 'AltRight':
            event.preventDefault();
            Keyboard.toggleAltState(event);
            Keyboard.toggleLangState();
            break;
        case 'ControlLeft':
        case 'ControlRight':
            Keyboard.toggleControlState(event);
            Keyboard.toggleLangState();
            break;
        case 'Backspace':
            event.preventDefault();
            Keyboard.backspaceAction(event);
            break;
        case 'Delete':
            event.preventDefault();
            Keyboard.deleteAction(event);
            break;
        case 'Enter':
        case 'Fn':
        case 'Tab':
            event.preventDefault();
            Keyboard.newKeyboardEvent(event);
            break;
        case 'ArrowUp':
            event.preventDefault();
            if (Keyboard.properties.arrowState === 'nav') {
                Keyboard.moveCursorUp(event);
            } else { Keyboard.newKeyboardEvent(event); }
            break;
        case 'ArrowRight':
            event.preventDefault();
            if (Keyboard.properties.arrowState === 'nav') {
                Keyboard.moveCursorRight(event);
            } else { Keyboard.newKeyboardEvent(event); }
            break;
        case 'ArrowLeft':
            event.preventDefault();
            if (Keyboard.properties.arrowState === 'nav') {
                Keyboard.moveCursorLeft(event);
            } else { Keyboard.newKeyboardEvent(event); }
            break;
        case 'ArrowDown':
            event.preventDefault();
            if (Keyboard.properties.arrowState === 'nav') {
                Keyboard.moveCursorDown(event);
            } else { Keyboard.newKeyboardEvent(event); }
            break;
        default:
            if (!Keyboard.properties.ctrlState && Keyboard.elements.keys.has(event.code)) {
                event.preventDefault();
                Keyboard.newKeyboardEvent(event);
            }
            break;
        }
    },

    deleteAction(event) {
        if (event.type === 'keydown') {
            this.getCursorPosition(0);
            let indexOfRemove = 0;
            const indexStart = Keyboard.elements.inputArea.selectionStart;
            const indexEnd = Keyboard.elements.inputArea.selectionEnd;
            const { inputArea } = Keyboard.elements;
            if (indexStart === indexEnd) {
                indexOfRemove = indexEnd + 1;
            } else { indexOfRemove = indexEnd; }

            inputArea.value = inputArea.value.slice(0, indexStart)
            + inputArea.value.slice(indexOfRemove);
            this.setCursorPosition(0);
        }
    },

    backspaceAction(event) {
        if (event.type === 'keydown') {
            this.getCursorPosition(-1);
            let indexOfRemove = 0;
            const indexStart = Keyboard.elements.inputArea.selectionStart;
            const indexEnd = Keyboard.elements.inputArea.selectionEnd;
            const { inputArea } = Keyboard.elements;
            if (indexStart === indexEnd) {
                indexOfRemove = indexStart - 1;
            } else { indexOfRemove = indexStart; }

            inputArea.value = inputArea.value.slice(0, indexOfRemove)
            + inputArea.value.slice(indexEnd);
            this.setCursorPosition(0);
        }
    },

    moveCursorLeft(event) {
        if (event.type === 'keydown') {
            Keyboard.getCursorPosition(-1);
            Keyboard.setCursorPosition(0);
        }
    },

    moveCursorUp(event) {
        if (event.type === 'keydown') {
            Keyboard.getCursorPosition(0);
            const indexToMove = Keyboard.elements.inputArea.value.lastIndexOf('\n', Keyboard.properties.cursorPosition - 1);
            Keyboard.properties.cursorPosition = indexToMove;
            Keyboard.setCursorPosition(0);
        }
    },

    moveCursorDown(event) {
        if (event.type === 'keydown') {
            Keyboard.getCursorPosition(0);
            const indexToMove = Keyboard.elements.inputArea.value.indexOf('\n', Keyboard.properties.cursorPosition + 1);
            Keyboard.properties.cursorPosition = indexToMove;
            Keyboard.setCursorPosition(0);
        }
    },

    moveCursorRight(event) {
        if (event.type === 'keydown') {
            Keyboard.getCursorPosition(+1);
            Keyboard.setCursorPosition(0);
        }
    },

    setCursorPosition(step) {
        Keyboard.elements.inputArea.selectionStart = Keyboard.properties.cursorPosition + step;
        Keyboard.elements.inputArea.selectionEnd = Keyboard.properties.cursorPosition + step;
    },

    getCursorPosition(step) {
        Keyboard.properties.cursorPosition = Keyboard.elements.inputArea.selectionStart + step;
    },

    newKeyboardEvent(event) {
        if (event.type === 'keydown') {
            let newValue = '';
            if (event.code === 'Tab') {
                newValue = '    ';
            } else if (event.code === 'Enter') {
                newValue = '\n';
            } else if (event.code === 'Fn') {
                Keyboard.properties.arrowState = (Keyboard.properties.arrowState === 'nav') ? 'text' : 'nav';
            } else {
                newValue = document.querySelector(`button[data-code=${event.code}]`).innerHTML;
            }
            Keyboard.input(newValue);
        }
    },

    toggleCapsState(event) {
        if (event.type === 'keydown') {
            if (this.properties.capsState === true) {
                this.properties.capsState = false;
            } else {
                this.properties.capsState = true;
            }
        } else { return; }
        Keyboard.refresh();
    },

    toggleShiftState(event) {
        if (event.type === 'keydown') {
            if (this.properties.shiftState === true) {
                this.properties.shiftState = false;
            } else {
                this.properties.shiftState = true;
            }
        } else if (event.type === 'keyup') {
            if (this.properties.shiftState === true) {
                this.properties.shiftState = false;
            } else {
                this.properties.shiftState = true;
            }
        }
        Keyboard.refresh();
    },

    toggleControlState(event) {
        if (event.type === 'keydown') {
            this.properties.ctrlState = true;
        } else if (event.type === 'keyup') {
            this.properties.ctrlState = false;
        }
    },

    toggleAltState(event) {
        if (event.type === 'keydown') {
            this.properties.altState = true;
        } else if (event.type === 'keyup') {
            this.properties.altState = false;
        }
    },

    toggleLangState() {
        if (this.properties.altState && this.properties.ctrlState) {
            this.properties.langState = this.properties.langState === 'Eng' ? 'Ru' : 'Eng';
            Keyboard.refresh();
        }
        Keyboard.setCurrentLang();
    },

    makeButtonActive(event) {
        if (event.type === 'keydown') {
            Keyboard.elements.activeButtons.add(event.code);
            Keyboard.refresh();
        } else if (event.type === 'keyup') {
            Keyboard.elements.activeButtons.delete(event.code);
            Keyboard.refresh();
        }
    },

    getCurrentLang() {
        if (!localStorage.RSS_KSH_lang) {
            localStorage.RSS_KSH_lang = 'Eng';
        }
        Keyboard.properties.langState = localStorage.RSS_KSH_lang;
        Keyboard.refresh();
    },

    setCurrentLang() {
        localStorage.RSS_KSH_lang = this.properties.langState;
    },
};

window.addEventListener('DOMContentLoaded', () => {
    Keyboard.init();
    Keyboard.getCurrentLang();
    Keyboard.listen();
});
