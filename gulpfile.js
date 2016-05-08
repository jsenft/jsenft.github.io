var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    jshint = require('gulp-jshint'),
  	notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    options = { removeComments: true };

var onError = function(err) {
    console.log(err);
}

gulp.task('js', function() {
    return gulp.src('src/js/*.js')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(uglify())
        .pipe(rename({
          extname: '.js'
        }))
        .pipe(gulp.dest('dist/js/'));
});

gulp.task('jshint', function() {
  	return gulp.src(['src/*.js', 'src/views/js/*.js'])
    	.pipe(plumber({
    		errorHandler: onError
    	}))
    	.pipe(jshint())
    	.pipe(jshint.reporter('default'))
    	.pipe(notify({ message: 'JS Hinting task complete' }));
});

gulp.task('copyCss', function() {
    return gulp.src('src/css/*.css')
        .pipe(rename({
          extname: '.css'
        }))
        .pipe(gulp.dest('dist/css/'));
});

gulp.task('copyHtml', function() {
    return gulp.src('src/*.html')
        .pipe(rename({
          extname: '.html'
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['js', 'jshint', 'copyCss', 'copyHtml']);
