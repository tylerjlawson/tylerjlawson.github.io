+++
title = "First N Promises Resolved"
description = "Examples for how to get the first n promises resolved from an array."
date = "2021-05-13"
image = "/images/posts/js-promise.jpg"
+++

With Javascript at the moment, it is really easy to get the first 1 or _l_ promises resolved in a list, where _l_ is the length of the list. This is achieved with `Promise.race` and `Promise.all` respectively. When creating production applications `Promise.allResolved` is normally preferred since it will resolve even if one of the promises errors, but for the purposes of this post I will assume that all promises resolve successfully.

Let's say you have a list of 3 promises and you want to obtain the first two that resolve. To do this, we can group all possible pairs of two promises, use `Promise.all` on the two, then combine them into a larger array, where we `race` for the first two to be resolved.

```js
const promises = [p1, p2, p3];
const combinedPromises = [
  Promise.all([promises[0], promises[1]]),
  Promise.all([promises[0], promises[2]]),
  Promise.all([promises[1], promises[2]])
];
const firstTwo = Promise.race(combinedPromises);
```

This is nice when we just want to get the first two from a list of three, but I would like to extend this to get the first _n_ from an array of length _l_.

The first thing I will need is a way to generate all possible index pairs of length _n_ from the array. For the previous example this was `[[0, 1], [0, 2], [1, 2]]` and was used in `combinedPromises`. Thankfully there is a [geeks for geeks post on this topic](https://www.geeksforgeeks.org/print-all-possible-combinations-of-r-elements-in-a-given-array-of-size-n/), where they are printing all possible combinations. I will slightly modify this to collect the list of lists I am looking for.

```js
function combinationsUtil(arr, r, index, data, i, result) {
  if (index == r) {
    const resultString = JSON.stringify(result);
    const newResult = data.slice(0, r);
    if (!resultString.includes(JSON.stringify(newResult))) {
      result.push(newResult);
    }
  }
  // When no more elements are there
  // to put in data[]
  if (i >= arr.length) return;

  // current is included, put
  // next at next location
  data[index] = arr[i];
  combinationsUtil(arr, r, index + 1, data, i + 1, result);

  // current is excluded, replace
  // it with next (Note that
  // i+1 is passed, but index is not changed)
  combinationsUtil(arr, r, index, data, i + 1, result);
}

function combinationsFromLength(l, n) {
  const arr = [...Array(l).keys()];
  const result = [];
  combinationsUtil(arr, n, 0, new Array(n), 0, result);
  return result;
}

const result = combinationsFromLength(3, 2);
console.log(result);
// OUTPUT: [[0, 1], [0, 2], [1, 2]]
```

Now that we have our list of possible pairings we can write a function that returns the first _n_ promises to resolve.

```js
function promiseSome(promises, n) {
  const combinations = combinationsFromLength(promises.length, n);
  const allGroups = combinations.map((group) =>
    Promise.all(group.map((ind) => promises[ind]))
  );
  return Promise.race(allGroups);
}
```

Now we can test this out we can make some promises using `setTimeout`:

```js
const testPromise = (ms, message) =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve(`${message}: took ${ms} ms`);
    }, ms)
  );

const p1 = testPromise(3000, 'Promise One');
const p2 = testPromise(1000, 'Promise Two');
const p3 = testPromise(500, 'Promise Three');
const p4 = testPromise(1100, 'Promise Four');
const promises = [p1, p2, p3, p4];

(async () => {
  const firstThree = await promiseSome(promises, 3);
  console.log(firstThree);
  // OUTPUT: ["Promise Two: took 1000 ms", "Promise Three: took 500 ms", "Promise Four: took 1100 ms"]
  const firstTwo = await promiseSome(promises, 2);
  console.log(firstTwo);
  // OUTPUT: ["Promise Two: took 1000 ms", "Promise Three: took 500 ms"]
})();
```

Now we can effectively get the first _n_ promises resolved from a list of promises whenever we want!
