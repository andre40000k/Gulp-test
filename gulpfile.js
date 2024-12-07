const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const browserSync = require("browser-sync").create();
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");
const sourcemaps = require("gulp-sourcemaps");

const paths = {
  scss: "./src/scss/**/*.scss",
  css: "./assets/css",
  html: "./index.html",
};

function styles() {
  return gulp
    .src(paths.scss)
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 2 versions"],
        cascade: false,
      })
    )
    .pipe(gulp.dest(paths.css))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(paths.css))
    .pipe(browserSync.stream());
}

function serve() {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });

  gulp.watch(paths.scss, styles);
  gulp.watch(paths.html).on("change", browserSync.reload);
}

exports.styles = styles;
exports.serve = serve;
exports.default = gulp.series(styles, serve);
