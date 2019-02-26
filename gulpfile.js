let gulp = require('gulp');
let imagemin = require('gulp-imagemin');
let clean = require('gulp-clean');
let concat = require('gulp-concat');
let htmlReplace = require('gulp-html-replace');

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
    return gulp.src([
        'dist/js/jquery.js',
        'dist/js/home.js',
        'dist/js/produto.js'
    ])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist/js'));
}

function buildHtml(){
    return gulp.src('dist/**/*.html')
        .pipe(htmlReplace({
            js: 'js/all.js'
        }))
        .pipe(gulp.dest('dist'));
}


exports.default =
     gulp.series(
        clearDist, 
        copy, 
    gulp.parallel(
        buildImg,
        buildJs,
        buildHtml
    ));

