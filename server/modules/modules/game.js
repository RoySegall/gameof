module.exports = {

  create: function(object) {
    var thinky = module.parent.exports.db.getThinky();
    var type = thinky.type;

    var model = thinky.createModel('game', {
      foo: type.number()
    });

    return new model(object);
  }
  
};