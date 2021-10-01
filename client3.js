// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#uploading_json_data

//const fetch = require('node-fetch');

fetch ('http://localhost:8000/authors')
    .then (response => response.json ())
    .then (data => console.log (data));
