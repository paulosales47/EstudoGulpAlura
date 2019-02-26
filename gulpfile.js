let gulp = require('gulp');
let imagemin = require('gulp-imagemin');
let clean = require('gulp-clean');
let uglify = require('gulp-uglify');
let usemin = require('gulp-usemin');
let cssmin = require('gulp-cssmin');

function clearDist(){
    return gulp.src('dist/**.*', {read: false})
    .pipe(clean());
}

function copy(){
    return gulp.src('src/**/*')
        .pipe(gulp.dest('dist'));
}

async function buildImg(){
    await gulp.src('dist/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
}

async function buildResources(){
    gulp.src('dist/**/*.html')
    .pipe(usemin({
        'js': [uglify],
        'css': [cssmin]
    }))
    .pipe(gulp.dest('dist'))
}

exports.default =
     gulp.series(
        clearDist, 
        copy, 
    gulp.parallel(
        buildImg,
        buildResources
    ));

