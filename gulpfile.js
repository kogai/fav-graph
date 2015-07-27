'use strict';

var gulp = require('gulp');
var newer = require('gulp-newer');
var objectAssign = require('object-assign');

var babel = require('gulp-babel');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');

var sass = require('gulp-ruby-sass');

var pngmin = require('gulp-pngmin');

var config = {
	env: 'development',
	src: {
		client: {
			root: './statics/src'
,			images: './statics/src/images'
,			views: './statics/src/views'
,			sass: './statics/src/sass'
		},
		server: './src'
	},
	dest: {
		client: {
			root: './statics/public'
,			images: './statics/public/images'
		},
		server: './build'
	}
};

gulp.task('sass', function(){
	return sass(config.src.client.sass + '/style.sass', {
		compass: true
,		style: 'compressed'
,		sourcemap: true
	})
	.on('error', function(err){
		console.log(err);
	})
	.pipe(sourcemaps.write())
	.pipe(gulp.dest(config.dest.client.root));
});

gulp.task('babel', function(){
	return gulp.src([
		config.src.server + '/*.js',
		config.src.server + '/**/*.js',
		config.src.server + '/**/**/*.js'
	])
	.pipe(babel())
	.pipe(gulp.dest(config.dest.server))
	.on('error', function(err){
		return console.log(err);
	});
});

gulp.task('browserify', function(){
	var opt = objectAssign(
		{},
		{
			entries: [
				config.src.client.views + '/App.jsx'
			],
			extensions: ['.js'],
			debug: true
		}
	);
	var b;
	if(config.env === 'production'){
		opt.debug = false;
		b = browserify(opt);
		return b.transform('babelify')
		.transform('reactify')
		.transform('uglifyify')
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(buffer())
		.pipe(gulp.dest(config.dest.client.root));
	}else{
		b = browserify(opt);
		return b.transform('babelify')
		.transform('reactify')
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({
			loadMaps: true
		}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(config.dest.client.root));
	}
});

gulp.task('copy-client', function(){
	return gulp.src([
		config.src.client.root + '/index.html'
	])
	.pipe(gulp.dest(config.dest.client.root));
});

gulp.task('copy-jade', function(){
	return gulp.src([
		config.src.server + '/email_templates/**/*.jade'
	])
	.pipe(gulp.dest(config.dest.server + '/email_templates'))
	.on('error', function(err){
		console.log(err);
	});
});

gulp.task('copy-server', function(){
	return gulp.src([
		config.src.server + '/ssl/*'
	])
	.pipe(gulp.dest(config.dest.server + '/ssl'))
	.on('error', function(err){
		console.log(err);
	});
});

gulp.task('copy', [
	'copy-client'
,	'copy-jade'
,	'copy-server'
]);

gulp.task('pngmin', function () {
	return (
		gulp.src([
			config.src.client.images + '/*.png',
			config.src.client.images + '/**/*.png',
			config.src.client.images + '/**/**/*.png'
		])
		.pipe(newer(config.dest.client.images))
		.pipe(pngmin())
		.pipe(gulp.dest(config.dest.client.images))
	);
});

gulp.task('isProduction', function(){
	config.env = 'production';
});

gulp.task('compile', [
	'copy'
,	'pngmin'
,	'babel'
,	'browserify'
,	'sass'
]);

gulp.task('default', [
	'compile'
], function(){
	gulp.watch([
		config.src.client.views + '/*.jsx',
		config.src.client.views + '/**/*.jsx',
		config.src.client.views + '/**/**/*.jsx',
		config.src.client.views + '/*.js',
		config.src.client.views + '/**/*.js',
		config.src.client.views + '/**/**/*.js'
	], ['browserify']);

	gulp.watch([
		config.src.server + '/*.js',
		config.src.server + '/**/*.js',
		config.src.server + '/**/**/*.js'
	], ['babel']);

	gulp.watch([
		config.src.client.images + '/*',
		config.src.client.images + '/**/*',
		config.src.client.images + '/**/**/*'
	], ['pngmin']);

	gulp.watch([
		config.src.client.sass + '/*',
		config.src.client.sass + '/**/*',
		config.src.client.sass + '/**/**/*'
	], ['sass']);

	gulp.watch([
		config.src.server + '/credential.js'
,		config.src.client.root + '/index.html'
,		config.src.server + '/email_templates/**/*.jade'
	], ['copy']);
});

gulp.task('build', [
	'isProduction',
	'compile'
]);
