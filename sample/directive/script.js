app.get("/directive").controller(function(scope){
  scope.param = "found";
}).sendFile(sample.templatePath());

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
    expect(param).to.equal("bar-param");
  }
});