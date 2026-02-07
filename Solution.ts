
const ALPHABET_SIZE = 26;

class CustomizedMap<Key, Value> extends Map {

    getOrDefault(key: Key, defaultValue: Value) {
        if (this.has(key)) {
            return this.get(key);
        }
        return defaultValue;
    }
}

function countPairs(words: string[]): number {
    const wordsToFrequency = new CustomizedMap<string, number>();
    for (let i = 0; i < words.length; ++i) {
        const updatedFrequency = wordsToFrequency.getOrDefault(words[i], 0) + 1;
        wordsToFrequency.set(words[i], updatedFrequency);
    }
    return findNumberOfSimilarWords(wordsToFrequency);
};

function findNumberOfSimilarWords(wordsToFrequency: CustomizedMap<string, number>): number {
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

function wordsAreSimilar(firstWord: string, secondWord: string): boolean {
    const benchmarkRotations = requiredRotations(firstWord.codePointAt(0), secondWord.codePointAt(0));
    for (let i = 1; i < firstWord.length; ++i) {
        if (benchmarkRotations !== requiredRotations(firstWord.codePointAt(i), secondWord.codePointAt(i))) {
            return false;
        }
    }
    return true;
}

function requiredRotations(firstLetter: number/*ASCII*/, secondLetter: number/*ASCII*/): number {
    return (secondLetter - firstLetter + ALPHABET_SIZE) % ALPHABET_SIZE;
}
