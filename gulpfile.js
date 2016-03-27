/**
 * 	To use:
 *
 * 	npm install
 * 	bower install
 * 	gulp or gulp <task>
 */

	var
		del = require('del'),
		gulp = require('gulp'),
		$ = require('gulp-load-plugins')({ camelize: true }),
        paths = {
            js_source : 'src/jquery.sticky.js',
            js_dest : 'jquery.sticky.min.js'
        };

/*
 * ================================
 *  Javascript
 * ================================
 */

	gulp.task('js',  function() {
		del([paths.js_dest], {force: true});

		gulp.src(paths.js_source)
			.pipe($.jshint())
			.pipe($.jshint.reporter('jshint-stylish'))
            .pipe($.concat({path: paths.js_dest}))
			.pipe($.uglify({preserveComments: 'license'}))
			.pipe(gulp.dest('.'))
			.pipe($.notify('Successfully updated JS'));

		return gulp;
	});

/*
 * ================================
 *  Watch
 * ================================
 */

	gulp.task('watch', function() {
		gulp.watch(paths.js_source, ['js']);
		return gulp;
	});

/*
 * ================================
 *  	Default
 * ================================
 */

	gulp.task('default', ['js']);

