var gulp = require('gulp');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var htmlclean = require('gulp-htmlclean');
var imageMin = require('gulp-imagemin');
// 压缩 public 目录 css
gulp.task('minify-css', function () {
  return gulp.src('./public/**/*.css')
    .pipe(minifycss())
    .pipe(gulp.dest('./public'));
});
// 压缩 public 目录 html
gulp.task('minify-html', function () {
  return gulp.src('./public/**/*.html')
    .pipe(htmlclean())
    .pipe(htmlmin({
      removeComments: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,
    }))
    .pipe(gulp.dest('./public'))
});
// 压缩 public/js 目录 js
gulp.task('minify-js', function () {
  return gulp.src('./public/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./public'));
});
// 压缩图片
gulp.task('images', function () {
  return gulp.src('./public/**/*.{png,jpg,gif,ico,svg}')
    .pipe(imageMin({
      progressive: true
    }))
    .pipe(gulp.dest('./public'))
})
// 执行 gulp 命令时执行的任务
gulp.task('default', gulp.series('minify-css', 'minify-html', 'minify-js', 'images'));