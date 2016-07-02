var expect  = require('chai').expect,
    miraze  = require("../src/miraze"),
    fixture = require("./support/fixture"),
    request = require('supertest'),
    fs      = require("fs"),
    app;

describe('Mirage', function() {
  beforeEach(function(){
    app = miraze.create();
  });

  it('[templating] should add request header in template scope', function (done) {
    var sample = fixture.sample("templating");

    app.get("/templating")
        .sendFile(sample.templatePath());


    request(app.app)
        .get("/templating", "")
        .expect("Content-Type", /json/)
        .expect(200)
        .end(function(err, res) {
          expect(!!err).to.equal(false);
          expect(res.body).to.eql(sample.responseBody());
          done();
        });
  });

  it('[request-header] should add request header in template scope', function (done) {
    var sample = fixture.sample("request-header"),
        expectedHeader = 'some-header-from-request';;

    app.get("/request-header")
        .sendFile(sample.templatePath());


    request(app.app)
        .get("/request-header", "")
        .set("my-header", expectedHeader)
        .expect("Content-Type", /json/)
        .expect(200)
        .end(function(err, res) {
          expect(!!err).to.equal(false);
          expect(res.header["my-header"]).to.equal(expectedHeader);
          done();
        });
  });

  it('[request-body] should add request body in template scope', function (done) {
    var sample = fixture.sample("request-body");

    app.post("/request")
        .sendFile(sample.templatePath());

    request(app.app)
        .post("/request")
        .send(sample.requestBody())
        .expect("Content-Type", /json/)
        .expect(200)
        .end(function(err, res) {
          expect(!!err).to.equal(false);
          expect(res.body).to.eql(sample.responseBody());
          done();
        });
  });

  it('[path-parameter] should add path params to template scope', function (done) {
    var sample = fixture.sample("path-param");

    app.get("/user/:id")
        .sendFile(sample.templatePath());

    request(app.app)
        .get("/user/1001001")
        .expect("Content-Type", /json/)
        .expect(200)
        .end(function(err, res) {
          expect(!!err).to.equal(false);
          expect(res.body).to.eql(sample.responseBody());
          done();
        });
  });

  it('[url-parameter] should add url params to template scope', function (done) {
    var sample = fixture.sample("url-param");

    app.get("/url-param")
        .sendFile(sample.templatePath());

    request(app.app)
        .get("/url-param?search=who wat that&page=1&size=10")
        .expect("Content-Type", /json/)
        .expect(200)
        .end(function(err, res) {
          expect(!!err).to.equal(false);
          expect(res.body).to.eql(sample.responseBody());
          done();
        });
  });

  it('[controller] should support returning data from controller', function (done) {
    var controller = fixture.sample("controller");
    app.get("/controller")
        .sendFile(controller.templatePath())
        .controller(function(scope){
          scope.message = "Controllified !";
        });
    request(app.app)
        .get("/controller")
        .expect("Content-Type", /json/)
        .expect(200)
        .end(function(err, res) {
          expect(!!err).to.equal(false);
          expect(res.body).to.eql(controller.responseBody());
          done();
        });
  });

  describe('InBuilt Directives', function() {
    it('[repeater] should support @repeat directive', function (done) {
      var repeater = fixture.sample("repeater");
      app.get("/repeater").sendFile(repeater.templatePath());

      request(app.app)
          .get("/repeater")
          .expect("Content-Type", /json/)
          .expect(200)
          .end(function(err, res) {
            expect(!!err).to.equal(false);
            expect(res.body).to.eql(repeater.responseBody());
            done();
          });
    });

    it('[include json] should include json template', function (done) {
      var repeater = fixture.sample("include");
      app.get("/include").sendFile(repeater.templatePath());

      request(app.app)
          .get("/include")
          .expect("Content-Type", /json/)
          .expect(200)
          .end(function(err, res) {
            expect(!!err).to.equal(false);
            expect(res.body).to.eql(repeater.responseBody());
            done();
          });
    });
  });

  describe('app.directive', function() {
    it('should user directive to parse temlpates', function (done) {
      var sample = fixture.sample("directive");
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

      request(app.app)
          .get("/directive")
          .expect("Content-Type", /json/)
          .expect(200)
          .end(function(err, res) {
            expect(!!err).to.equal(false);
            expect(res.body).to.eql(sample.responseBody());
            done();
          });
    })})

  describe.skip('SSL', function() {
    it('should accept ssl requests', function (done) {
      var sample = fixture.sample("https");

      app.https()
          .get("/secured/user")
         .sendFile(sample.templatePath());

      var agent = request.agent(app.app);
      request.agent(app.app)
          .get("/blabla")
          .ca(fs.readFileSync('test/fixtures/ssl/client.crt'))
          .expect(200)
          .end(function(err, res) {
            expect(!!err).to.equal(true);
            expect(res.body).to.eql(sample.responseBody());
            done();
          });

    });
  });
});