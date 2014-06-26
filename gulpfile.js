var gulp = require("gulp");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var sass = require("gulp-ruby-sass");
var compass = require("gulp-compass");
var jshint = require("gulp-jshint");
var stylish = require("jshint-stylish");
var csslint = require("gulp-csslint");
var minifycss = require("gulp-minify-css");


gulp.task("compile:css", function () {

	return gulp.src(["./src/scss/**/*.scss"])
		.pipe(compass({
		    css: './public/assets/css',
		    sass: './src/scss'
		}))
		.pipe(sass())
		.pipe(minifycss())
		.pipe(csslint({
			'box-sizing': false,
			'compatible-vendor-prefixes': false,
			'unqualified-attributes': false,
			'unique-headings': false
		}))
		// .pipe(csslint.reporter())
		.pipe(gulp.dest("./public/assets/css"));

});

gulp.task("compile:js", function () {

	var bundle = browserify("./src/js/main.js").bundle();

	return bundle
		.pipe(source("main.js"))
		.pipe(gulp.dest("./public/assets/js"));

});

gulp.task("watch", ["compile:css", "compile:js"], function () {

	gulp.watch(["./src/scss/**/*.scss"], ["compile:css"]);
	gulp.watch(["./src/js/**/*.js"], ["compile:js"]);

});