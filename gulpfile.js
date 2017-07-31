// gulpfile.js
var gulp = require('gulp');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename'); 
var babel = require('gulp-babel');
var header = require('gulp-header'); 

var nTplHeader = `/*!
 * n-tpl.js released under the MIT license
 * author: eczn @ https://eczn.github.io/eczn
 */\n`; 

gulp.task('build', function(){
	return gulp.src('./src/tpl-browser.js')
		.pipe(browserify({
			insertGlobals: true, 
			debug: false
		}))
		.pipe(babel({
            presets: ['es2015']
		}))
		.pipe(rename('tplser.js'))
		.pipe(header(nTplHeader))
		.pipe(gulp.dest('./dest/'))
		.pipe(uglify())
		.pipe(rename('tplser.min.js'))
		.pipe(header(nTplHeader))
		.pipe(gulp.dest('./dest/'))
}); 
