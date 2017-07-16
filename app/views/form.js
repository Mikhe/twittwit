var Marionette = require('backbone.marionette');

var FormView = Marionette.View.extend({
  tagName: 'form',
  template: require('../templates/form.html'),

  triggers: {
    submit: 'add:twit'
  },

  modelEvents: {
    change: 'render'
  },

  ui: {
    text: '#id_text'
  }
});


module.exports = FormView;