var edgeList = [ [0, 2], [1, 3], [2, 3], [2, 4], [3, 5], [4, 5] ];




var adjMatrix = [
    ];
    
function fillMatrix() {
  for (var i = 0; i < edgeList.length; i++) {
    const lineCandidates = [...edgeList].filter(el => el[0] === i);
    const reduced = lineCandidates.reduce((res,cur) => {
      res.push(cur[1]);
      return res;
    },[]);
    const line = [];
    for (var j = 0; j < edgeList.length; j++) {
      if (reduced.includes(j)) {
        line.push(1);
      } else {
        line.push(0);
      }
    }
    adjMatrix.push(line);
  }
}

fillMatrix();

console.log(adjMatrix);




var adjList = [
    ];

    for (var i = 0; i < edgeList.length; i++) {
      const lineCandidates = [...edgeList].filter(el => el[0] === i);
      const reduced = lineCandidates.reduce((res,cur) => {
        res.push(cur[1]);
        return res;
      },[]);
      adjList.push(reduced)
    }


      console.log(adjList);
