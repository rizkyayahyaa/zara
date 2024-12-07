const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const order = require("gulp-order");
const concat = require("gulp-concat");

const sassFolderPath = './scss';
const sassFilesPath = './scss/*.scss';
const sassBundleFileName = 'bundle.scss';

const cssFolder = './css';

const sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

gulp.task('concat-sass', function () {
  return gulp
    .src(sassFilesPath)
    .pipe(order([
      'scss/reset.scss',
      'scss/variables.scss',
      'scss/animations.scss',
      'scss/header.scss',
      'scss/heading.scss',
      'scss/grid.scss',
      'scss/page-scroll-arrows.scss',
      'scss/sign-up.scss',
    ], { base: __dirname }))
    .pipe(concat(sassBundleFileName))
    .pipe(gulp.dest(sassFolderPath));
});

gulp.task('compile-sass', function () {
  return gulp
    .src(`${sassFolderPath}/${sassBundleFileName}`)
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest(cssFolder));
});

gulp.task('default', gulp.series('concat-sass', 'compile-sass'));
