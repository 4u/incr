var gulp = require('gulp');
var rename = require('gulp-rename');
var incr = require('./lib');

gulp.task('default', function() {
  incr.compiler.setTemplate('incremental', 'npf.dom.incremental.%s(%s)');
  incr.compiler.setTemplate('escape', 'goog.string.htmlEscape(%s)');
  incr.compiler.setRequires([
    'npf.dom.incremental',
    'goog.string'
  ]);

  return gulp.src('examples/**/*.jade')
    .pipe(incr.vinylTransform())
    .pipe(rename({ extname: '.jade.js' }))
    .pipe(gulp.dest('build/'));
});
