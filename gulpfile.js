var gulp        = require('gulp');
var babel       = require("gulp-babel");
var sass        = require('gulp-sass');
var browserSync = require('browser-sync').create();
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

sass.compiler = require('node-sass');

gulp.task("transpile", function () {
    return gulp.src("brt.js")
        .pipe(babel())
        .pipe(gulp.dest("dist/js/brt.js"));
});

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


gulp.task('docs', function(){
    const css = gulp.src('dist/**/*').pipe(gulp.dest('docs/dist'))
    const js = gulp.src('brt.js').pipe(gulp.dest('docs'))
    const html = gulp.src('index.html').pipe(gulp.dest('docs/'))
    return Promise.all([css, js, html])
})
