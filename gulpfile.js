var gulp = require("gulp");
// 压缩css
var minifycss = require("gulp-minify-css");
// 让uglify能够对es6语法进行解析
var babel = require("gulp-babel");
// 压缩js
var uglify = require("gulp-uglify");
// 压缩html
var htmlmin = require("gulp-htmlmin");
// 清理html
var htmlclean = require("gulp-htmlclean");
// 压缩图片
var imageMin = require("gulp-imagemin");
// 删除文件
var del = require('del');
//异步执行组件
var runSequence = require('run-sequence');

// 初始化hexo
var H = require('hexo');
var hexo = new H(process.cwd(), {});


// ============================================================
// 清除public文件夹
gulp.task('clean', function () {
  return del(['public/**/*']);
});


// ============================================================
// hexo操作-创建静态页面 （等同 hexo generate）
gulp.task('generate', function () {
  return hexo.init().then(function () {
    return hexo.call('generate', {
      watch: false
    }).then(function () {
      return hexo.exit();
    }).catch(function (err) {
      return hexo.exit(err);
    });
  });
});


// ============================================================
// hexo操作-启动Hexo服务器
gulp.task('server', function () {
  return hexo.init().then(function () {
    return hexo.call('server', {});
  }).catch(function (err) {
    console.log(err);
  });
});


// ============================================================
// 压缩 public 目录 css
gulp.task("minify-css", function () {
  let option = {
    rebase: false,
    //类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
    //advanced: true,
    //保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
    compatibility: 'ie7',
    //类型：Boolean 默认：false [是否保留换行]
    //keepBreaks: true,
    //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
    //keepSpecialComments: '*'
  }
  return gulp
    .src("./public/**/*.css")
    .pipe(minifycss(option))
    .pipe(gulp.dest("./public"));
});


// ============================================================
// 压缩 public 目录 html
gulp.task("minify-html", function () {
  let cleanOptions = {
    protect: /<\!--%fooTemplate\b.*?%-->/g, //忽略处理
    unprotect: /<script [^>]*\btype="text\/x-handlebars-template"[\s\S]+?<\/script>/ig //特殊处理
  }
  let minOption = {
    //压缩HTML
    collapseWhitespace: true,
    //省略布尔属性的值  <input checked="true"/> ==> <input />
    collapseBooleanAttributes: true,
    //删除所有空格作属性值    <input id="" /> ==> <input />
    removeEmptyAttributes: true,
    //删除<script>的type="text/javascript"
    removeScriptTypeAttributes: true,
    //删除<style>和<link>的type="text/css"
    removeStyleLinkTypeAttributes: true,
    //清除HTML注释
    removeComments: true,
    //压缩页面JS
    minifyJS: true,
    //压缩页面CSS
    minifyCSS: true,
    //替换页面URL
    minifyURLs: true
  };
  return gulp
    .src("./public/**/*.html")
    .pipe(htmlclean(cleanOptions))
    .pipe(htmlmin(minOption))
    .pipe(gulp.dest("./public"));
});


// ============================================================
// 压缩 public/js 目录 js
gulp.task("minify-js", function () {
  let option = {
    //是否保留所有注释
    // preserveComments: 'all',
    //是否修改变量名
    mangle: true,
    //是否完全压缩
    compress: true
  }
  return gulp
    .src("./public/**/*.js")
    .pipe(
      babel({
        presets: ["@babel/env"]
      })
    )
    .pipe(uglify(option))
    .pipe(gulp.dest("./public"));
});


// ============================================================
// 压缩图片
gulp.task("minify-images", function () {
  let option = {
    //类型：Number  默认：3  取值范围：0-7（优化等级）
    optimizationLevel: 5,
    //类型：Boolean 默认：false 无损压缩jpg图片
    progressive: true,
    //类型：Boolean 默认：false 隔行扫描gif进行渲染
    interlaced: false,
    //类型：Boolean 默认：false 多次优化svg直到完全优化
    multipass: false
  }
  return gulp
    .src("./public/**/*.{png,jpg,gif,ico,svg}")
    .pipe(imageMin(option))
    .pipe(gulp.dest("./public"));
});


// ============================================================
// 用run-sequence并发执行，同时处理html，css，js，img
// TODO:由于gulp版本问题，执行这段操作会报错：TypeError: gulp.hasTask is not a function
gulp.task('compress', function (cb) {
  runSequence.options.ignoreUndefinedTasks = true;
  runSequence(['minify-html', 'minify-css', 'minify-js', 'minify-images'], cb);
});


// ============================================================
// 执行顺序： 清除public目录 -> 产生原始博客内容 -> 执行压缩混淆 -> 启动本地服务器
// TODO:由于gulp版本问题，执行这段操作会报错：TypeError: gulp.hasTask is not a function
gulp.task('build', function (cb) {
  runSequence.options.ignoreUndefinedTasks = true;
  runSequence('clean', 'generate', 'compress', 'server', cb);
});


// ============================================================
// 执行 min 命令时执行的任务
gulp.task("min",
  gulp.series("minify-css", "minify-html", "minify-js", "minify-images")
);


// ============================================================
// 执行 gulp 命令时执行的任务
gulp.task("default",
  gulp.series("clean", "generate", "min")
);


// ============================================================
// 执行 gulp 命令时执行的任务
// TODO:由于gulp版本问题，执行这段操作会报错：TypeError: gulp.hasTask is not a function
// gulp.task("default", function (cb) {
//   runSequence.options.ignoreUndefinedTasks = true;
//   runSequence('clean', 'generate', 'min', 'server', cb);
// });