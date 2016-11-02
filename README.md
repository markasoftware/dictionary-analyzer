# dictionary-analyzer

This was created for that one reddit thread. Finds how many base words are needed to understand all definitions in English.

## Sources

The main source is the sql dump of the WordNet dictionary. It can be downloaded from [here](http://www.androidtech.com/downloads/wordnet20-from-prolog-all-3.zip). Extract the .sql from the .zip and put it in the source-data directory under the name `wordnet-dictionary.sql`. After that, you will need to process it into the javascript-friendly version by running `node src/convert-sources.js`, which will create a JSON formatted version of the dictionary file.

## Running the main program

Run `node src/analyze.js` to run the main file and process stuff.
