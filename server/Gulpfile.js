require('colors');
var gulp = require('gulp');
var sass = require('gulp-sass');
var gutil = require('gulp-util');
var ghPages = require('gulp-gh-pages');
var fs = require('fs');
var gameOf = require('./modules/modules');
var db = gameOf.db;
var path = require('path');
var util = require('util');
gameOf.yml.setYmlPath(__dirname + '/config/config.yml');

gulp.task('styles', function() {
  gulp.src('front/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./front/css/'))
});

gulp.task('migrate:database', function() {
  gutil.log('Create the DB first!'.yellow);
  db.invokeCallback(db.dbCreate).then(function() {
    gutil.log('The DB has created'.green);
  });
});

gulp.task('migrate:tables', function() {
  gutil.log('Start to create tables'.rainbow);

  // Iterate over the files.
  fs.readdir(__dirname + '/dummy_json', function(err, files) {

    files.every(function(element, index) {

      var table = path.basename(element, '.json');

      // Create table.
      db.invokeCallback(db.tableCreate.bind(null, table)).then(function() {
        gutil.log(util.format('The table %s has created. Cool!', table).green);
      });

      return true;
    });
  });
});

gulp.task('migrate:content', function() {
  gutil.log('Start to migrate content'.rainbow);

  fs.readdir(__dirname + '/dummy_json', function(err, files) {

    files.every(function (element, index) {

      fs.readFile(__dirname + '/dummy_json/' + element, 'utf8', function (err, data) {
        if (err) {
          throw err;
        }

        var table = path.basename(element, '.json');

        gutil.log(util.format('Importing the data for %s', table).yellow);

        var json_content = JSON.parse(data);

        for (var key in json_content) {
          if (json_content.hasOwnProperty(key)) {
            db.invokeCallback(db.insert.bind(null, table, json_content[key]));
          }
        }

        gutil.log(util.format('The data for %s is in.', table).green);
      });

      return true;
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
