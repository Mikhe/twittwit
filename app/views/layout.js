var Marionette = require('backbone.marionette');

var FormView = require('./form');
var ListView = require('./list');

var Layout = Marionette.View.extend({
  el: '#app-hook',

  template: require('../templates/layout.html'),

  regions: {
    form: '.form',
    list: '.list'
  },
  
  events: {
    'click #btn-filter':  'filter'
  },
  
  ui: {
    search: '#id_search',
    taglist: "#tag_options"
  },
  
  filter: function() {
    var tag =  (this.getUI('search').val().trim() || '').replace("#", "");
    
    if (tag) {
      this.listView.setFilter(function (child, index) {
        return child.get('tag') == tag;
      });
    } else {
      this.listView.removeFilter();
    }
    this.listView.render();  
  },

  onShow: function() {
    var formView = new FormView({model: this.model});
    var listView = new ListView({collection: this.collection});
    var ds = this.getUI('taglist');

    this.listView = listView;
    _.without(_.uniq(this.collection.pluck("tag")), "").forEach(function(t){
      ds.append($('<option>').attr("value", t));
    });
    this.showChildView('form', formView);
    this.showChildView('list', listView);
  },

  onChildviewAddTwit: function(child) {
    var txt = child.ui.text.val()||"";
    var _model = this.listView.createModel(txt);
    this.model.set(_model, { validate: true });
    if (!this.model.validationError) {
        this.listView.addTwit(_model);
    }
  }
});

module.exports = Layout;