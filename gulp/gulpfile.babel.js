'use strict';
import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
require('./gulptasks/dev');

const plugins = loadPlugins();

gulp.task('test', ()=>{
	gulp.start(['es6_libs']);
});

gulp.task('open', ['ng1'], ()=>{
	gulp.src(__filename)
		//.pipe(open({uri: 'http://localhost:3000/item/index.html'}));
		.pipe(plugins.open({uri: 'http://localhost:3001'}));
});

gulp.task('cleanCache', function (done) {  
    return cache.clearAll(done);  
}); 


gulp.task('default', function(){
	// gulp.run('clean', 'libs', 'util', 'less', 'comps', 'live', 'images');
	// gulp.watch('../src/less/*.*', ['less']);
	// gulp.watch('../src/images/**/*.*', ['images']);
	// gulp.watch('../src/comp/**/main.js', ['comps']);
	// gulp.watch('../src/util/*.*', ['util']);
});
