require("./setup.js");

var Marionette = require('backbone.marionette');
var twitView = require('./views/layout');
var twitModel = require('./models/twit');
var twitCollection = require('./collections/twitCollection');

var app = new Marionette.Application({
  onStart: function() {
    var TwitList = new twitView({
      collection: new twitCollection(),
      model: new twitModel()
    });
    
    TwitList.collection.fetch();
    TwitList.render();
    TwitList.triggerMethod('show');
  }
});

app.start();