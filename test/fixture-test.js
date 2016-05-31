var expect  = require('chai').expect,
    fixture = require("./support/fixture"),
    fs      = require("fs");

describe('Mirage', function() {
  it('should read a sample', function (done) {
    var sample = fixture.sample("controller");
    expect(sample.requestBody().name).to.equal("You");
    expect(sample.responseBody().message).to.equal("Controllified !");
    expect(sample.templatePath()).to.equal("sample/controller/template.json");
    done();
  });
});