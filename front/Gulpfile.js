"use strict";
var gulp    = require('gulp');
var elm     = require('gulp-elm');

// Elm init.
gulp.task('elm-init', elm.init);

/*
 *
 */
gulp.task('elm', ['elm-init'], function(){
  return gulp.src('front/app/*.elm')
    .pipe(elm.make({filetype: 'html'}))
    .pipe(gulp.dest('front/dist/'));
});

/*
 *
 */
gulp.task('elm-bundle', ['elm-init'], function(){
  return gulp.src('front/app/*.elm')
    .pipe(elm.bundle('bundle.js'))
    .pipe(gulp.dest('front/dist/'));
});
