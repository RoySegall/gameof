require('colors');
var gulp = require('gulp');
var sass = require('gulp-sass');
var gutil = require('gulp-util');
var ghPages = require('gulp-gh-pages');
var fs = require('fs');
var gameOf = require('./modules/modules');
var db = gameOf.db;
var path = require('path');
gameOf.yml.setYmlPath(__dirname + '/config/config.yml');

gulp.task('styles', function() {
  gulp.src('front/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./front/css/'))
});

gulp.task('create_tables', function() {
  gutil.log('Hi there! migration is starting'.rainbow);

  gutil.log('Start by creating tables'.yellow);

  // Iterate over the files.
  fs.readdir(__dirname + '/dummy_json', function(err, files) {

    files.every(function(element, index) {

      var table = path.basename(element, '.json');

      // Create table.
      db.invokeCallback(db.tableCreate.bind(null, table)).then(function() {
        var string = 'The table ' + table + ' are injected. Cool!';
        gutil.log(string.green);
      });

      return true;
    });
  });
});

gulp.task('migrate_content', function() {

  fs.readdir(__dirname + '/dummy_json', function(err, files) {

    files.every(function (element, index) {

      fs.readFile(__dirname + '/dummy_json/' + element, 'utf8', function (err, data) {
        if (err) {
          throw err;
        }

        var table = path.basename(element, '.json');

        var string = 'Importing the data for ' + table;
        gutil.log(string.yellow);

        var json_content = JSON.parse(data);

        for (var key in json_content) {
          if (json_content.hasOwnProperty(key)) {
            var jsonContent = json_content[key];
            db.invokeCallback(db.insert.bind(null, table, jsonContent));
          }
        }

        string = 'The data for ' + table + ' is in.';
        gutil.log(string.green);
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
