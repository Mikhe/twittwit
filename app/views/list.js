var Marionette = require('backbone.marionette');
var Backbone = require('backbone');

var twit = Marionette.View.extend({
  tagName: 'li',
  template: require('../templates/twit.html'),
  
  triggers: {
    "click #btn-remove" : 'remove:twit',
    "click #btn-edit":    'edit:twit'
  }
});

var twitList = Marionette.CollectionView.extend({
  tagName: 'ul',
  childView: twit,
  
  onChildviewRemoveTwit: function(child) {
    child.model.collection.remove(child.model);
  },
  
  createModel: function(txt) {
    var _match = txt.match(/#(\w|\d)+/g);
    return {
      text: txt,
      tag: _match ? _match[0].substr(1) : ''
    }
  },
  
  addTwit: function(m) {
    this.collection.add(m);
  },
  
  onChildviewEditTwit: function(child) {
    var ta = child.$el.find("textarea");
    if (ta.length) {
      var txt = ta.val();
      if (txt) {
        child.model.set(this.createModel(txt), {validate: true});
        if (!child.model.validationError) {
          child.model.collection.set(child.model, {remove: false});
        }  
      }
      child.render();
    } else {
      child.$el.find(".twit-text").replaceWith($("<textarea></>").val(child.model.get("text")));
    }  
  }
});


module.exports = twitList;