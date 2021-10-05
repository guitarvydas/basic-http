const http = require ('http');

//let request = http.get ('http://jsonplaceholder.typicode.com/user?_limit=2', (res) => {
let request = http.get ('http://localhost:8000/authors', (res) => {
    if (res.statusCode !== 200) {
	console.error (`Did not get an OK from the server. Code ${res.statusCode}`);
	res.resume ();
	return;
    }
});
