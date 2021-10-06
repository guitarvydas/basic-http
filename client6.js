const http = require ('http');

const options = { method: 'POST'
};

var data = '';

//setTimeout(() => saySomething("10 seconds passed"), 10*1000);
//-->
//const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
//
//wait(10*1000).then(() => saySomething("10 seconds")).catch(failureCallback);

function sendReq (fn_OK) {
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
					return fn_OK (data);
				    });
				    
				    request.on('error', (err) => {
					console.error (err);
				    });
				});
    const reqData = { message: "hello" };
    request.write (JSON.stringify (reqData));
    request.end ();
}

function received (s) {
    console.log ('received: /' + s + '/');
    return s;
}

var p = new Promise (ok => sendReq (received));
//console.log ("sendReq returned: /" + data + "/");
console.log (p);
p
    .then (ps => console.log (`promised: {$ps}`))
    .catch (e => console.error (`FATAL: ${e}`));
console.log (p);

var xxx = 1;
console.log (xxx);
(async () => {
    console.log (await p);
    xxx = 2;
});
console.log (p);
console.log (xxx);
