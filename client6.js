const http = require ('http');

const options = { method: 'POST'
};

var data = '';

function sendReq (received) {
    let request = http.request ('http://localhost:8000/authors',
				options,
				(res) => {
				    if (res.statusCode !== 201) {
					console.error (`Did not get an OK from the server. Code ${res.statusCode}`);
					res.resume ();
					return;
				    }
				
				    res.on('data', (chunk) => { 
					data += chunk;
				    });
				    res.on('close', () => {
					console.log('Retrieved all data'); 
					console.log(JSON.parse(data));
					received (data);
				    });
				    
				    request.on('error', (err) => {
					console.error(`Encountered an error trying to make a request: ${err.message}`)});
				});
    const reqData = { message: "hello" };
    request.write (JSON.stringify (reqData));
    request.end ();
}

function received (s) {
    console.log ('received: /' + s + '/');
}

sendReq (received);

console.log ("sendReq returned: /" + data + "/");
