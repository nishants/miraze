var miraze = require("./src/miraze").create();

miraze.get("/samples/controller")
    .sendFile("../sample/controller/template.json")
    .controller(function(scope){
      scope.message = "Controllified !";
    });
