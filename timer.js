function timer () {
    return new Promise (fn_resolve => setTimeout (fn_resolve, 1000));
}


async function atimer () { 
    var p = timer ();
    console.log ('begin await'); 
    console.log (p);
    await p; 
    console.log (p);
    console.log ('end await');
    return 7;
}

var r = atimer ();
console.log ('done');
console.log (r);
(async () => { console.log (await r); })();
(async () => { console.log (await r); })();
