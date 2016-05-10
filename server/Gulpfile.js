var gulp = require('gulp');
var sass = require('gulp-sass');
var gutil = require('gulp-util');
require('colors');
var ghPages = require('gulp-gh-pages');

gulp.task('styles', function() {
  gulp.src('front/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./front/css/'))
});

gulp.task('migration', function() {
  var gameOf = require('./modules/modules');
  var db = gameOf.db;
  var fs = require('fs');
  var path = require('path');
  var _ = require('underscore');


  gameOf.yml.setYmlPath(__dirname + '/config/config.yml');

  gutil.log('Hi there! migration is starting'.rainbow);

  gutil.log('Start by creating tables'.yellow);

  // Iterate over the files.
  fs.readdir(__dirname + '/dummy_json', function(err, files) {

    files.forEach(function(element, index) {

      var file_content = fs.readFileSync(__dirname + '/dummy_json/' + element, 'utf8');
      var json_content = JSON.parse(JSON.stringify(file_content));

      json_content.forEach(function(element) {
        console.log(element);
      });
      return;
      // Create table.
      // db.invokeCallback(db.tableCreate.bind(null, path.basename(element, '.json')))
      //   .then(function() {
      //
      //     gutil.log('Tables are injected. Cool!'.green);
      //
      //     gutil.log('Importing the data'.yellow);
      //     gutil.log('All the data is in. Cool!'.green);
      //
      //     gutil.log('We have the data in.'.rainbow);
      //   });
    });
  });
});

//Watch task
gulp.task('default',function() {
  gulp.watch('front/sass/**/*.scss',['front/styles']);
});

gulp.task('deploy', function() {
  return gulp.src('./front/**/*')
    .pipe(ghPages());
});
