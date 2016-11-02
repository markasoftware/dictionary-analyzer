global.testData = {
    'rely': ['boop'],
    'boop': ['rely'],
    'floop': ['boop', 'rely'],
}

require('assert').deepEqual(require('../src/analyze.js').sort(), [
    'rely',
    'boop',
].sort());
