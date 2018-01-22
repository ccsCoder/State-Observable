var gulp = require("gulp");
var babel = require("gulp-babel");

gulp.task("watch", function() {
  gulp.watch("src/*.js", gulp.series("babel"));
  gulp.watch("test/*.js", gulp.series("babel"));
});

gulp.task("babel", function () {
    return gulp
      .src(["src/*.js", "test/*.js"])
      .pipe(babel())
      .pipe(gulp.dest("dist"))
});

gulp.task("default", gulp.series('babel'));
