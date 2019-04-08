var gulp        = require('gulp');
var sass        = require('gulp-sass');
var browserSync = require('browser-sync').create();
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

sass.compiler = require('node-sass');
 
gulp.task('sass', function () {
  return gulp.src('./sass/*.scss')
  .pipe(postcss([
      autoprefixer({
          browsers: ['last 4 versions']
      })
  ]))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream())
});

// Static server
gulp.task('start', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch('./sass/*.scss', gulp.parallel('sass'));
});