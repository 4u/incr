var path = require('path');
var fs = require('fs');
var JadeParser = require('jade/lib/parser.js');
var jade = require('jade/lib/runtime.js');

module.exports = new Parser;

function Parser() {}

Parser.prototype.parse = function(str, filename, options) {
  options = options || {};
  options.filename = options.filename || filename;
  var parser = new JadeParser(str, filename, options);
  return parser.parse();
};
