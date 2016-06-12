var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('styles', function () {
  gulp
  .src('scss/styles.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('css'));
});

gulp.task('upkeep', ['styles'], function () {
  gulp.watch('app.js', function () {
    console.log('The file changed');
  });
  gulp.watch('scss/**/*', ['styles']);
});

gulp.task('default', ['upkeep']);