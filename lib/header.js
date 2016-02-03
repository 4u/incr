
module.exports = Header;

function Header(requires) {
  this.requires = (requires || []).slice();
  this.name = '';
}

Header.prototype.filter = function(name, text) {
  if (this[name + 'Filter']) {
    this[name + 'Filter'](text);
    return true;
  }
  return false;
};

Header.prototype.provideFilter = function(text) {
  text = text.trim();
  if (!text) {
    return;
  }

  if (this.name) {
    throw new Error('Name for this file already declared');
  }

  this.name = text.trim();
};

Header.prototype.requireFilter = function(text) {
  text.split('\n').forEach(function(value) {
    value = value.trim();
    if (value) {
      this.requires.push(value);
    }
  }, this);
};

Header.prototype.toBuffer = function() {
  if (!this.name) {
    throw new Error('Undeclared provide');
  }

  var result = ['goog.provide("' + this.name + '");'];
  this.requires.filter(function(req, pos, arr) {
    return arr.indexOf(req) === pos;
  }).forEach(function(req, index) {
    if (index === 0) {
      result.push('');
    }
    result.push('goog.require("' + req + '");');
  });
  
  return result;
};
