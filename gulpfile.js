var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    connect = require('gulp-connect');;

gulp.task('lint', function() {
    return gulp.src('polaroidweb.js')
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

gulp.task('compress', function() {
    return gulp.src('polaroidweb.js')
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist'));
});

gulp.task('connect', function() {
    return connect.server();
});

gulp.task('default', function() {
    gulp.start('lint', 'compress');
});