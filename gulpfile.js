var gulp        = require('gulp');
var jsmin       = require('gulp-jsmin');
var rename      = require('gulp-rename');
var concat      = require('gulp-concat');
var karma       = require('gulp-karma');
var sass        = require('gulp-sass');
var minifyCss   = require('gulp-minify-css');
var concatCss   = require('gulp-concat-css');
var rename      = require('gulp-rename');
var del         = require('del');



gulp.task('default', ['copy-content', 'copy-lib','minify', 'scss-convert'], function(){

});

gulp.task('watch', ['test-watch'], function() {
  gulp.watch('src/js/**/*.js', ['minify']);
  gulp.watch('src/styles/**/*.scss', ['scss-convert']);
  gulp.watch('src/index.html', ['copy-content']);
});

gulp.task('clear-dist-js', function() {
  del([
    'dist/js'
  ]);
});

gulp.task('minify', ['clear-dist-js'], function() {

  gulp.src('src/**/*.js')
    .pipe(concat('ng-d3.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(jsmin())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('clear-dist-styles', function() {
  del([
    'dist/styles'
  ]);
});

gulp.task('scss-convert', ['clear-dist-styles'], function() {

  gulp.src('src/styles/**/*.scss')
    .pipe(sass( { errLogToConsole: true } ))
    .pipe(gulp.dest('dist/styles/_raw'))
    .pipe(concatCss("ng-d3.css"))
    .pipe(gulp.dest('dist/styles'))
    .pipe(minifyCss())
    .pipe(rename('ng-d3.min.css'))
    .pipe(gulp.dest('dist/styles'));

});

gulp.task('clear-index', function() {
  del([
    'dist/index.html'
  ]);
});

gulp.task('copy-content', ['clear-index'], function() {
  gulp.src('src/index.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('clear-lib', function() {
  del([
    'dist/js/lib'
  ]);
});

gulp.task('copy-lib', ['clear-lib'], function() {
  gulp.src('bower_components/**/*.min.js')
    .pipe(gulp.dest('dist/js/lib'));
});
