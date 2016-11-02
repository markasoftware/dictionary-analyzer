global.testData = {
    'rely': [
        'boop',
        'yap',
        'me',
        'up',
    ],
    'boop': [
        'yap',
        'me',
    ],
    'yap': [
        'up',
    ],
    'up': [
        'boop',
    ],
    'existential': [
        'rely',
        'boop',
    ],
    'me': [
        'rely',
    ],
    'floop': [
        'existential',
        'me',
    ]
}

require('assert').deepEqual(require('../src/analyze.js').sort(), [
    'rely',
    'boop',
    'yap',
    'up',
    'me',
].sort());
