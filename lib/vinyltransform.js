var through = require('through2');
var compiler = require('./compiler');
var parser = require('./parser');

module.exports = through.obj(function(file, enc, cb) {
  if (file.isNull()) {
    return cb(null, file);
  }
  if (file.isStream()) {
    this.emit('error', new Error('incr: Streaming not supported'));
  }
  if (file.isBuffer()) {
    try {
      var tokens = parser.parse(file.contents.toString('utf8'), file.path);
      file.contents = new Buffer(compiler.compile(tokens), 'utf8');
    } catch(ex) {
      this.emit('error', ex);
    }
  }

  cb(null, file);
});
