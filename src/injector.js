var inject = function (definition) {
  var target = definition.splice(definition.length - 1)[0],
      self = this;

  return {
    call: function () {
      var args = [];
      definition.forEach(function (name, index) {
        args[index] = self._injectables[name];
      });
      return target.apply({}, args);
    }
  };
};

module.exports = {
  create: function(){
    return {
      _definitions : {},
      _injectables : {},
      add : function(name, service){
        return this._definitions[name] = service;
      },
      init: function(){
        for(var name in this._definitions){
          this._injectables[name] = this.inject(this._definitions[name]);
        }

        for(var name in this._injectables){
          this._injectables[name] = this._injectables[name].call()
        }
      },
      inject: inject
    };
  }
};