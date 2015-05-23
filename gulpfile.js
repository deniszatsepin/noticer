/**
 * Created by fetch on 22.05.15.
 */

var gulp      = require('gulp');

var angularTemplateCache = require('gulp-angular-templatecache');

var templateCacheConfig = require('./gulp/template_cache_config');

gulp.task('default', function() {
  return gulp.src('src/templates/**/*.html')
    .pipe(angularTemplateCache(templateCacheConfig))
    .pipe(gulp.dest('dist'));
});