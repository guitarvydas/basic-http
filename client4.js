let http = require("http");

async function req () {
    var data = '';
    function inner () {
	let post = http.request({
	    host: 'localhost',
	    port: 8000,
	    path: "/authors",
	    method: "POST"
	}, res => {
	    res.on("data", chunk => {
		console.log("data: " + chunk);
		data += chunk;
	    });
	    res.on("close", finaldata => {
		console.log("close 1: " + finaldata);
		console.log("close 2: " + data);
		result = data;
		return result;
	    })
	});
	post.write("string_to_send");
	post.end();
	return "ghi";
    };
    var i = await inner ();
    return i;
}

var result = req ().then (x => { console.log ("FINAL:"); console.log (x)});

