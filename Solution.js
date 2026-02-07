
const ALPHABET_SIZE = 26;

class CustomizedMap extends Map {

    getOrDefault(key, defaultValue) {
        if (this.has(key)) {
            return this.get(key);
        }
        return defaultValue;
    }
}

/**
 * @param {string[]} words
 * @return {number}
 */
var countPairs = function (words) {
    // CustomizedMap<string, number>
    const wordsToFrequency = new CustomizedMap();
    for (let i = 0; i < words.length; ++i) {
        const updatedFrequency = wordsToFrequency.getOrDefault(words[i], 0) + 1;
        wordsToFrequency.set(words[i], updatedFrequency);
    }
    return findNumberOfSimilarWords(wordsToFrequency);
};

/**
 * @param {CustomizedMap<string, number>} wordsToFrequency
 * @return {number}
 */
function findNumberOfSimilarWords(wordsToFrequency) {
    let numberOfSimilarWords = 0;

    for (let [firstWord, firstFrequency] of wordsToFrequency) {
        numberOfSimilarWords += (firstFrequency - 1) * firstFrequency / 2;
        for (let [secondWord, secondFrequency] of wordsToFrequency) {
            if (secondFrequency === 0 || firstWord === secondWord || !wordsAreSimilar(firstWord, secondWord)) {
                continue;
            }
            numberOfSimilarWords += firstFrequency * secondFrequency;
        }
        wordsToFrequency.set(firstWord, 0);
    }

    return numberOfSimilarWords;
}

/**
 * @param {string} firstWord
 * @param {string} secondWord
 * @return {boolean}
 */
function wordsAreSimilar(firstWord, secondWord) {
    const benchmarkRotations = requiredRotations(firstWord.codePointAt(0), secondWord.codePointAt(0));
    for (let i = 1; i < firstWord.length; ++i) {
        if (benchmarkRotations !== requiredRotations(firstWord.codePointAt(i), secondWord.codePointAt(i))) {
            return false;
        }
    }
    return true;
}

/**
 * @param {number(ASCII)} firstLetter
 * @param {number(ASCII)} secondLetter
 * @return {number}
 */
function requiredRotations(firstLetter, secondLetter) {
    return (secondLetter - firstLetter + ALPHABET_SIZE) % ALPHABET_SIZE;
}
