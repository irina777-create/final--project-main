const { src, dest, watch, series, parallel } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");
const sourcemaps = require("gulp-sourcemaps");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const tailwindcss = require("tailwindcss");
const svgSprite = require("gulp-svg-sprite");
const esbuild = require("esbuild");

// Bootstrap 5.3 uses deprecated Dart Sass APIs, so its known warnings are hidden during compilation.
const sassOptions = {
  silenceDeprecations: ["import", "global-builtin", "color-functions", "if-function"],
};

function styles() {
  return src("./src/sass/main.sass")
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on("error", sass.logError))
    .pipe(postcss([tailwindcss(), autoprefixer()]))
    .pipe(cleanCSS())
    .pipe(rename("style.min.css"))
    .pipe(sourcemaps.write("."))
    .pipe(dest("./dist/styles"));
}

function stylesProd() {
  return src("./src/sass/main.sass")
    .pipe(sass(sassOptions).on("error", sass.logError))
    .pipe(postcss([tailwindcss(), autoprefixer()]))
    .pipe(cleanCSS())
    .pipe(rename("style.min.css"))
    .pipe(dest("./dist/styles"));
}

function sprite() {
  return src("./assets/icons/source/*.svg")
    .pipe(svgSprite({ mode: { symbol: { dest: ".", sprite: "sprite.svg" } } }))
    .pipe(dest("./dist/assets/icons"));
}

function scripts() {
  return esbuild.build({
    entryPoints: ["./src/js/main.js"],
    bundle: true,
    outfile: "./dist/scripts/main.min.js",
    format: "iife",
    minify: true,
  });
}

function watchFiles() {
  watch("./src/sass/**/*.{sass,scss}", styles);
  watch("./index.html", styles);
  watch("./tailwind.config.js", styles);
  watch("./assets/icons/source/*.svg", sprite);
  watch("./src/js/**/*.js", scripts);
}

exports.dev = series(parallel(styles, scripts), sprite, watchFiles);
exports.build = series(parallel(stylesProd, scripts), sprite);
exports.styles = styles;
exports.scripts = scripts;
exports.sprite = sprite;
