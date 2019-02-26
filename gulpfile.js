let gulp = require('gulp');
let imagemin = require('gulp-imagemin');
let clean = require('gulp-clean');
let concat = require('gulp-concat');
let htmlReplace = require('gulp-html-replace');
let uglify = require('gulp-uglify');

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

async function buildJs(){
    await gulp.src([
        'dist/js/jquery.js',
        'dist/js/home.js',
        'dist/js/produto.js'
    ])
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
}

async function buildHtml(){
    await gulp.src('dist/**/*.html')
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

