var Marionette = require('backbone.marionette');

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
  
  addTwit: function(m) {
    this.collection.add(m);
  },
  
  onChildviewEditTwit: function(child) {
    //checking state
    var ta = child.$el.find("textarea");
    if (ta.length) {
      //if after edit
      var txt = ta.val();
      if (txt) {
        //child.model.set(this.createModel(txt), {validate: true});
        child.model.set(child.model.createModel(txt), {validate: true});
        if (!child.model.validationError && child.model.hasChanged("text")) {
          child.model.collection.set(child.model, {remove: false});
        }  
      }
      child.render();
    } else {
      //if before edit
      child.$el.find("#btn-edit").text("save");
      child.$el.find(".twit-text").replaceWith($("<textarea></>").val(child.model.get("text")));
    }  
  }
});


module.exports = twitList;