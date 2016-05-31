var mirage = require("./src/mirage").create();

mirage.post("/create").sendFile("../sample/create.json");
mirage.get("/get/:id").sendFile("../sample/request-path-param.json");
mirage.get("/params").sendFile("../sample/request-url-param.json");
mirage.get("/hello").sendFile("../sample/hello.json");
mirage.post("/repeater").sendFile("../sample/repeater-indline.json");

mirage.get("/check").sendFile("../sample/nested-repeater.json").controller(function(scope){
  scope.list = [["a1", "a2", "a3"],["b1", "b2", "b3"], ["c1", "c2", "c3"]];
});

mirage.get("/samples/hello").sendFile("../sample/hello/template.json");
mirage.post("/samples/request").sendFile("../sample/request/template.json");
mirage.post("/mirror").sendFile("../sample/mirror/template.json");

mirage.get("/samples/controller")
    .sendFile("../sample/controller/template.json")
    .controller(function(scope){
      scope.message = "Controllified !";
    });

mirage.get("/samples/repeater")
    .sendFile("../sample/repeater/template.json");

mirage.app.listen(3001, function () {
  console.log('Example app listening on port 3000!');
});


mirage.get("/samples/paths/one").sendFile("../sample/paths/one.json");
mirage.get("/samples/paths/two").sendFile("../sample/paths/two.json");
mirage.get("/samples/paths/:id").sendFile("../sample/paths/any.json");

