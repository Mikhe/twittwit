var Backbone = require('backbone');
var twitModel = require('../models/twit');

var twitCollection = Backbone.Collection.extend({
  model: twitModel,
  
  localStorage: new Backbone.LocalStorage("twits"),
  
  initialize: function() {
    this.on('all', function(e, model, collection) {
      if (e == "add") {
        this.sync("create", model);
      } else if (e == "change:text") {  
        this.sync("update", model);
      } else if (e == "remove") {
        this.sync("delete", model);
      } 
    });
  }
});


module.exports = twitCollection;