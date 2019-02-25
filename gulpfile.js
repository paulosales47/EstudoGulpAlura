let gulp = require('gulp');
let imagemin = require('gulp-imagemin');
let clean = require('gulp-clean');

function cl(){
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

exports.default = gulp.series(cl, copy, buildImg);

