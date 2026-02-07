
package main

const ALPHABET_SIZE = 26

func countPairs(words []string) int64 {
    wordsToFrequency := map[string]int{}
    for i := range words {
        updatedFrequency := getOrDefault(wordsToFrequency, words[i], 0) + 1
        wordsToFrequency[words[i]] = updatedFrequency
    }
    return findNumberOfSimilarWords(wordsToFrequency)
}

func findNumberOfSimilarWords(wordsToFrequency map[string]int) int64 {
    var numberOfSimilarWords int64 = 0

    for firstWord, firstFrequency := range wordsToFrequency {
        numberOfSimilarWords += int64(firstFrequency - 1) * int64(firstFrequency) / 2

        for secondWord, secondFrequency := range wordsToFrequency {
            if secondFrequency == 0 || firstWord == secondWord || !wordsAreSimilar(firstWord, secondWord) {
                continue
            }
            numberOfSimilarWords += int64(firstFrequency) * int64(secondFrequency)
        }
        wordsToFrequency[firstWord] = 0
    }

    return numberOfSimilarWords
}

func wordsAreSimilar(firstWord string, secondWord string) bool {
    benchmarkRotations := requiredRotations(firstWord[0], secondWord[0])
    for i := 1; i < len(firstWord); i++ {
        if benchmarkRotations != requiredRotations(firstWord[i], secondWord[i]) {
            return false
        }
    }
    return true
}

func requiredRotations(firstLetter byte, secondLetter byte) int {
    return (int(secondLetter) - int(firstLetter) + ALPHABET_SIZE) % ALPHABET_SIZE
}

func getOrDefault[Key comparable, Value any](toCheck map[Key]Value, key Key, defaultValue Value) Value {
    if value, has := toCheck[key]; has {
        return value
    }
    return defaultValue
}
