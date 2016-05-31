var fs        = require("fs");

var sendFile = function (path, compile) {
      return {
        path: path,
        send: function (req, res, scope) {
          var template    = JSON.parse(fs.readFileSync(this.path)),
              parsed      = compile(scope, template),
              headers     = parsed.headers,
              responseBody= parsed.body;

          for(var header in headers){
            res.set(header, headers[header]);
          }
          return res.status(200).json(responseBody);
        }
      };
    };

module.exports = sendFile;