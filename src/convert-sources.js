const fs = require('fs');

// word list from aspell

const rawWordList = fs.readFileSync(__dirname + '/../source-data/2of12inf.txt', 'utf8');
const wordList = rawWordList.split('%').join('').split('\r\n');

// wordnet dictionary

const dict = fs.readFileSync(__dirname + '/../source-data/wordnet-dictionary.sql', 'utf8').split('\n');
const words = new Map();
const toJson = {};
dict.filter(c => c.indexOf('wn_synset') !== -1).forEach((c, ind) => {
    console.log(Math.floor(ind/203150*100) + '%');
    const curID = parseInt(c.substr(32, 9));
    if(!isNaN(curID)) {
        const parsedWord = c.substr(c.indexOf('\'') + 1, c.substring(c.indexOf('\'') + 1).indexOf('\'')).toLowerCase();
        if(wordList.indexOf(parsedWord) === -1) {
            return;
        }
        const alreadyExisting = words.get(curID);
        if(alreadyExisting) {
            alreadyExisting.push(parsedWord);
            words.set(curID, alreadyExisting);
        } else {
            words.set(curID, [ parsedWord ]);
        }
    }
});
dict.filter(c => c.indexOf('wn_gloss') !== -1).forEach(c => {
    const curID = parseInt(c.substr(31, 9));
    if(!isNaN(curID) && words.get(curID)) {
        // fuck we have to do the splitting stuff now
        let def = c.substring(c.indexOf('\'') + 1, c.indexOf('\');')).toLowerCase();
        // cut out example sentences, if any
        const exInd = def.indexOf('; \\"');
        if(exInd !== -1) {
            def = def.substring(0, exInd);
        }
        def = def.replace(/[^a-z'\-]/g, ' ').split(' ').filter(c => c.length > 0);
        let theseWords = words.get(curID);
        theseWords.forEach(thisWord => {
            if(wordList.indexOf(thisWord) === -1) {
                
            }
            if(toJson[thisWord]) {
                lastThingy = 0;
                function recurse(thingy) {
                    if(toJson[thingy + thisWord]) {
                        recurse(thingy + 1);
                    } else {
                        thisWord = thingy + thisWord;
                    }
                }
                recurse(1);
            }
            toJson[thisWord] = def;
        });
    }
});
fs.writeFileSync(__dirname + '/../source-data/wordnet-dictionary-processed.json', JSON.stringify(toJson));
