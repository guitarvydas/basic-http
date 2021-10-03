let http = require("http");

async function req () {
    var result = "def";
    function inner () {
	let post = http.request({
	    host: 'localhost',
	    port: 8000,
	    path: "/authors",
	    method: "POST"
	}, res => {
	    res.on("data", chunk => {
		console.log("data: " + chunk);
		result = chunk;
		return result;
	    });
	    res.on("close", finaldata => {
		console.log("close: " + finaldata);
		result = finaldata;
		return result;
	    })
	});
	post.write("string_to_send");
	post.end();
    };
    var i = await inner ();
    return i;
}

var result = req ().then (x => { console.log ("FINAL:"); console.log (x)});

