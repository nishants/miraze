var expect    = require('chai').expect,
    miraze    = require('../src/mirage');

describe('app.directive', function() {
  it('should user directive to parse temlpates', function () {
    var scope    = {param: "found"},
        app       = miraze.create(),
        template = {
          "data" : {
            "fooTarget" : {
              "@foo" : "foo-param"
            }
          }
        },
        result ;

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

    result = miraze.compile(scope, template);
    expect(result.data.fooTarget.child).to.equal("found");
    expect(result.data.fooTarget.otherChild).to.equal("bar");
  })});
