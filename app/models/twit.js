var Backbone = require('backbone');

var twit = Backbone.Model.extend({
  defaults: {
    text: '',
    tags: []
  },
  
  createModel: function(txt) {
    //fill model attributes
    var _match = txt.match(/#(\w|\d)+/g);
    return {
      text: txt,
      tags: _match ? _match.map(function(m) {
        return m.substr(1);
      }) : []
    }
  },

  validate: function(attrs) {
      var errors = {};
      if (!attrs.text || typeof attrs.text != "string") errors.text = 'text must be set';
      if (!attrs.tags || !_.isArray(attrs.tags)) errors.tags = 'tags must be an array';
      if (Object.keys(errors).length) return errors;
  }
});


module.exports = twit;