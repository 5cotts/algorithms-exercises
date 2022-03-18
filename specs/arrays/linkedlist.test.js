/*
  LinkedList
  
  Name your class / constructor (something you can call new on) LinkedList
  
  LinkedList is made by making nodes that have two properties, the value that's being stored and a pointer to
  the next node in the list. The LinkedList then keep track of the head and usually the tail (I would suggest
  keeping track of the tail because it makes pop really easy.) As you may have notice, the unit tests are the
  same as the ArrayList; the interface of the two are exactly the same and should make no difference to the
  consumer of the data structure.
  
  length - integer  - How many elements in the list
  push   - function - accepts a value and adds to the end of the list
  pop    - function - removes the last value in the list and returns it
  get    - function - accepts an index and returns the value at that position
  delete - function - accepts an index, removes value from list, collapses, 
                      and returns removed value
                      
  I would suggest making a second class, a Node class. However that's up to you how you implement it. A Node
  has two properties, value and next.

  As always, you can change describe to xdescribe to prevent the unit tests from running while
  you work
*/

class Node {
  constructor(value, next) {
    this.value = value || null;
    this.next = next || null;
  }
}

class LinkedList {
  constructor(head) {
    this.tail = this.head = (head || null);
    this.length = head ? 1 : 0;
  }

  _testValue(search, nodeValue, _, __) {
    return search === nodeValue;
  }

  _testIndex(search, _, i, __) {
    return search === i;
  }

  _find(value, test = this._test) {
    let current = this.head;
    let i = 0;
    while (current) {
      if (test(value, current.value, i, current)) {
        return current;
      } else {
        current = current.next;
        i++;
      }
    }
    return null;
  }

  push(value) {
    let node = new Node(value);
    if (!this.head) {
      this.head = node;
    } else {
      this.tail.next = node;
    }
    this.length++;
    this.tail = node;
  }

  pop() {
    // If no head, there is nothing to pop.
    if (!this.head) {
      return null;
    // If head equals tail there is only one node to pop.
    } else if (this.head === this.tail) {
      let node = this.head;
      this.head = this.tail = null;
      return node.value;
    }

    // If more than one node, we'll need to iterate. O(n).
    // Need to find the penultimate node and
    // change it's next value to `null.`
    let penultimateNode = this._find(
      null,
      (search, nodeValue, i, current) => current.next === this.tail
    );
    const tail = penultimateNode.next.value;
    penultimateNode.next = null;
    this.tail = penultimateNode;
    this.length--;
    return tail;
  }
  
  get(index) {
    const node = this._find(index, this._testIndex);
    if (!node) {
      return null;
    } else {
    return node.value;
    }
  }

  delete(index) {
    const del = this._find(index, this._testIndex);
    if (del === this.head) {
      this.head = this.head.next;
    } else if (del === this.tail) {
      return this.pop(index);
    }

    const prevIndex = index - 1;
    const prevNode = this._find(prevIndex, this._testIndex);
    if (prevNode) {
      prevNode.next = del.next;
    }
    this.length--
    return del;
  }

  serialize() {
    const ans = [];
    let current = this.head;
    if (!current) return ans;
    while (current) {
      ans.push(current.value);
      current = current.next;
    }
    return ans;
  }

}

// unit tests
// do not modify the below code
describe("LinkedList", function () {
  const range = (length) =>
    Array.apply(null, { length: length }).map(Number.call, Number);
  const abcRange = (length) =>
    range(length).map((num) => String.fromCharCode(97 + num));
  let list;

  beforeEach(() => {
    list = new LinkedList();
  });

  test("constructor", () => {
    expect(list).toEqual(expect.any(LinkedList));
  });

  test("push", () => {
    abcRange(26).map((character) => list.push(character));
    expect(list.length).toEqual(26);
  });

  test("pop", () => {
    abcRange(13).map((character) => list.push(character));
    expect(list.length).toEqual(13);
    range(10).map(() => list.pop());
    expect(list.length).toEqual(3);
    expect(list.pop()).toEqual("c");
  });

  test("get", () => {
    list.push("first");
    expect(list.get(0)).toEqual("first");
    list.push("second");
    expect(list.get(1)).toEqual("second");
    expect(list.get(0)).toEqual("first");
    abcRange(26).map((character) => list.push(character));
    expect(list.get(27)).toEqual("z");
    expect(list.get(0)).toEqual("first");
    expect(list.get(9)).toEqual("h");
    list.pop();
    expect(list.get(list.length - 1)).toEqual("y");
  });

  test("delete", () => {
    abcRange(26).map((character) => list.push(character));
    list.delete(13);
    expect(list.length).toEqual(25);
    expect(list.get(12)).toEqual("m");
    expect(list.get(13)).toEqual("o");
    list.delete(0);
    expect(list.length).toEqual(24);
    expect(list.get(0)).toEqual("b");
  });
});
