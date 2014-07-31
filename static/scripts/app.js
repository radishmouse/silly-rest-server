'use strict';

var SERVER_URL = "/api/creatures";

$.post(SERVER_URL, {
    name: "thinger" + (new Date()).getTime(),
    type: "lolcat",
    location: "here",
    witnesses: 10,
    date: (new Date())

}, function (resp) {
    console.log(resp);
})

// GET all the things
$.get(SERVER_URL, function (data) {
    console.log(data);
});


