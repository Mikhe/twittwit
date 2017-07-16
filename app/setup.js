window._ = require('underscore'); // Backbone can't see it otherwise
window.JQuery = require('jquery')
window.$ = window.JQuery

var Backbone = require('backbone');
Backbone.$ = window.$; // Use the jQuery from the script tag
Backbone.Marionette = require('backbone.marionette');
Backbone.localStorage = require('backbone.localstorage');