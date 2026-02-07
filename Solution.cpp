
#include <vector>
#include <string>
#include <string_view>
#include <unordered_map>
using namespace std;

class Solution {

    static const int ALPHABET_SIZE = 26;

public:
    long long countPairs(const vector<string>& words) const {
        unordered_map<string, int> wordsToFrequency;
        for (int i = 0; i < words.size(); ++i) {
            int updatedFrequency = wordsToFrequency[words[i]] + 1;
            wordsToFrequency[words[i]] = updatedFrequency;
        }
        return findNumberOfSimilarWords(wordsToFrequency);
    }

private:
    static long long findNumberOfSimilarWords(unordered_map<string, int>& wordsToFrequency) {
        long long numberOfSimilarWords = 0;

        for (const auto& [firstWord, firstFrequency] : wordsToFrequency) {
            numberOfSimilarWords += static_cast<long long>(firstFrequency - 1) * firstFrequency / 2;

            for (const auto& [secondWord, secondFrequency] : wordsToFrequency) {
                if (secondFrequency == 0 || firstWord == secondWord || !wordsAreSimilar(firstWord, secondWord)) {
                    continue;
                }
                numberOfSimilarWords += static_cast<long long>(firstFrequency) * secondFrequency;
            }
            wordsToFrequency[firstWord] = 0;
        }

        return numberOfSimilarWords;
    }

private:
    static bool wordsAreSimilar(string_view firstWord, string_view secondWord) {
        int benchmarkRotations = requiredRotations(firstWord[0], secondWord[0]);
        for (int i = 1; i < firstWord.length(); ++i) {
            if (benchmarkRotations != requiredRotations(firstWord[i], secondWord[i])) {
                return false;
            }
        }
        return true;
    }

    static int requiredRotations(char firstLetter, char secondLetter) {
        return (secondLetter - firstLetter + ALPHABET_SIZE) % ALPHABET_SIZE;
    }
};
