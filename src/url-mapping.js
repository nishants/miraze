var sendFile    = require("./send-file"),
    controllers = require("./controllers");

module.exports  = {
  create: function(compile){
    return {
      _action     : null,
      _controller : null,
      service: function(){
        var self = this;
        return function(req, res){
          (self._controller || controllers.none()).service(req, res, self._action);
        }
      },
      sendFile: function(path){
        this._action = sendFile(path, compile);
        return this;
      },
      controller: function(controller){
        this._controller = controllers.create(controller);
        return this;
      }
    };
  }
}