const gulp = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const flatten = require('gulp-flatten');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');

const paths = {
  scssIcons: ['media/icons/bootstrap-icons.scss'], // Source SCSS files for icons
  src: ['js/source/main.js', 'js/source/admin.js', 'js/source/metatemplate.js'], // Source JavaScript files including toast.js
  scssl: [
    'css/shared.scss',
    'css/admin.scss',
    'css/main.scss',
    'css/rtl.scss',
    'css/tickets.scss',
    'css/responsive.scss',
    'css/responsive-admin.scss',
    'css/rtl-admin.scss',
  ], // Source SCSS files in the css/ directory
};

// Task to minify JavaScript files and move to the specified destination
function minifyJS() {
  return gulp
    .src(paths.src)
    .pipe(uglify())
    .pipe(flatten())
    .pipe(gulp.dest('js/min/'));
}

// Task to compile and move SCSS files for icons to the specified destination
function compileAndMoveIcons() {
  return gulp
    .src(paths.scssIcons)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('media/icons/'));
}

// Task to compile and move SCSS files in the css/ directory to the specified destination
function compileAndMoveSCSSL() {
  return gulp
    .src(paths.scssl)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('css/'));
}

// Define a default task that runs the compileAndMoveIcons, compileAndMoveSCSSL, and minifyJS tasks in parallel
exports.default = gulp.parallel(compileAndMoveIcons, compileAndMoveSCSSL, minifyJS);