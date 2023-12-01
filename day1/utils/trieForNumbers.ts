import { Trie } from "./Trie"

const trie = new Trie()
const reverseTrie = new Trie()
const stringNumbers: string[] = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
stringNumbers.forEach((number: string) => {
  trie.insert(number)

  const reversed = number.split("").reverse().join("")
  const node = reverseTrie.insert(reversed)
  node.word = number
})

export { trie as trieForNumbers, reverseTrie as reverseTrieForNumbers }