const gulp = require("gulp");
const uglify = require("gulp-uglify");
const babel = require("gulp-babel");
const rename = require("gulp-rename");

const miniJs = ()=>{
    return gulp.src("./index.js")
            .pipe(babel())
            .pipe(uglify())
            .pipe(rename({extname: ".min.js"}))
            .pipe(gulp.dest("./dist"));
};

exports.default = miniJs;