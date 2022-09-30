// Using iteration, write a function fibs which takes a number and returns an array containing that many numbers from the fibonacci sequence. Using an example input of 8, this method should return the array [0, 1, 1, 2, 3, 5, 8, 13].
// Now write another method fibsRec which solves the same problem recursively. This can be done in just a couple of lines (or 1 if you’re crazy, but don’t consider either of these lengths a requirement… just get it done).


function fib(num) {
  const output = [0];
  let prev = 0;
  let next = 1;
  let current = 0;
  let index = 0;
  
  while (++index < num) {
    prev = next;
    next = current;
    current = prev + next;
    output.push(current);
    
  }
  return output;
}

function fibsRec(num,seq=[0,1]) {
  if (num <= 2) {
    return [0,1];
  }
  const response = fibsRec(num-1);
  response.push(
    response[response.length-1]
      + response[response.length-2]
  );
  return response;
}

console.log('EQUAL?', JSON.stringify(fib(118))
=== JSON.stringify(fibsRec(118)));