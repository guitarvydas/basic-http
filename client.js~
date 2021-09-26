const http = require ('http');
const https = require ('https');
const host = 'localhost';
const port = 8000;

const options = {
    host: 'jsonplaceholder.typicode.com',
    path: '/users',
    method: 'POST',
    header: {
	'Accept': 'application/json',
	'Content-Type': 'application/json; charset=UTF-8'
    }
};

let request = https.request (options, (res) => {
    if (res.statusCode !== 201) {
	console.error(`Did not get a Created from the server. Code: ${res.statusCode}`);
	res.resume();
	return;
    }
    let data = '';
    res.on ('data', (chunk) => {
	data += chunk;
    });

    res.on ('close', () => {
	console.log ('Retrieved all data');
	console.log (JSON.parse (data));
    });
    
});

request.end ();

request.on ('error', (err) => {
    console.error (`Encountered an error trying to make a request: ${err.message}`);
});
