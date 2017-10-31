hljs.configure({
    tabReplace: 'a',
    classPrefix: 'token-'
});

hljs.initHighlightingOnLoad();

var selects = document.querySelectorAll ('.js-clever');

var cleverVehicle = new Clever (document.getElementById('Amount'), {
    class: 'HolaMundo'
});

//var cleverVehicle = new Clever (document.getElementById('Vehicle'));
/*
var cleverSelect = new Clever (selects[0], {
    data: 'model',
    class: 'MyCustomClass'
});

var cleverSelect = new clever.select (selects[1], {
    data: 'year',
    class: 'MyCustomClass'
});

var cleverSelect = new clever.select (selects[2], {
    class: 'MyCustomClass',
    linked: false
});

var codes = document.querySelectorAll('pre code');*/
//hljs.initHighlightingOnLoad();
