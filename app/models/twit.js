var Backbone = require('backbone');

var twit = Backbone.Model.extend({
  defaults: {
    text: '',
    tags: []
  },

  validate: function(attrs) {
      var errors = {};
      if (!attrs.text || typeof attrs.text != "string") errors.text = 'text must be set';
      if (!attrs.tags || !_.isArray(attrs.tags)) errors.tags = 'tags must be an array';
      if (Object.keys(errors).length) return errors;
  }
});


module.exports = twit;