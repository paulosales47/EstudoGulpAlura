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
let autoprefixer = require('gulp-autoprefixer');
let less = require('gulp-less');

function clearDist(){
    return gulp.src('dist/**.*', {read: false})
    .pipe(clean());
}

function copy(){
    return gulp.src('src/**/*')
        .pipe(gulp.dest('dist'));
}

function buildLess(){
    return gulp.src("src/less/*.less")
    .pipe(less())
    .pipe(gulp.dest("src/css"));
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
        'css': [autoprefixer, cssmin]
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

    gulp.watch("src/less/*.less").on('change', function(path){
        gulp.src(path.replace(/\\/g, '/'))
        .pipe(less().on('error', function(error){
            console.log(error);
        }))
        .pipe(gulp.dest('src/css'));
    });
}

exports.default =
     gulp.series(
        clearDist, 
        buildLess,
        copy, 
    gulp.parallel(
        buildImg,
        buildResources
    ));

exports.server = gulp.series(server);