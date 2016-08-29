var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

gulp.task('styles', function() {
	return gulp.src('styles/**/*.scss')
		.pipe(sass().on('error',sass.logError))
		.pipe(concat('style.css'))
		.pipe(gulp.dest('styles/'))
		.pipe(reload({stream: true}));
});

gulp.task('watch', function() {
	gulp.watch('styles/**/*.scss', ['styles']);
	gulp.watch('scripts/main.js',['scripts']);
	gulp.watch('index.html', reload);

});

gulp.task('scripts', function(){
    return gulp.src('scripts/main.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('scripts/'))
        .pipe(reload({stream: true}));
});

gulp.task('browser-sync', function() {
	browserSync.init({
		server: '.'
	})
});

gulp.task('default', ['browser-sync', 'styles', 'scripts', 'watch']);