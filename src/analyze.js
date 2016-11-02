const fs = require('fs');
const scc = require('strongly-connected-components');

const defsObj = typeof testData === 'object' ? testData : JSON.parse(fs.readFileSync(__dirname + '/../source-data/wordnet-dictionary-processed.json'));

const wordsToNums = new Map();

let curID = 0;
const allWords = Object.keys(defsObj);
allWords.forEach(curWord => {
    if(isNaN(+curWord[0])) {
        wordsToNums.set(curWord, curID++);
    }
});

const graphArr = [];
// a little bit redundant, but whatever
allWords.forEach(curWord => {
    if(!isNaN(+curWord[0])) {
        return;
    }
    const allDefWords = [];
    let preNum = '';
    while(true) {
        const thisDef = defsObj[preNum + curWord];
        if(typeof preNum !== 'number') {
            preNum = 1;
        } else {
            ++preNum;
        }
        if (!thisDef) {
            break;
        }
        // hehe
        allDefWords.push(...thisDef);
    }
    const baseWordID = wordsToNums.get(curWord);
    const allDefIDs = allDefWords.map(c => wordsToNums.get(c)).filter(c => typeof c !== 'undefined');
    allDefIDs.forEach(c => {
        graphArr.push([baseWordID, c]);
    });
});

console.log('initialization complete, starting scc');
console.log(graphArr);
const loops = scc(graphArr).components.filter(c => c.length > 1);
console.log(loops);
// let's reverse the map! yay!
const numsToWords = new Map();
allWords.forEach(c => {
    numsToWords.set(wordsToNums.get(c), c);
});
const loopedWords = [];
loops.forEach(innerLoops => {
    innerLoops.forEach(c => {
        const thisWord = numsToWords.get(c);
        console.log(c, thisWord);
        if(loopedWords.indexOf(thisWord) === -1) {
            loopedWords.push(thisWord);
        }
    });
});
console.log(loopedWords);
if(typeof testData !== 'undefined') {
    module.exports = loopedWords;
}

/*
// convert to map
const defs = new Map();
Object.keys(defsObj).forEach(c => {
    defs.set(c, defsObj[c]);
});
const defKeys = Array.from(defs.keys());

const baseWords = [];
const totalCheckedWords = [];
// there's probably a better way to do this
while(true) {
    const curStartWord = defKeys.find(c =>
        isNaN(+(c[0])) && totalCheckedWords.indexOf(c) === -1
    );
    if(!curStartWord) {
        break;
    }
    console.log('start word', curStartWord);
    const toCheck = [ curStartWord ];
    const breadcrumbs = [];
    const curChecked = [];
    while(toCheck.length > 0) {
        const curWord = toCheck.pop();‌
return 42; // Return statement not inside a function‌
‌
function f() {‌
  'use strict';‌
‌
  // No more octal‌
  var x = 042;‌
‌
  // Duplicate property‌
  var y = { x: 1, x: 2 };‌
‌
  // With statement can't be used‌
  with (z) {}‌
‌
}
        console.log('loop', curWord);
        if(curWord === '__break') {
            breadcrumbs.pop();
            continue;
        }
        if(curChecked.indexOf(curWord) !== -1 || totalCheckedWords.indexOf(curWord) !== -1) {
            continue;
        }
        if(breadcrumbs.indexOf(curWord) !== -1) {
            baseWords.push(curWord);
            curChecked.push(curWord);
            continue;
        }
        const allDefWords = [];
        let preNum = '';
        while(true) {
            thisDef = defs.get(preNum + curWord);
            if(typeof preNum !== 'number') {
                preNum = 1;
            } else {
                ++preNum;
            }
            if (!thisDef) {
                break;
            }
            // hehe
            allDefWords.push(...thisDef);
        }
        if(allDefWords.length === 0) {
            continue;
        }
        curChecked.push(curWord);
        breadcrumbs.push(curWord);
        toCheck.push('__break', ...allDefWords);
        console.log('breadcrumbs:', breadcrumbs);
        console.log('tocheck:', toCheck);
        console.log('basewords:', baseWords);
    }
    totalCheckedWords.push(...curChecked);
}

if(typeof testData === 'object') {
    module.exports = baseWords;
} else {
    baseWords.forEach(c => console.log(c));
}
*/
