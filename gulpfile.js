var gulp = require('gulp');
var gutil = require('gulp-util');

// package.json
var pkg = require('./package.json');

// plugins
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var less = require('gulp-less');
var minify = require('gulp-minify-css');
var rename = require('gulp-rename');
var watch = require('gulp-watch');
var map = require('map-stream');

// reporter (jshint)
var reporter = map(function(file, cb) {
    if (!file.jshint.success) {
        gutil.log(gutil.colors.yellow.bgRed('JSHint fail in ' + file.path));

        file.jshint.results.forEach(function(err) {
            if (err)
                gutil.log(gutil.colors.red(' ' + file.path + ': line ' + err.line + ', col ' + err.character + ', code ' + err.code + ', ' + err.reason));
        });
    }

    if (file.jshint.errorCount !== undefined)
        gutil.log(gutil.colors.red('JSHint: Your project have ' + file.jshint.errorCount + ' errors...'));
    else
        gutil.log(gutil.colors.green('-- JSHint: Your project no have errors!'));

    cb(null, file);
});

// tasks
gulp.task('build', function() {
    // js
    var scriptFile = './js/stepbar.js';
    var scriptDist = './js';

    gulp.src(scriptFile)
        .pipe(watch(function(files) {
            return files.pipe(concat('stepbar.min.js'))
                        .pipe(jshint())
                        .pipe(reporter)
                        .pipe(uglify())
                        .pipe(gulp.dest(scriptDist));
        }));


    // less
    var lessFile = './less/stepbar.less';
    var lessDist = './css';

    gulp.src(lessFile)
        .pipe(watch(function(files) {
            return files.pipe(concat('stepbar.less'))
                        .pipe(less())
                        .pipe(gulp.dest(lessDist))
                        .pipe(minify())
                        .pipe(rename('stepbar.min.css'))
                        .pipe(gulp.dest(lessDist));
        }));
});

// default task (called when run `gulp`)
gulp.task('default', ['build']);
