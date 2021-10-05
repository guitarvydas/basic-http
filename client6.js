const http = require ('http');

const options = { method: 'GET'
};

//let request = http.get ('http://jsonplaceholder.typicode.com/user?_limit=2', (res) => {
let request = http.request ('http://localhost:8000/authors',
			    options,
			    (res) => {
				if (res.statusCode !== 200) {
				    console.error (`Did not get an OK from the server. Code ${res.statusCode}`);
				    res.resume ();
				    return;
				}
				
				let data = '';
				res.on('data', (chunk) => { 
				    data += chunk;
				});
				res.on('close', () => {
				    console.log('Retrieved all data'); 
				    console.log(JSON.parse(data));
				});
				
				request.on('error', (err) => {
				    console.error(`Encountered an error trying to make a request: ${err.message}`)});
			    });
request.end ();

