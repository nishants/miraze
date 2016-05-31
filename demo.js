var miraze = require("./src/miraze").create();

miraze.post("/create").sendFile("../sample/create.json");
miraze.get("/get/:id").sendFile("../sample/request-path-param.json");
miraze.get("/params").sendFile("../sample/request-url-param.json");
miraze.get("/hello").sendFile("../sample/hello.json");
miraze.post("/repeater").sendFile("../sample/repeater-indline.json");

miraze.get("/check").sendFile("../sample/nested-repeater.json").controller(function(scope){
  scope.list = [["a1", "a2", "a3"],["b1", "b2", "b3"], ["c1", "c2", "c3"]];
});

miraze.get("/samples/hello").sendFile("../sample/hello/template.json");
miraze.post("/samples/request").sendFile("../sample/request/template.json");
miraze.post("/mirror").sendFile("../sample/mirror/template.json");

miraze.get("/samples/controller")
    .sendFile("../sample/controller/template.json")
    .controller(function(scope){
      scope.message = "Controllified !";
    });

miraze.get("/samples/repeater")
    .sendFile("../sample/repeater/template.json");

miraze.app.listen(3001, function () {
  console.log('Example app listening on port 3000!');
});


miraze.get("/samples/paths/one").sendFile("../sample/paths/one.json");
miraze.get("/samples/paths/two").sendFile("../sample/paths/two.json");
miraze.get("/samples/paths/:id").sendFile("../sample/paths/any.json");

