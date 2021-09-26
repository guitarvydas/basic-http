//https://www.digitalocean.com/community/tutorials/how-to-create-a-web-server-in-node-js-with-the-http-module

const http = require ('http');
const https = require ('https');
const host = 'localhost';
const port = 8000;

const books = JSON.stringify([
    { title: "The Alchemist", author: "Paulo Coelho", year: 1988 },
    { title: "The Prophet", author: "Kahlil Gibran", year: 1923 }
]);

const authors = JSON.stringify([
    { name: "Paulo Coelho", countryOfBirth: "Brazil", yearOfBirth: 1947 },
    { name: "Kahlil Gibran", countryOfBirth: "Lebanon", yearOfBirth: 1883 }
]);

const requestListener = function (req, res) {
    res.setHeader ("Content-Type", "application/json");
    if (req.url === "/authors") {
	console.log ("routes: authors");
	res.writeHead (200);
	res.end (authors);
    } else if (req.url === "/books") {
	console.log ("routes: books");
	res.writeHead (200);
	res.end (Date ().toString());
    } else {
	console.log ("routes: error");
	res.writeHead (404);
	res.end (JSON.stringify ({error: "Resource not found"}));
    }
}

const server = http.createServer (requestListener);
server.listen (port, host, () => {
    console.log (`Server is running on http://${host}:${port}`);
});
