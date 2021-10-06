function timer () {
    return new Promise (fn_resolve => setTimeout (fn_resolve, 1000));
}


(async () => { 
    var p = timer ();
    console.log ('begin await'); 
    console.log (p);
    await p; 
    console.log (p);
    console.log ('end await'); 
})();

console.log ('done');
