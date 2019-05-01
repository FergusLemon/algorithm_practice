// follow along from Beau Carnes video https://www.youtube.com/watch?v=wu0ckYkltus
function bfs(graph, root) {
  let edgesFromRoot = {};
  const graphLen = graph.length;

  for (let i = 0; i < graphLen; i++) {
    edgesFromRoot[i] = Infinity;
  }

  edgesFromRoot[root] = 0;

  let queue = [root];
  let current;

  while(queue.length !== 0) {
    current = queue.shift();

    let neighbours = graph[current];
    let neighboursIndex = [];
    let index = neighbours.indexOf(1);
    while (index !== -1) {
      neighboursIndex.push(index);
      index = neighbours.indexOf(1, index + 1);
    }

    let neighboursIndexLen = neighboursIndex.length;

    for (let j = 0; j < neighboursIndexLen; j++) {
      if (edgesFromRoot[neighboursIndex[j]] === Infinity) {
        edgesFromRoot[neighboursIndex[j]] = edgesFromRoot[current] + 1;
        queue.push(neighboursIndex[j]);
      }
    }
  }
  return edgesFromRoot;
};

const bfsGraph = [
  [0,1,1,1,0],
  [0,0,1,0,0],
  [1,1,0,0,0],
  [0,0,0,1,0],
  [0,1,0,0,0],
];

console.log(bfs(bfsGraph, 1));
