
class Solution {

    private companion object {
        const val ALPHABET_SIZE = 26
    }

    fun countPairs(words: Array<String>): Long {
        val wordsToFrequency = mutableMapOf<String, Int>()
        for (i in words.indices) {
            val updatedFrequency = wordsToFrequency.getOrDefault(words[i], 0) + 1
            wordsToFrequency[words[i]] = updatedFrequency
        }
        return findNumberOfSimilarWords(wordsToFrequency)
    }

    private fun findNumberOfSimilarWords(wordsToFrequency: MutableMap<String, Int>): Long {
        var numberOfSimilarWords: Long = 0

        for ((firstWord, firstFrequency) in wordsToFrequency) {
            numberOfSimilarWords += (firstFrequency - 1).toLong() * firstFrequency / 2

            for ((secondWord, secondFrequency) in wordsToFrequency) {
                if (secondFrequency == 0 || firstWord == secondWord || !wordsAreSimilar(firstWord, secondWord)) {
                    continue
                }
                numberOfSimilarWords += firstFrequency.toLong() * secondFrequency
            }
            wordsToFrequency[firstWord] = 0
        }

        return numberOfSimilarWords
    }

    private fun wordsAreSimilar(firstWord: String, secondWord: String): Boolean {
        val benchmarkRotations = requiredRotations(firstWord[0], secondWord[0])
        for (i in 1..<firstWord.length) {
            if (benchmarkRotations != requiredRotations(firstWord[i], secondWord[i])) {
                return false
            }
        }
        return true
    }

    private fun requiredRotations(firstLetter: Char, secondLetter: Char): Int {
        return (secondLetter - firstLetter + ALPHABET_SIZE) % ALPHABET_SIZE
    }
}
