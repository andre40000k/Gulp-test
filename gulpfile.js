const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const browserSync = require("browser-sync").create();
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");

const PATH = {
  scss: "./src/scss/**/*.scss",
  css: "./assets/css",
  html: "./index.html",
};

function styles() {
  return gulp
    .src(PATH.scss)
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 5 versions", "> 0.1%"],
        cascade: false,
      })
    )
    .pipe(gulp.dest(PATH.css))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(PATH.css))
    .pipe(browserSync.stream());
}

function serve() {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });

  gulp.watch(PATH.scss, styles);
  gulp.watch(PATH.html).on("change", browserSync.reload);
}

exports.styles = styles;
exports.serve = serve;
exports.default = gulp.series(styles, serve);

gulp.task("run", gulp.series(styles, serve));