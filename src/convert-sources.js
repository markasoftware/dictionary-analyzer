const fs = require('fs');

// wordnet dictionary

const dict = fs.readFileSync(__dirname + '/../source-data/wordnet-dictionary.sql', 'utf8').split('\n');
const words = new Map();
const toJson = {};
dict.filter(c => c.indexOf('wn_synset') !== -1).forEach(c => {
    const curID = parseInt(c.substr(32, 9));
    if(!isNaN(curID)) {
        words.set(curID, (c.substr(45, c.substring(45).indexOf('\''))).toLowerCase() );
    }
});
dict.filter(c => c.indexOf('wn_gloss') !== -1).forEach(c => {
    const curID = parseInt(c.substr(31, 9));
    if(!isNaN(curID)) {
        // fuck we have to do the splitting stuff now
        let def = c.substring(42, c.indexOf('\');')).toLowerCase();
        // cut out example sentences, if any
        const exInd = def.indexOf('; \\"');
        if(exInd !== -1) {
            def = def.substring(0, exInd);
        }
        def = def.replace(/[^a-z]/g, ' ').split(' ').filter(c => c.length > 0);
        toJson[words.get(curID)] = def;
    }
});
fs.writeFileSync(__dirname + '/../source-data/wordnet-dictionary-processed.json', JSON.stringify(toJson));
