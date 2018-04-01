const gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var gutil = require('gulp-util');
// var colors = require('colors');  
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var LessAutoprefix = require('less-plugin-autoprefix');
var cleancss = require('gulp-clean-css');
var del = require('delete'); 
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var autoprefix = new LessAutoprefix({
  browsers: ['last 2 versions']
});

//js处理
gulp.task('js',function(){
    return gulp.src('./src/js/*.js')
    .pipe(uglify({
        //
    })).on('error',errorhandling)
    .pipe(gulp.dest('./public/js'))
})
//css压缩
gulp.task('copy',['less'],function(){
    return gulp.src(['./public/css/*.css','!./src/css/reset.css'])
    .pipe(gulp.dest('./public/css/'))
})
//处理less
gulp.task('less', function () {
  return gulp.src(['./src/less/*.less','!./src/less/_*.less'])
    .pipe(sourcemaps.init())
    .pipe(less({
        plugins:[autoprefix]
    })).on('error', errorhandling)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./public/css'));
});

//实时刷新
gulp.task('server',['copy'],function(){
    browserSync.init({
        server:{
            baseDir:'./public'
        }
    });
    gulp.watch('./src/less/*.less', ['copy']);
    gulp.watch(['./public/css/*.css','./public/*.html']).on('change',reload);
})
function errorhandling(err) {
  gutil.log(gutil.colors.red(err))
  this.end();
}