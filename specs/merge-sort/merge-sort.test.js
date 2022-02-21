/*
  Write a function that performs mergesort
  Name the function mergeSort
  It will take in a array of numbers and return a sorted array numbers

  You'll need to write more than just one function
*/

const merge = (lhsArr, rhsArr) => {
  let res = [];

  while (lhsArr.length && rhsArr.length) {
    if (lhsArr[0] <= rhsArr[0]) {
      res.push(lhsArr.shift());
    } else {
      res.push(rhsArr.shift());
    }
  }

  return res.concat(lhsArr, rhsArr);
};

const mergeSort = (arr) => {
  //console.log(`mergeSort([${arr}])`);

  let arrLength = arr.length;

  if (arrLength < 2) {
    return arr;
  }

  let breakpoint = Math.floor(arrLength / 2);
  let lhsArr = arr.slice(0, breakpoint);
  let rhsArr = arr.slice(breakpoint);

  return merge(mergeSort(lhsArr), mergeSort(rhsArr));
};

// unit tests
// do not modify the below code
test("merge sort", function () {
  const nums = [10, 5, 3, 8, 2, 6, 4, 7, 9, 1];
  const ans = mergeSort(nums);
  expect(ans).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});
