const keysData = [
// 1 row -----------------------------------------------------------------------
    {
        type: 'char',
        code: 'Backquote',
        key: {
            Eng: '`',
            Ru: 'Ё',
        },
        shift: {
            Eng: '~',
            Ru: null,
        },
    },
    {
        type: 'digit',
        code: 'Digit1',
        key: {
            Eng: '1',
            Ru: '1',
        },
        shift: {
            Eng: '!',
            Ru: '!',
        },
    },
    {
        type: 'digit',
        code: 'Digit2',
        key: {
            Eng: '2',
            Ru: '2',
        },
        shift: {
            Eng: '@',
            Ru: '"',
        },
    },
    {
        type: 'digit',
        code: 'Digit3',
        key: {
            Eng: '3',
            Ru: '3',
        },
        shift: {
            Eng: '#',
            Ru: '№',
        },
    },
    {
        type: 'digit',
        code: 'Digit4',
        key: {
            Eng: '4',
            Ru: '4',
        },
        shift: {
            Eng: '$',
            Ru: ';',
        },
    },
    {
        type: 'digit',
        code: 'Digit5',
        key: {
            Eng: '5',
            Ru: '5',
        },
        shift: {
            Eng: '%',
            Ru: '%',
        },
    },
    {
        type: 'digit',
        code: 'Digit6',
        key: {
            Eng: '6',
            Ru: '6',
        },
        shift: {
            Eng: '^',
            Ru: ':',
        },
    },
    {
        type: 'digit',
        code: 'Digit7',
        key: {
            Eng: '7',
            Ru: '7',
        },
        shift: {
            Eng: '&',
            Ru: '?',
        },
    },
    {
        type: 'digit',
        code: 'Digit8',
        key: {
            Eng: '8',
            Ru: '8',
        },
        shift: {
            Eng: '*',
            Ru: '*',
        },
    },
    {
        type: 'digit',
        code: 'Digit9',
        key: {
            Eng: '9',
            Ru: '9',
        },
        shift: {
            Eng: '(',
            Ru: '(',
        },
    },
    {
        type: 'digit',
        code: 'Digit0',
        key: {
            Eng: '0',
            Ru: '0',
        },
        shift: {
            Eng: ')',
            Ru: ')',
        },
    },
    {
        type: 'char',
        code: 'Minus',
        key: {
            Eng: '-',
            Ru: '-',
        },
        shift: {
            Eng: '_',
            Ru: '_',
        },
    },
    {
        type: 'char',
        code: 'Equal',
        key: {
            Eng: '=',
            Ru: '=',
        },
        shift: {
            Eng: '+',
            Ru: '+',
        },
    },
    {
        type: 'modifier',
        code: 'Backspace',
        key: {
            Eng: 'BACKSPACE',
            Ru: 'BACKSPACE',
        },
        shift: {
            Eng: null,
            Ru: null,
        },
    },
    // 2 row -----------------------------------------------------------------------
    {
        type: 'modifier',
        code: 'Tab',
        key: {
            Eng: 'TAB',
            Ru: 'TAB',
        },
        shift: {
            Eng: null,
            Ru: null,
        },
    },
    {
        type: 'char',
        code: 'KeyQ',
        key: {
            Eng: 'Q',
            Ru: 'Й',
        },
        shift: {
            Eng: null,
            Ru: null,
        },
    },
    {
        type: 'char',
        code: 'KeyW',
        key: {
            Eng: 'W',
            Ru: 'Ц',
        },
        shift: {
            Eng: null,
            Ru: null,
        },
    },
    {
        type: 'char',
        code: 'KeyE',
        key: {
            Eng: 'E',
            Ru: 'У',
        },
        shift: {
            Eng: null,
            Ru: null,
        },
    },
    {
        type: 'char',
        code: 'KeyR',
        key: {
            Eng: 'R',
            Ru: 'К',
        },
        shift: {
            Eng: null,
            Ru: null,
        },
    },
    {
        type: 'char',
        code: 'KeyT',
        key: {
            Eng: 'T',
            Ru: 'Е',
        },
        shift: {
            Eng: null,
            Ru: null,
        },
    },
    {
        type: 'char',
        code: 'KeyY',
        key: {
            Eng: 'Y',
            Ru: 'Н',
        },
        shift: {
            Eng: null,
            Ru: null,
        },
    },
    {
        type: 'char',
        code: 'KeyU',
        key: {
            Eng: 'U',
            Ru: 'Г',
        },
        shift: {
            Eng: null,
            Ru: null,
        },
    },
    {
        type: 'char',
        code: 'KeyI',
        key: {
            Eng: 'I',
            Ru: 'Ш',
        },
        shift: {
            Eng: null,
            Ru: null,
        },
    },
    {
        type: 'char',
        code: 'KeyO',
        key: {
            Eng: 'O',
            Ru: 'Щ',
        },
        shift: {
            Eng: null,
            Ru: null,
        },
    },
    {
        type: 'char',
        code: 'KeyP',
        key: {
            Eng: 'P',
            Ru: 'З',
        },
        shift: {
            Eng: null,
            Ru: null,
        },
    },
    {
        type: 'char',
        code: 'BracketLeft',
        key: {
            Eng: '[',
            Ru: 'Х',
        },
        shift: {
            Eng: '{',
            Ru: null,
        },
    },
    {
        type: 'char',
        code: 'BracketRight',
        key: {
            Eng: ']',
            Ru: 'Ъ',
        },
        shift: {
            Eng: '}',
            Ru: null,
        },
    },
    {
        type: 'char',
        code: 'Backslash',
        key: {
            Eng: '\\',
            Ru: '\\',
        },
        shift: {
            Eng: '|',
            Ru: '/',
        },
    },
    {
        type: 'modifier',
        code: 'Delete',
        key: {
            Eng: 'DEL',
            Ru: 'DEL',
        },
        shift: {
            Eng: null,
            Ru: null,
        },
    },
    // 3 row -----------------------------------------------------------------------
    {
        type: 'modifier',
        code: 'CapsLock',
        key: {
            Eng: 'CAPS LOCK',
            Ru: 'CAPS LOCK',
        },
        shift: {
            Eng: null,
            Ru: null,
        },
    },
    {
        type: 'char',
        code: 'KeyA',
        key: {
            Eng: 'A',
            Ru: 'Ф',
        },
        shift: {
            Eng: null,
            Ru: null,
        },
    },
    {
        type: 'char',
        code: 'KeyS',
        key: {
            Eng: 'S',
            Ru: 'Ы',
        },
        shift: {
            Eng: null,
            Ru: null,
        },
    },
    {
        type: 'char',
        code: 'KeyD',
        key: {
            Eng: 'D',
            Ru: 'В',
        },
        shift: {
            Eng: null,
            Ru: null,
        },
    },
    {
        type: 'char',
        code: 'KeyF',
        key: {
            Eng: 'F',
            Ru: 'А',
        },
        shift: {
            Eng: null,
            Ru: null,
        },
    },
    {
        type: 'char',
        code: 'KeyG',
        key: {
            Eng: 'G',
            Ru: 'П',
        },
        shift: {
            Eng: null,
            Ru: null,
        },
    },
    {
        type: 'char',
        code: 'KeyH',
        key: {
            Eng: 'H',
            Ru: 'Р',
        },
        shift: {
            Eng: null,
            Ru: null,
        },
    },
    {
        type: 'char',
        code: 'KeyJ',
        key: {
            Eng: 'J',
            Ru: 'О',
        },
        shift: {
            Eng: null,
            Ru: null,
        },
    },
    {
        type: 'char',
        code: 'KeyK',
        key: {
            Eng: 'K',
            Ru: 'Л',
        },
        shift: {
            Eng: null,
            Ru: null,
        },
    },
    {
        type: 'char',
        code: 'KeyL',
        key: {
            Eng: 'L',
            Ru: 'Д',
        },
        shift: {
            Eng: null,
            Ru: null,
        },
    },
    {
        type: 'char',
        code: 'Semicolon',
        key: {
            Eng: ';',
            Ru: 'Ж',
        },
        shift: {
            Eng: ':',
            Ru: null,
        },
    },
    {
        type: 'char',
        code: 'Quote',
        key: {
            Eng: '\'',
            Ru: 'Э',
        },
        shift: {
            Eng: '"',
            Ru: null,
        },
    },
    {
        type: 'modifier',
        code: 'Enter',
        key: {
            Eng: 'ENTER',
            Ru: 'ENTER',
        },
        shift: {
            Eng: null,
            Ru: null,
        },
    },
    // 4 row -----------------------------------------------------------------------
    {
        type: 'modifier',
        code: 'ShiftLeft',
        key: {
            Eng: 'SHIFT',
            Ru: 'SHIFT',
        },
        shift: {
            Eng: null,
            Ru: null,
        },
    },
    {
        type: 'char',
        code: 'KeyZ',
        key: {
            Eng: 'Z',
            Ru: 'Я',
        },
        shift: {
            Eng: null,
            Ru: null,
        },
    },
    {
        type: 'char',
        code: 'KeyX',
        key: {
            Eng: 'X',
            Ru: 'Ч',
        },
        shift: {
            Eng: null,
            Ru: null,
        },
    },
    {
        type: 'char',
        code: 'KeyC',
        key: {
            Eng: 'C',
            Ru: 'С',
        },
        shift: {
            Eng: null,
            Ru: null,
        },
    },
    {
        type: 'char',
        code: 'KeyV',
        key: {
            Eng: 'V',
            Ru: 'М',
        },
        shift: {
            Eng: null,
            Ru: null,
        },
    },
    {
        type: 'char',
        code: 'KeyB',
        key: {
            Eng: 'B',
            Ru: 'И',
        },
        shift: {
            Eng: null,
            Ru: null,
        },
    },
    {
        type: 'char',
        code: 'KeyN',
        key: {
            Eng: 'N',
            Ru: 'Т',
        },
        shift: {
            Eng: null,
            Ru: null,
        },
    },
    {
        type: 'char',
        code: 'KeyM',
        key: {
            Eng: 'M',
            Ru: 'Ь',
        },
        shift: {
            Eng: null,
            Ru: null,
        },
    },
    {
        type: 'char',
        code: 'Comma',
        key: {
            Eng: ',',
            Ru: 'Б',
        },
        shift: {
            Eng: '<',
            Ru: null,
        },
    },
    {
        type: 'char',
        code: 'Period',
        key: {
            Eng: '.',
            Ru: 'Ю',
        },
        shift: {
            Eng: '>',
            Ru: null,
        },
    },
    {
        type: 'char',
        code: 'Slash',
        key: {
            Eng: '/',
            Ru: '.',
        },
        shift: {
            Eng: '?',
            Ru: ',',
        },
    },
    {
        type: 'char',
        code: 'ArrowUp',
        key: {
            Eng: '&#9650',
            Ru: '&#9650',
        },
        shift: {
            Eng: null,
            Ru: null,
        },
    },
    {
        type: 'modifier',
        code: 'ShiftRight',
        key: {
            Eng: 'SHIFT',
            Ru: 'SHIFT',
        },
        shift: {
            Eng: null,
            Ru: null,
        },
    },
    // 5 row -----------------------------------------------------------------------
    {
        type: 'modifier',
        code: 'ControlLeft',
        key: {
            Eng: 'CTRL',
            Ru: 'CTRL',
        },
        shift: {
            Eng: null,
            Ru: null,
        },
    },
    {
        type: 'modifier',
        code: 'AltLeft',
        key: {
            Eng: 'ALT',
            Ru: 'ALT',
        },
        shift: {
            Eng: null,
            Ru: null,
        },
    },
    {
        type: 'modifier',
        code: 'Space',
        key: {
            Eng: ' ',
            Ru: ' ',
        },
        shift: {
            Eng: null,
            Ru: null,
        },
    },
    {
        type: 'modifier',
        code: 'AltRight',
        key: {
            Eng: 'ALT',
            Ru: 'ALT',
        },
        shift: {
            Eng: null,
            Ru: null,
        },
    },
    {
        type: 'modifier',
        code: 'ControlRight',
        key: {
            Eng: 'CTRL',
            Ru: 'CTRL',
        },
        shift: {
            Eng: null,
            Ru: null,
        },
    },
    {
        type: 'char',
        code: 'ArrowLeft',
        key: {
            Eng: '&#9668',
            Ru: '&#9668',
        },
        shift: {
            Eng: null,
            Ru: null,
        },
    },
    {
        type: 'char',
        code: 'ArrowDown',
        key: {
            Eng: '&#9660',
            Ru: '&#9660',
        },
        shift: {
            Eng: null,
            Ru: null,
        },
    },
    {
        type: 'char',
        code: 'ArrowRight',
        key: {
            Eng: '&#9658',
            Ru: '&#9658',
        },
        shift: {
            Eng: null,
            Ru: null,
        },
    },
    {
        type: 'meta',
        code: 'Fn',
        key: {
            Eng: 'FN',
            Ru: 'FN',
        },
        shift: {
            Eng: null,
            Ru: null,
        },
    },
];

export default keysData;
