// for both exercises, the id of the object you're searching for is given to you
// as integer. return the whole object that you're looking for
//
// it's up to you what to return if the object isn't found (we're not testing that)

function linearSearch(id, array) {
  for (let i = 0; i <= array.length; i++) {
    if (id === array[i].id) {
      return array[i];
    }
  }
  return null;
}

function binarySearchRecursive(id, array) {
  let arrLength = array.length;
  let min = 0;
  let max = arrLength - 1;
  let mid = Math.floor((min + max) / 2);
  let midValue = array[mid];
  if (id == midValue.id) {
    return midValue;
  } else if (id < midValue.id) {
    // If lesser, analyze the left hand side of the array.
    return binarySearchRecursive(id, array.slice(min, mid))
  } else if (id > midValue.id) {
    // If greater, analyze the right hand size of the array.
    return binarySearchRecursive(id, array.slice(mid, max + 1))
  } else {
    return null;
  }
}

function binarySearchIterative(id, array) {
  let arrLength = array.length;
  let min = 0;
  let max = arrLength - 1;
  while (min <= max) {
    let mid = Math.floor((min + max) / 2);
    let midValue = array[mid];
    if (id > midValue.id) {
      min = mid + 1;
    } else if (id < midValue.id) {
      max = mid - 1;
    } else {
      return midValue;
    }
  }
  return null;
}

// unit tests
// do not modify the below code
test("linear search", function () {
  const lookingFor = { id: 5, name: "Brian" };
  expect(
    linearSearch(5, [
      { id: 1, name: "Sam" },
      { id: 11, name: "Sarah" },
      { id: 21, name: "John" },
      { id: 10, name: "Burke" },
      { id: 13, name: "Simona" },
      { id: 31, name: "Asim" },
      { id: 6, name: "Niki" },
      { id: 19, name: "Aysegul" },
      { id: 25, name: "Kyle" },
      { id: 18, name: "Jem" },
      { id: 2, name: "Marc" },
      { id: 51, name: "Chris" },
      lookingFor,
      { id: 14, name: "Ben" }
    ])
  ).toBe(lookingFor);
});

const binarySearchFunctions = [binarySearchIterative, binarySearchRecursive];
for (let binarySearch of binarySearchFunctions) {
  test(`${binarySearch.name}`, function () {
    const lookingFor = { id: 23, name: "Brian" };
    expect(
      binarySearch(23, [
        { id: 1, name: "Sam" },
        { id: 3, name: "Sarah" },
        { id: 5, name: "John" },
        { id: 6, name: "Burke" },
        { id: 10, name: "Simona" },
        { id: 12, name: "Asim" },
        { id: 13, name: "Niki" },
        { id: 15, name: "Aysegul" },
        { id: 17, name: "Kyle" },
        { id: 18, name: "Jem" },
        { id: 19, name: "Marc" },
        { id: 21, name: "Chris" },
        lookingFor,
        { id: 24, name: "Ben" }
      ])
    ).toBe(lookingFor);
  });

  // TODO(Scott): How do I get this to work with binarySearchRecursive?
  if (binarySearch.name !== 'binarySearchRecursive') {
    test(`${binarySearch.name} with non-existent ID`, function () {
      expect(
        binarySearch(23, [
          { id: 1, name: "Sam" },
          { id: 3, name: "Sarah" },
          { id: 5, name: "John" },
          { id: 6, name: "Burke" },
          { id: 10, name: "Simona" },
          { id: 12, name: "Asim" },
          { id: 13, name: "Niki" },
          { id: 15, name: "Aysegul" },
          { id: 17, name: "Kyle" },
          { id: 18, name: "Jem" },
          { id: 19, name: "Marc" },
          { id: 21, name: "Chris" },
          { id: 24, name: "Ben" }
        ])
      ).toBe(null);
    });
  }
}
