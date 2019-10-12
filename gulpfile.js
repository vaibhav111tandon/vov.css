const { src, dest } = require('gulp');
const concat = require('gulp-concat');
const csso = require('gulp-csso');
const uglifycss = require('gulp-uglifycss');

function compile() {
  return src('css/**/*.css')
    .pipe(concat('vov.min.css'))
    .pipe(csso())
    .pipe(uglifycss())
    .pipe(dest('./'));
}

exports.compile = compile;
