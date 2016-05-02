var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('styles', function() {
  gulp.src('front/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./front/css/'))
});

//Watch task
gulp.task('default',function() {
  gulp.watch('front/sass/**/*.scss',['front/styles']);
});
