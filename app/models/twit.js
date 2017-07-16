var Backbone = require('backbone');

var twit = Backbone.Model.extend({
  defaults: {
    text: '',
    tag: ''
  },

  validate: function(attrs) {
      var errors = {};
      if (!attrs.text || typeof attrs.text != "string") errors.text = 'text must be set';
      if (Object.keys(errors).length) return errors;
  }
});


module.exports = twit;