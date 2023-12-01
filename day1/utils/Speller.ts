import { Trie, TrieNode } from "./Trie"

class Speller {
  trie: Trie
  stack: TrieNode[]

  constructor(trie: Trie) {
    this.trie = trie
    this.stack = []
  }

  spell(letter: string) {
    this.stack.push(this.trie.root)

    const newStack: TrieNode[] = []
    for (const element of this.stack) {
      const nextNode = element.children.get(letter)

      if (!nextNode) continue

      if (nextNode.word !== null)
        return nextNode.word

      newStack.push(nextNode)
    }

    this.stack = newStack
    return null
  }
}

export { Speller }