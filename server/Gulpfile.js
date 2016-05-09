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
});

gulp.task('reinstall-db', function() {
});

gulp.task('add-question', function() {

});

//Watch task
gulp.task('default',function() {
  gulp.watch('front/sass/**/*.scss',['front/styles']);
});

gulp.task('deploy', function() {
  return gulp.src('./front/**/*')
    .pipe(ghPages());
});
