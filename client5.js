//https://stackoverflow.com/questions/38533580/nodejs-how-to-promisify-http-request-reject-got-called-two-times

// server:
// https://www.digitalocean.com/community/tutorials/how-to-create-a-web-server-in-node-js-with-the-http-module

let http = require("http");

function requestAsync(name) {

    return new Promise((resolve, reject) => {
        var post_options = {
            host: 'restcountries.eu',
            port: '80',
            path: `/rest/v2/name/${name}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        let post_req = http.request(post_options, (res) => {
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                resolve(chunk);
            });
            res.on("error", (err) => {
                reject(err);
            });
        });
        post_req.write('test');
        post_req.end();
    });
}

// //Calling request function
// //:1- as promise
// requestAsync("india").then(countryDetails => {
//     console.log(countryDetails);
// }).catch((err) => {
//     console.log(err);  
// }); 

// :2- as await
// let countryDetails = await requestAsync("india");

var r = requestAsync ("india");
console.log (r);
r.then (countryDetails => { console.log ('then'); });
