global.testData = {
    'boop': [
        'clap',
        'my',
        'flap',
    ],
    'clap': [
        'boop',
    ],
    'flap': [
        'clap',
    ],
};

require('assert').deepEqual(require('../src/analyze.js').sort(), [
    'boop',
    'clap',
    'flap',
].sort());
