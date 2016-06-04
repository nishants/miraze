var express     = require('express'),
    mappings    = require('./url-mapping'),
    bodyParser  = require('body-parser'),
    compiler    = require('jso-ng').create();

var compile  = function(scope , template){
  return compiler.compile(scope , template);
};
module.exports  = {
  create: function(){
    var app = express()
    app.use(bodyParser.json());
    return {
      app: app,
      get: function(url){
        var mapping = mappings.create(compile);
        this.app.get(url, mapping.service());
        return mapping;
      },
      post: function(url){
        var mapping = mappings.create(compile);
        this.app.post(url, mapping.service());
        return mapping;
      },
      directive: function(name, definition){
        return compiler.directive(name, definition);
      },
      https: function(){
        return this;
      }
    };
  },
  compile: function(scope , template){
    return compile(scope , template);
  }
}