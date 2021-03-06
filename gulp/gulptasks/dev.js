'use strict';
import gulp from 'gulp';
import loadPlugns from 'gulp-load-plugins';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import del from 'del';
import babelify from 'babelify';
import es2015 from 'babel-preset-es2015';
import stage3 from 'babel-preset-stage-3';

const plugins = loadPlugns();

const pathUrl = './';
const jsArr = ['demo', 'vue'];

jsArr.forEach(file=>{
	gulp.task(file, ()=>{
		return browserify({entries: pathUrl+'src/js/' + file + '.js', debug: false})
			.transform("babelify", { presets: [es2015, stage3] })
			.bundle()
			.pipe(source(file + '.js')) //'test.js'
			.pipe(buffer())
			.pipe(plugins.jshint())
			.pipe(plugins.jshint.reporter('default'))
			.pipe(plugins.sourcemaps.init())
			.pipe(plugins.rename({ suffix: '.min'})) //extname: '.bundle.js',
			.pipe(plugins.uglify())
			.pipe(plugins.sourcemaps.write(pathUrl+'maps'))
			.pipe(gulp.dest(pathUrl+'public/js'));
	});

});

gulp.task('es6_watch', ()=>{
	//gulp.watch(pathUrl+'src/js/*.js', ['es6_comps']);
	jsArr.forEach((file)=>{
		gulp.watch(pathUrl+'src/js/'+file+'.js', [file]);
	});
});

gulp.task('es6', ()=>{
	let arr = ['es6_watch'];
	Array.prototype.push.apply(arr, jsArr);
	gulp.start(arr);
});

gulp.task('es6_clean', function(cb){
	//del(['../public/css/*.css', '../public/js/**/*.*'], cb);
	del.sync([pathUrl+'public/css/', pathUrl+'public/js/'], {force: true});
});
