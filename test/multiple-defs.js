global.testData = {
    'boop': [
        'noop',
    ],
    '1boop': [
        'bap',
        'yap',
    ],
    '2boop': [
        'schloop',
    ],
    'yap': [
        'schloop',
    ],
    '1yap': [
        'boop',
    ],
    'schloop': [
        'existential',
    ],
}

require('assert').deepEqual(require('../src/analyze.js').sort(), [
    'boop',
    'yap',
].sort());
