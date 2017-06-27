var gulp = require('gulp'),
    clean = require('gulp-clean'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    minify = require('gulp-minify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    uglifyCss = require('gulp-uglifycss'),
    compass = require('gulp-compass'),
    del = require('del'),
    runSequence = require('run-sequence');

gulp.task('clean', function() {
  return del([
    'dist/**/*'
  ]);
});
gulp.task('build-bower-lib', function() {
  return gulp.src('bower_components/**/*')
    .pipe(gulp.dest('dist/bower_components'));
})
gulp.task('build-root', function() {
  return gulp.src(['index.html','main.js'])
    .pipe(gulp.dest('dist/'));
});
gulp.task('build-images', function() {
  return gulp.src(['images/**'])
    .pipe(gulp.dest('dist/images'));
});
gulp.task('build-fonts', function () {
  return gulp.src('fonts/**')
    .pipe(gulp.dest('dist/fonts'));
});
gulp.task('build-php', function () {
  return gulp.src('php/**')
    .pipe(gulp.dest('dist/php'));
});
gulp.task('build-templates', function () {
  return gulp.src('templates/*.html')
    .pipe(gulp.dest('dist/templates/'));
});
gulp.task('build-sourcejs', function() {
  return gulp.src(['js/*.js'])
    .pipe(concat('cap.js'))
    .pipe(gulp.dest('dist/js'));
});
gulp.task('build-customcss', function() {
  return gulp.src(['css/*.css'])
    .pipe(gulp.dest('dist/css'));
});
gulp.task('compass-build', function() {
  gulp.src('sass/*.scss')
    .pipe(compass({
      config_file: 'config.rb',
      css: 'css',
      sass: 'sass'
    }))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('watch-js', function() {
  gulp.watch('js/*.js', ['build-sourcejs']);
});
// gulp.task('watch-img', function() {
//   gulp.watch('images/**', ['build-images']);
// });
gulp.task('watch-css', function() {
  gulp.watch('css/*.css', ['build-customcss']);
});
gulp.task('compass-watch', function () {
  gulp.watch('sass/*.scss', ['compass-build']);
});
gulp.task('watch-html', function() {
  gulp.watch('templates/*.html', ['build-templates']);
});
gulp.task('watch-php', function() {
  gulp.watch('php/*.php', ['build-php']);
});
gulp.task('watch-root', function() {
  gulp.watch(['index.html','main.js'], ['build-root']);
});
gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    port: 7070,
    host: '0.0.0.0'
  });
});

gulp.task('jshint', function() {
  return gulp.src('js/*js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// default task
gulp.task('default', function() {
  return runSequence('clean', 'build-root','build-templates', 'build-fonts','build-sourcejs','build-php', 'jshint', 'build-images', 'build-bower-lib','compass-build',
    ['watch-js', 'watch-css', 'watch-html','watch-root','watch-php','compass-watch','connect']
  );
});

// task to run in production
gulp.task('build-prod', function() {
  return runSequence('clean', 'build-root', 'build-sourcejs', 'build-customcss', 'compass-build', 'build-php', 'build-templates', 'build-fonts', 'build-images','build-bower-lib');
});
