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
var argv = require('yargs').argv;

gameOf.yml.setYmlPath(__dirname + '/config/config.yml');
gameOf.setModulesPath(__dirname + '/node_modules/');

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

            if (table == 'users') {
              json_content[key].pass = gameOf.users.encryptPassword(json_content[key].pass);
            }

            db.invokeCallback(db.insert.bind(null, table, json_content[key]));
          }
        }

        gutil.log(util.format('The data for %s is in.', table).green);
      });

      return true;
    });
  });
});

gulp.task('user:create', function() {
  if (argv.name == null || argv.pass == null) {
    throw new Error('Username, password are missing from the command.');
  }

  argv.mail = argv.mail || 'demo@example.com';

  gameOf.users.createUser({
    name: argv.name,
    pass: gameOf.users.encryptPassword(argv.pass),
    mail: argv.mail
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
