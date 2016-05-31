var mirage = require("./src/mirage").create();

mirage.get("/samples/controller")
    .sendFile("../sample/controller/template.json")
    .controller(function(scope){
      scope.message = "Controllified !";
    });
