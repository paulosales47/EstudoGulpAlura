let gulp = require('gulp');
let imagemin = require('gulp-imagemin');
let clean = require('gulp-clean');
let concat = require('gulp-concat');

function clearDist(){
    return gulp.src('dist/**.*', {read: false})
    .pipe(clean());
}

function copy(){
    return gulp.src('src/**/*')
        .pipe(gulp.dest('dist'));
}

function buildImg(){
    return gulp.src('dist/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
}

function buildJs(){
    return gulp.src('dist/js/**/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist/js'))
}



exports.default =
     gulp.series(
        clearDist, 
        copy, 
    gulp.parallel(
        buildImg,
        buildJs
    ));

