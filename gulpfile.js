const { src, dest } = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const csso = require('gulp-csso');
const uglifycss = require('gulp-uglifycss');

function compile() {
  return src('css/**/*.css')
    .pipe(concat('vov.min.css'))
    .pipe(autoprefixer())
    .pipe(csso())
    .pipe(uglifycss())
    .pipe(dest('./'));
}

exports.compile = compile;
