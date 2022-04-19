const gulp = require("gulp")
const nunjucks = require("gulp-nunjucks")
const browserSync = require('browser-sync').create();


function reload(cd) {
    browserSync.reload();
    cd()
}

function liveReload(){
    browserSync.init({
        server:{
            baseDir: "./dist"
        }
    })
}

function compilarTemplates(cb) {
    gulp.src("src/html/index.njk")
    .pipe(nunjucks.compile())
    .pipe(gulp.dest("dist"))
    cb();
}

function defaultTask() {
    liveReload()
    gulp.watch("src/html/**/*.njk", gulp.series([compilarTemplates,reload]))
}

exports.compiler = compilarTemplates
exports.default = defaultTask