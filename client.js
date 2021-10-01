const http = require ('http');
const https = require ('https');
const host = 'localhost';
const port = 8000;

var postData = "hello";

let options = {
    host: 'localhost',
    port: 8000,
    method: 'POST',
    header: {
	'Accept': 'application/json',
	'Content-Type': 'application/json; charset=UTF-8',
	'Content-Length' : postData.length
    }
};

switch (process.argv[2]) {
case "books": options.path = "/books"; break;
case "authors": options.path = "/authors"; break;
default:
    console.log (process.argv.toString ());
    throw `Bad command line argument ${process.argv[2]}`;
}

let request = http.request (options, (res) => {
    if (res.statusCode !== 200) {
	console.error(`Did not get a Created from the server. Code: ${res.statusCode}`);
	res.resume();
	return;
    }
    let data = '';
    res.on ('data', (chunk) => {
	data += chunk;
    });

    res.on ('close', () => {
	console.log (data);
    });
    
});

request.write (postData);
request.end ();

request.on ('error', (err) => {
    console.error (`Encountered an error trying to make a request: ${err.message}`);
});
