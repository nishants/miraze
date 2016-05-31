app.get("/directive")
    .sendFile("./sample/directive/template.json")
    .controller(function(scope){
      scope.param = "found";
    });

app.directive("@foo", {
  link: function(scope, body, param, compile){
    return compile(scope, {
      child: "{{param}}",
      "@bar": "bar-param",
    });
  }
});

app.directive("@bar", {
  link: function(scope, body, param){
    body.otherChild = "bar";
  }
});