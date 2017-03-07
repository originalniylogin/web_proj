var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var spritesmith = require('gulp.spritesmith')

gulp.task('sass', function() {
    return gulp.src('app/sass/**/*.sass')
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false
    });
});

gulp.task('watch', ['browser-sync', 'sass'], function() {
    gulp.watch('app/sass/**/*.sass', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('sprite', function() {
    var spriteData = gulp.src('app/img/*.*')
        .pipe(spritesmith({
            imgName: 'sprite.png',
            cssName: 'sprite.css'
        }));
    spriteData.img.pipe(gulp.dest('app/img/'));
    spriteData.css.pipe(gulp.dest('app/css'));
})
