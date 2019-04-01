'use strict';
'use esversion: 6';

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

const costs = {};
costs["a"] = 6;
costs["b"] = 2;
costs["fin"] = Infinity;

const parents = {};
parents["a"] = "start";
parents["b"] = "start";
parents["fin"] = null;

const processed = [];

const findNodeWithLowestCost = (costs) => {
  let lowestCost = Infinity;
  let nodeWithLowestCost = null;

  for (let node in costs) {
    if (costs[node] < lowestCost && processed[node] === -1) {
      lowestCost = costs[node];
      nodeWithLowestCost = node;
    }
  }
  return nodeWithLowestCost;
};

const node = findNodeWithLowestCost(costs);

while (node !== null) {
  let cost = costs[node];
  let neighbours = graph[node];
  for (let n in Object.keys(neighbours)) {
    let newCost = cost + neighbours[n];
    if (costs[n] > newCost) {
      costs[n] = newCost;
      parents[n] = node;
    }
  }
  processed.push(node);
  node = findNodeWithLowestCost(costs);
}
