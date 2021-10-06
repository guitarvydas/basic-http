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
}

atimer ();
console.log ('done');
