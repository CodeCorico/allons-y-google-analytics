'use strict';

module.exports = function($allonsy, $gulp) {

  $gulp.task('google-analytics', function(done) {
    var through = require('through2'),
        path = require('path'),
        files = [];

    $gulp
      .src(path.join(__dirname, 'analytics-index.js'))
      .pipe(through.obj(function(file, encoding, throughDone) {
        files.push(file);

        throughDone();
      }, function(throughDone) {
        var transform = this;

        files.forEach(function(file) {
          file.contents = new Buffer(file.contents
            .toString()
            .replace(
              /{{GOOGLE_ANALYTICS_ID}}/g,
              process.env.GOOGLE_ANALYTICS_ID && process.env.GOOGLE_ANALYTICS_ID || ''
            )
          );

          transform.push(file);
        });

        throughDone();

        transform.emit('end');
      }))
      .pipe($gulp.dist('google-analytics'))
      .on('end', done);
  });

  return 'google-analytics';
};
