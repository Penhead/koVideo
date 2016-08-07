var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('styles', function() {
    gulp.src('src/assets/sass/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/assets/sass/css'))
});

gulp.task('default',function() {
    gulp.watch('src/assets/sass/scss/**/*.scss',['styles']);
});