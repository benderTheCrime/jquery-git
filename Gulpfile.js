'use strict';

var gulp =      require('gulp'),
    uglify =    require('gulp-uglify'),
    rename =    require('gulp-rename');

gulp.task('min', function() {
    return gulp.src('jquery-git.js')
        .pipe(uglify())
        .pipe(
            rename({
                extname: '.min.js'
            })
        ).pipe(gulp.dest('.'));
});

gulp.task('default', [ 'min' ]);