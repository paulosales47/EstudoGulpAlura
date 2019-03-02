let gulp = require('gulp');
let imagemin = require('gulp-imagemin');
let clean = require('gulp-clean');
let uglify = require('gulp-uglify');
let usemin = require('gulp-usemin');
let cssmin = require('gulp-cssmin');
let browserSync = require('browser-sync');
let jshint = require('gulp-jshint');
let jshintStylish = require('jshint-stylish');
let cssLint = require('gulp-csslint');

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

function server(){
    browserSync.init({
        server: { baseDir: 'src'}
    });
    gulp.watch('src/**/*').on('change', browserSync.reload);

    gulp.watch("src/js/*.js").on('change', function(path){
        gulp.src(path)
        .pipe(jshint())
        .pipe(jshint.reporter(jshintStylish));
    });

    gulp.watch("src/css/*.css").on('change', function(path){
        gulp.src(path)
        .pipe(cssLint())
        .pipe(cssLint.formatter());
    });
}

exports.default =
     gulp.series(
        clearDist, 
        copy, 
    gulp.parallel(
        buildImg,
        buildResources
    ));

exports.server = gulp.series(server);
