var mirage = require("./src/mirage");

var app  = mirage.create();
app.get("/repeater").sendFile("sample/repeater/template.json");
