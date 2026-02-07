
import java.util.HashMap;
import java.util.Map;

public class Solution {

    private static final int ALPHABET_SIZE = 26;

    public long countPairs(String[] words) {
        Map<String, Integer> wordsToFrequency = new HashMap<>();
        for (int i = 0; i < words.length; ++i) {
            int updatedFrequency = wordsToFrequency.getOrDefault(words[i], 0) + 1;
            wordsToFrequency.put(words[i], updatedFrequency);
        }
        return findNumberOfSimilarWords(wordsToFrequency);
    }

    private long findNumberOfSimilarWords(Map<String, Integer> wordsToFrequency) {
        long numberOfSimilarWords = 0;

        for (Map.Entry<String, Integer> first : wordsToFrequency.entrySet()) {
            numberOfSimilarWords += (long) (first.getValue() - 1) * first.getValue() / 2;

            for (Map.Entry<String, Integer> second : wordsToFrequency.entrySet()) {
                if (second.getValue() == 0 || first.getKey().equals(second.getKey()) || !wordsAreSimilar(first.getKey(), second.getKey())) {
                    continue;
                }
                numberOfSimilarWords += (long) first.getValue() * second.getValue();
            }
            wordsToFrequency.put(first.getKey(), 0);
        }

        return numberOfSimilarWords;
    }

    private boolean wordsAreSimilar(String firstWord, String secondWord) {
        int benchmarkRotations = requiredRotations(firstWord.charAt(0), secondWord.charAt(0));
        for (int i = 1; i < firstWord.length(); ++i) {
            if (benchmarkRotations != requiredRotations(firstWord.charAt(i), secondWord.charAt(i))) {
                return false;
            }
        }
        return true;
    }

    private int requiredRotations(char firstLetter, char secondLetter) {
        return (secondLetter - firstLetter + ALPHABET_SIZE) % ALPHABET_SIZE;
    }
}
