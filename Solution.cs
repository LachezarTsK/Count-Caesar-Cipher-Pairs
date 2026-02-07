
using System;
using System.Collections.Generic;

public class Solution
{
    private static readonly int ALPHABET_SIZE = 26;

    public long CountPairs(string[] words)
    {
        Dictionary<string, int> wordsToFrequency = [];
        for (int i = 0; i < words.Length; ++i)
        {
            int updatedFrequency = wordsToFrequency.GetValueOrDefault(words[i], 0) + 1;
            wordsToFrequency[words[i]] = updatedFrequency;
        }
        return findNumberOfSimilarWords(wordsToFrequency);
    }

    private static long findNumberOfSimilarWords(Dictionary<string, int> wordsToFrequency)
    {
        long numberOfSimilarWords = 0;

        foreach (KeyValuePair<string, int> first in wordsToFrequency)
        {
            numberOfSimilarWords += (long)(first.Value - 1) * first.Value / 2;

            foreach (KeyValuePair<string, int> second in wordsToFrequency)
            {
                if (second.Value == 0 || first.Key.Equals(second.Key) || !wordsAreSimilar(first.Key, second.Key))
                {
                    continue;
                }
                numberOfSimilarWords += (long)first.Value * second.Value;
            }
            wordsToFrequency[first.Key] = 0;
        }

        return numberOfSimilarWords;
    }

    private static bool wordsAreSimilar(string firstWord, string secondWord)
    {
        int benchmarkRotations = requiredRotations(firstWord[0], secondWord[0]);
        for (int i = 1; i < firstWord.Length; ++i)
        {
            if (benchmarkRotations != requiredRotations(firstWord[i], secondWord[i]))
            {
                return false;
            }
        }
        return true;
    }

    private static int requiredRotations(char firstLetter, char secondLetter)
    {
        return (secondLetter - firstLetter + ALPHABET_SIZE) % ALPHABET_SIZE;
    }
}
