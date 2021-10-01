// import fetch from 'node-fetch';

// const response = await fetch('https://github.com/');
// const body = await response.text();

// console.log(body);

const fetch = require('node-fetch');

async function foo() {
  var url = 'https://jsonplaceholder.typicode.com/todos/1';
  var result = (await fetch(url)).text(); // Or .json()
  return result;
}

async function load() {
  var result = await foo();
  console.log(result);
}

load();
