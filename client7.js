const http = require ('http');

const options = { method: 'POST'
};

var data = '';

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

function httpReq () {
    return new Promise (fn_resolve => sendReq (fn_resolve));
}


async function areq () { 
    var p = httpReq ();
    console.log ('begin await'); 
    console.log (p);
    var returneddata = await p; 
    console.log (p);
    console.log ('end await');
    return returneddata;
}

var r = areq ();
console.log ('done');
console.log (r);
(async () => { console.log (await r); })();
(async () => { console.log (await r); })();
