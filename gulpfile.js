var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    rename      = require('gulp-rename'),
    nodemon     = require('gulp-nodemon'),
    browserify  = require('browserify'),
    source      = require('vinyl-source-stream'),
    gutil       = require('gulp-util'),
    babelify    = require('babelify'),
    livereload  = require('gulp-livereload');

var dependencies = ['react', 'react-dom'];
var scriptsCount = 0;
livereload({ start: true });

gulp.task('server', function () {
	nodemon({
		script: 'server.js',
		ext: 'js html',
        ignore: ['app/**/*','public/**/*']
	});
});

gulp.task('sass', function() {
    return gulp.src('app/scss/*.scss')
    //gulp.src('app/scss/*.scss')
        //.pipe(sass.sync().on('error', sass.logError))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('public/css'))
        .pipe(livereload());
});

gulp.task('scripts', function () {
    bundleApp(false);
});

gulp.task('deploy', function (){
	bundleApp(true);
});

// Concatenate & Minify JS
gulp.task('scripts2', function() {
    return gulp.src('js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('app/jsx/*.js', ['scripts']);
    gulp.watch('app/scss/*.scss', ['sass']);
});

gulp.task('default', ['server', 'sass', 'scripts', 'scripts2', 'watch']);


function bundleApp(isProduction){
    scriptsCount++;

	var appBundler = browserify({
    	entries: './app/jsx/base.js',
    	debug: true
  	})

  	if (!isProduction && scriptsCount === 1){
  		// create vendors.js for dev environment.
  		browserify({
			require: dependencies,
			debug: true
		})
			.bundle()
			.on('error', gutil.log)
			.pipe(source('vendors.js'))
			.pipe(gulp.dest('./public/js/'));
  	}
  	if (!isProduction){
  		dependencies.forEach(function(dep){
  			appBundler.external(dep);
  		})
  	}

  	appBundler
	  	.transform("babelify", {presets: ["es2015", "react"]})
	    .bundle()
	    .on('error',gutil.log)
	    .pipe(source('bundle.js'))
	    .pipe(gulp.dest('./public/js/'))
        .pipe(livereload()); //;;; no me funciono :( ..
}
