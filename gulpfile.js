var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

///aicea punem sassul
/// in pipe sass ne este convertit in css
/// in pipe dest ii dam destinatia unde va fi salvat css-ul
/// in browserSync inregistram schimbarile facute pentru a da reload la pagina

gulp.task('sass', function() {

    return gulp.src("./sass/main.scss")
        .pipe(sass())
        .pipe(gulp.dest("./css"))
        .pipe(browserSync.stream());
});

gulp.task('serve', gulp.series('sass', function() {


    browserSync.init({
        server: "./"
    });


    gulp.watch("./sass/main.scss", gulp.series('sass'));
    gulp.watch("./index.html").on('change', browserSync.reload);
    gulp.watch("./app/app.js").on('change', browserSync.reload);
    // gulp.watch("./app/app.js").on('change', browserSync.reload);
}));

gulp.task('default', gulp.series('serve'));

