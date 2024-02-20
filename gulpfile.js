const { src, dest,series, watch } = require("gulp");
const htmlmin = require('gulp-html-minifier-terser');
var concat = require('gulp-concat');
const terser = require('gulp-terser');
const cleanCSS = require('gulp-clean-css');
const optimizeImages =require("gulp-optimize-images");
const processhtml = require('gulp-processhtml')

const globs = {
    html:"project/*.html",
    css:"project/css/**/*.css",
    js:"project/js/*.js",
    img:"project/pics/*",
}

function htmlTask(){
    return src(globs.html).pipe(processhtml()).pipe(htmlmin({removeComments:true , collapseWhitespace:true})).pipe(dest('dist'))
}

exports.html=htmlTask

function jsTask(){
    return src(globs.js).pipe(concat("script.min.js")).pipe(terser()).pipe(dest("dist/assets"))
}

exports.js=jsTask

function cssTask(){
    return src(globs.css).pipe(concat("style.min.css")).pipe(cleanCSS()).pipe(dest("dist/assets"))
}

exports.css=cssTask

function imgTask(){
    return src(globs.img).pipe(optimizeImages({
        compressOptions:{
            jpeg:{quality: 70}
        }
    })).pipe(dest('dist/imgs'))
}

exports.img=imgTask

function watchTask(){
    watch(globs.html,htmlTask)
    watch(globs.css,cssTask)
    watch(globs.js,jsTask)
    watch(globs.img,imgTask)

}
exports.default = series(htmlTask,cssTask,jsTask,imgTask)