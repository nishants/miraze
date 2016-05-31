var fs = require("fs");

var pathFor = function(dir, file){
  return "sample/<dir>/<file>"
      .replace("<dir>", dir)
      .replace("<file>", file);
}, read = function(path){
  return fs.readFileSync(path) ;
};

module.exports = {
  sample: function (name) {
    return {
      templatePath: function(){return pathFor(name, "template.json");},
      requestBody : function(){return JSON.parse(read(pathFor(name, "request.json")));},
      responseBody: function(){return JSON.parse(read(pathFor(name, "response.json")));},
      script      : function(){return read(pathFor(name, "script.js"));}
    };
  }
}