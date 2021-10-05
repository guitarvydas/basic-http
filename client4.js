let http = require("http");


var data = '';

async function req () {
    function inner () {
	let post = http.request({
	    host: 'localhost',
	    port: 8000,
	    path: "/authors",
	    method: "POST"
	}, res => {
	    res.on("data", chunk => {
		data += chunk;
	    });
	    res.on("close", () => {
		console.log ("from close 1");
		console.log (data);
	    })
	});
	post.write("string_to_send");
	post.end();
    };
    inner ();
    return data;
    // await inner ();
    // console.log ("from req 1");
    // console.log(data);
    // return data;
}

// async function http_request () {
//     var r = await req ();
//     return r;
// }

//var result = req ().then (x => { console.log ("FINAL:"); console.log (x); return x;});
//var result = http_request ();
//console.log (result);

var result_promise = req ();
console.log ("END");
console.log (result_promise);
