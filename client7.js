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


async function areq () { 
    var p = (() => new Promise (fn_resolve => sendReq (fn_resolve))) ();
    var returneddata = await p; 
    return returneddata;
}

var r = areq ();
(async () => { console.log (await r); })();
