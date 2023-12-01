class TrieNode {
  word: string | null
  children: Map<string, TrieNode>

  constructor() {
    this.word = null
    this.children = new Map()
  }
}

class Trie {
  root: TrieNode

  constructor() {
    this.root = new TrieNode
  }

  insert(word: string) {
    let currentNode = this.root

    for (const letter of word) {
      const node = currentNode.children.get(letter)

      if (node) {
        currentNode = node
      }
      else {
        const newNode = new TrieNode()
        currentNode.children.set(letter, newNode)
        currentNode = newNode
      }
    }

    currentNode.word = word
    return currentNode
  }
}

export { Trie, TrieNode }