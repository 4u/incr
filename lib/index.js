var path = require('path');
var fs = require('fs');
var parser = require('./parser');
var compiler = require('./compiler');
var vinylTransform = require('./vinyltransform');

compiler.setTemplate('incremental', 'npf.dom.incremental.%s(%s)');
compiler.setTemplate('escape', 'goog.string.htmlEscape(%s)');
compiler.setRequires([
  'npf.dom.incremental',
  'goog.string'
]);

module.exports = {
  parser,
  compiler,
  vinylTransform
};
