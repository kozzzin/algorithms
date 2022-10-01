// const toBeSorted = [8,4,6,2,1,7,5,3];
// const toBeSorted = [2,8,3,5, 9, 1,4,7,6];
const toBeSorted = [12, 12, 23, 4 , 6, 6, 10, -35, 28];

function mergeSort([...arr]) {
  if (arr.length < 2) {
    return arr;
  }
  const left = mergeSort(arr.slice(0,arr.length/2));
  const right = mergeSort(arr.slice(arr.length/2,arr.length));
  return merger(left,right);
}

function merger([...arrL],[...arrR]) {
  const merged = [];
  while (arrL.length > 0 || arrR.length > 0) {
    let left = arrL.splice(0,1)[0];
    let right = arrR.splice(0,1)[0];
    if (left < right) {
      let leftArr = checkAdjacent(arrL,left,right)
      if (left !== undefined) merged.push(...leftArr);
      if (right !== undefined) merged.push(right);
    } else {
      let rightArr = checkAdjacent(arrR, right, left)
      if (right !== undefined) merged.push(...rightArr);
      if (left !== undefined) merged.push(left);
    }
  }
  return merged;
}

function checkAdjacent(currentArray,currentNum, compareNum) {
  let arr = [currentNum];
  let index = 0;
  for (let i = 0; i < currentArray.length; i++) {
    if (currentArray[i] <= compareNum) {
      index++;
    }
  }
  arr.push(...currentArray.splice(0,index));
  return arr;
}

console.log(mergeSort(toBeSorted));