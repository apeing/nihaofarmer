/**
 * Created by Administrator on 2017/9/6.
 */
var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var concat = require('gulp-concat');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var cleanCss = require('gulp-clean-css');
var rev = require('gulp-rev');
var cheerio = require('gulp-cheerio');

//合并js文件
gulp.task("concatJs",function(){
    // 把1.js和2.js合并为main.js，输出到dest/js目录下
    var options = {
        collapseWhitespace: true,//压缩HTML
        minifyJS: true,//压缩页面JS
    };
    gulp.src('public/wechat/activity/script/**/*.js').pipe(concat('main.js')).pipe(gulp.dest('public/dist/js'));
});
//合并js文件
gulp.task("concatJs2",function(){
    // 把1.js和2.js合并为main.js，输出到dest/js目录下
    var options = {
        collapseWhitespace: true,//压缩HTML
        minifyJS: true,//压缩页面JS
    };
    gulp.src('public/lib/**/*.js').pipe(concat('main2.js')).pipe(gulp.dest('public/dist/js'));
});


//合并css文件
gulp.task("concatCss",function(){
    // 把1.js和2.js合并为main.js，输出到dest/js目录下
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src('public/wechat/activity/css/**/*.css').pipe(concat('gulpmain.css')).pipe(htmlmin(options)).pipe(gulp.dest('public/wechat/activity/css'));
});

gulp.task('usemin', function() {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    return gulp.src('public/wechat/activity/index.html')
        .pipe(cheerio(function ($) {
            $('link').remove();
            $('head').append('<link rel="stylesheet" href="/wechat/activity/css/gulpmain.css">');
            $('head').append('<link href="//cdn.bootcss.com/angular-loading-bar/0.9.0/loading-bar.min.css" rel="stylesheet">');
            $('head').append('<link rel="stylesheet" href="../../lib/photoswipe/dist/photoswipe.css">');
            $('head').append('<link rel="stylesheet" href="../../lib/photoswipe/dist/default-skin/default-skin.css">');

        })).pipe(htmlmin(options))
        .pipe(gulp.dest('build/'));
});
//合并js文件
gulp.task("taskName",function(){
    // 把1.js和2.js合并为main.js，输出到dest/js目录下
    gulp.src('public/wechat/activity/script/service/*.js').pipe(concat('main.js')).pipe(gulp.dest('public/wechat/activity/html/js'));
});

//压缩html文件
gulp.task('testHtmlmin', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src('public/wechat/activity/index.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('public/wechat/activity/html'));
});

//压缩js文件
gulp.task('testJs', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src('public/wechat/activity/script/**/*.js')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('public/dist/ys'));
});
gulp.task('testJs2', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src('public/lib/nightshade-js-lib/angular-share-module/**/*.js')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('public/dist/ys'));
});

gulp.task('jsmin', function () {
    gulp.src('public/lib/nightshade-js-lib/http/http.js')
        .pipe(uglify({
            mangle: true,//类型：Boolean 默认：true 是否修改变量名
            compress: true,//类型：Boolean 默认：true 是否完全压缩
            preserveComments: 'all' //保留所有注释
        }))
        .pipe(gulp.dest('dist/js'));
});