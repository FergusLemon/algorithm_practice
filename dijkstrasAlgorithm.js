'use strict';

const runDijkstra = () => {
  const graph = {};
  graph["start"] = {};
  graph["start"]["a"] = 6;
  graph["start"]["b"] = 2;
  graph["a"] = {};
  graph["a"]["fin"] = 1;
  graph["b"] = {};
  graph["b"]["a"] = 3;
  graph["b"]["fin"] = 5;
  graph["fin"] = {};

  let costs = {};
  costs["a"] = 6;
  costs["b"] = 2;
  costs["fin"] = Infinity;

  let parents = {};
  parents["a"] = "start";
  parents["b"] = "start";
  parents["fin"] = null;

  const processed = [];

  const findNodeWithLowestCost = (costs) => {
    let lowestCost = Infinity;
    let nodeWithLowestCost = null;
    
    for (let node in costs) {
      let cost = costs[node];
      if (cost < lowestCost && processed.includes(node) === false) {
        lowestCost = cost;
        nodeWithLowestCost = node;
      }
    }
    return nodeWithLowestCost;
  };

  let node = findNodeWithLowestCost(costs);
  while (node !== null) {
    let cost = costs[node];
    let neighbours = graph[node];
    for (let n of Object.keys(neighbours)) {
      let newCost = cost + neighbours[n];
      if (costs[n] > newCost) {
        costs[n] = newCost;
        parents[n] = node;
      }
    }
    processed.push(node);
    node = findNodeWithLowestCost(costs);
  }
  
  return costs;
};
