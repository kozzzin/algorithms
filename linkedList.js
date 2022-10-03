class LinkedList {
  constructor() {
    this._head = null;
  }

  append(value) {
    let tail = this.tail();
    tail.next = new Node(value,null);
  }

  prepend(value) {
    const temp = this.head();
    this._head = new Node(value,temp);
  }

  head() {
    return this._head;
  }

  tail() {
    let current = this.head();
    if (current !== null) {
      while (current.next != null) {
        current = current.next;
      }
    }
    return current;
  }

  at(index) {
    let innerIndex = 0;
    let current = this.head();
    if (index === innerIndex) return current;
    if (current !== null) {
      while (current.next != null && index !== innerIndex) {
        current = current.next;
        innerIndex++;
      }
    }
    if (index === innerIndex) {
      return current;
    }
    return undefined;
  }

  pop() {
    this.at(this.size()-2).next = null;
  }


  toStringHelper(value) {
    if (value.next === null) {
      return `( ${value.value} ) -> null`;
    }
    return `( ${value.value} ) -> `;
  }
 
  toString() {
    let response = '';
    let current = this.head();
    response += this.toStringHelper(current);
    while (current.next != null) {
      current = current.next;
      response += this.toStringHelper(current);
    }
    console.log(response);
    return response;
  }

  insertAt(value, index) {
    const previous = this.at(index-1);
    if (previous === undefined) {
      console.log('wrong index');
      return false;
    }
    
    const next = previous.next;
    previous.next = new Node(value,next);
  }

  contains(value) {
    let current = this.head();

    if (current.value === value) return true;
    if (current === null) return false 
    
    while (current.next != null && current.value !== value) {
      current = current.next;
    }

    if (current.value === value) return true;
    
    return false;
  }

  find(value) {
    let current = this.head();
    let index = 0;
    
    if (current.value === value) return index;
    if (current === null) return false 
    
    while (current.next != null && current.value !== value) {
      current = current.next;
      index++;
    }

    if (current.value === value) return index;
    
    return false;
  }
  
  removeAt(index) {
    const next = this.at(index+1) === undefined ? null : this.at(index+1);
    const previous = this.at(index-1);
    if (index === 0) {
      this._head = next;
      return;
    }
    if (previous === undefined) return false;
    previous.next = next;
  }

  size() {
    if (this._head === null) return 0;
    let size = 0;
    let current = this.head();
    if (current.value !== null) {
      size += 1;
    }
    while (current.next != null) {
      size += 1;
      current = current.next;
    }
    return size;
  }

}

class Node {
  constructor(value,next) {
    this.value = value;
    this.next = next;
  }
}

const list = new LinkedList();
console.log(list.size());
list.prepend('prepender');
list.prepend('prepender2');
list.prepend('prepender3');
list.append('fuck');
console.log(list.tail());
console.log(list.head());
list.pop();
list.removeAt(0);
list.insertAt('piska',1);
list.toString();
console.log(list.size());
console.log(list.contains('piska'));
console.log(list.find('pisewka'));


console.log(list.at(0));
console.log(list.at(3));