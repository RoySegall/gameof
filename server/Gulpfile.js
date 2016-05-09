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

  gameOf.yml.setYmlPath(__dirname + '/config/config.yml');
  db.invokeCallback(db.tableCreate.bind(null, 'test'));



  gutil.log('Hi there! migration is starting'.rainbow);

  gutil.log('Start by creating tables'.yellow);
  gutil.log('Tables are injected. Cool!'.green);

  gutil.log('Importing the data'.yellow);
  gutil.log('All the data is in. Cool!'.green);

  gutil.log('We have the data in.'.rainbow);
});

//Watch task
gulp.task('default',function() {
  gulp.watch('front/sass/**/*.scss',['front/styles']);
});

gulp.task('deploy', function() {
  return gulp.src('./front/**/*')
    .pipe(ghPages());
});
