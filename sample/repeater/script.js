var miraze = require("./src/miraze");

var app  = miraze.create();
app.get("/repeater").sendFile("sample/repeater/template.json");
