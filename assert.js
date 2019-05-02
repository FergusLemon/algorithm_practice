'use strict';
/*
 * Why the slice(8, -1)? The toString method on the Object prototype felt more
 * robust for the purposes of checking types. It's return value is quite
 * verbose however, so slicing off some of the chars leaves a cleaner result.
*/
const getType = element => Object.prototype.toString.call(element).slice(8, -1);

const formatPath = path => {
  path = path.slice(0,-1).join('.');
  return path.replace(/\.(\d)/g, '[$1]');
};

const isPrimitive = {'Number': true, 'String': true, 'Boolean': true};
const isNullUndefined = {'Null': true, "Undefined": true};
const isRegexDateErrFunc = {'RegExp': true, 'Date': true,
                            'Error': true, 'Function': true};

const isSameSet = (set1, set2) => {
  return [...set1].every(elem => set2.has(elem));
};
const findDifference = (set1, set2) => {
  return [...set1].filter(elem => !set2.has(elem));
};

function assertEquals(message, expected, actual) {
  let path = arguments[3];
  if (typeof path === 'undefined') {
    path = [];
  }
  if (expected === actual) return true;
  if (Number.isNaN(expected) && Number.isNaN(actual)) return true;

  let expectedType = getType(expected);
  let actualType = getType(actual);

  if (expectedType !== actualType) {
    throw new TypeError(
    `Expected ${expectedType} found ${actualType}`);
  }

  if (isNullUndefined[expectedType]) throw new TypeError(expectedType);

  if (isPrimitive[expectedType] && expected !== actual) {
    let errorMsg = "Expected";
    errorMsg += path <= 1 ? " " : " " + formatPath(path) + " ";
    errorMsg += expectedType === "String" ? '"' + expected + '"': expected;
    errorMsg += " found ";
    errorMsg += actualType === "String" ? '"' + actual + '"' : actual;
    throw new Error(errorMsg);
  }

  if (
    isRegexDateErrFunc[expectedType] &&
    expected.toString() !== actual.toString()
  ) {
      throw new Error(`Expected ${expected} found ${actual}`);
    }

  if (
    getType(expected) === 'Set' &&
    expected.size !== actual.size
    ) {
      throw new Error(`Expected set of size ${expected.size} found ` +
      `${actual.size}`);
    }

  if (
    getType(expected) === 'Set' &&
    !isSameSet(expected, actual)
    ) {
      let difference = findDifference(expected, actual);
      throw new Error(`Expected to find ${difference} in ` +
      `${JSON.stringify([...actual])} but it was not found`)
    }

  if (typeof expected === 'object') {
    let expectedKeys = Object.keys(expected);
    let actualKeys = Object.keys(actual);
    if (expectedKeys.length !== actualKeys.length) {
      let errorMsg = "Expected " + expectedType + " of ";
      errorMsg += expectedType === "Array" ? "length " : "size ";
      errorMsg += expectedKeys.length;
      errorMsg += path.length <= 1 ? " " : " at " + formatPath(path) + " ";
      errorMsg += "found " + actualKeys.length;
      throw new Error(errorMsg);
      }

    expectedKeys.forEach((k) => {
      if (!actual.hasOwnProperty(k)) throw new Error(
        `Expected ${k} but was not found on ${JSON.stringify(actual)}`
      );
    });

    const updatePath = (obj, key) => {
      if (path.length !== 0) {
        let lastValueTested = path[path.length -1];
        let lastValueType = getType(lastValueTested);
        if (lastValueType !== 'Array' && lastValueType !== 'Object') {
          path.splice(-2);
        } else {
          path.splice(-1);
        }
      }
      path.push(key, obj[key]);
      return path;
    };

    return expectedKeys.every((key) => {
      path = updatePath(expected, key);
      return assertEquals(message, expected[key], actual[key], path);
    });
  }

  return false;
};

////////////////////////////////////////////////////////////////////
function runTest(message, assertionFailures, expected, actual) {
  try {
    assertEquals(message, expected, actual);
  } catch (failure) {
    assertionFailures.push(failure.message);
  }
}

function runAll() {
  const complexObject1 = {
    propA: 1,
    propB: {
      propA: [1, { propA: 'a', propB: 'b' }, 3],
      propB: 1,
      propC: 2
    }
  };
  const complexObject1Copy = {
    propA: 1,
    propB: {
      propA: [1, { propA: 'a', propB: 'b' }, 3],
      propB: 1,
      propC: 2
    }
  };
  const complexObject2 = {
    propA: 1,
    propB: {
      propB: 1,
      propA: [1, { propA: 'a', propB: 'c' }, 3],
      propC: 2
    }
  };
  const complexObject3 = {
    propA: 1,
    propB: {
      propA: [1, { propA: 'a', propB: 'b' }, 3],
      propB: 1
    }
  };
  const complexObject4 = {
    propA: 1,
    propB: {
      propA: [1, { propA: [1, 3, { propD: 'd', propE: 'e' }], propB: 'b' }, 3],
      propB: 1
    }
  };
  const complexObject5 = {
    propA: 1,
    propB: {
      propA: [1, { propA: [1, 3, { propD: 'd', propE: 'f' }], propB: 'b' }, 3],
      propB: 1
    }
  };
  const objectABC = {
    propA: 1,
    propB: 2,
    propC: 3,
  };
  const objectABD = {
    propA: 1,
    propB: 2,
    propD: 4,
  };
  const set1 = new Set([1, 2, 3, 4, "a", "b", "c"]);
  const set1Copy = new Set([1, 2, 3, 4, "a", "b", "c"]);
  const set2 = new Set([10, 2, 3, 4, "a", "b", "c"]);
  const set3 = new Set([10, 2, 3, 4, "a", "b"]);
  const set4 = new Set([1, 2, 3, 4, "a", "b", "c", "d"]);

  // Run the tests
  let assertionFailures = [];
  runTest('Test 01: ', assertionFailures, 'abc', 'abc');
  runTest('Test 02: ', assertionFailures, 'abcdef', 'abc');
  runTest('Test 03: ', assertionFailures, ['a'], {0: 'a'});
  runTest('Test 04: ', assertionFailures, ['a', 'b'], ['a', 'b', 'c']);
  runTest('Test 05: ', assertionFailures, ['a', 'b', 'c'], ['a', 'b', 'c']);
  runTest('Test 06: ', assertionFailures, complexObject1, complexObject1Copy);
  runTest('Test 07: ', assertionFailures, complexObject1, complexObject2);
  runTest('Test 08: ', assertionFailures, complexObject1, complexObject3);
  runTest('Test 09: ', assertionFailures, null, {});
  runTest('Test 10: ', assertionFailures, objectABC, objectABD);
  runTest('Test 11: ', assertionFailures, NaN, NaN);
  runTest('Test 12: ', assertionFailures, null, undefined);
  runTest('Test 13: ', assertionFailures, /abc/, /abc/);
  runTest('Test 14: ', assertionFailures, /abc/, /abcd/);
  runTest('Test 15: ', assertionFailures, /abc/, 'abc');
  runTest('Test 16: ', assertionFailures, 0, -0);
  runTest('Test 17: ', assertionFailures, complexObject4, complexObject5);
  runTest('Test 18: ', assertionFailures, formatPath, formatPath);
  runTest('Test 19: ', assertionFailures, formatPath, getType);
  runTest('Test 20: ', assertionFailures, set1, set1Copy);
  runTest('Test 21: ', assertionFailures, set1, set2);
  runTest('Test 22: ', assertionFailures, set1, set4);
  runTest('Test 23: ', assertionFailures, set1, set3);

   //Output the results
   assertionFailures.forEach(failure => console.log(failure));
}

runAll();
