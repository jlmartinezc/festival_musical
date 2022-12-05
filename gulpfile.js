const { src, dest, watch, parallel } = require("gulp");

// css
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');

// Images
const webp = require('gulp-webp');
const avif = require('gulp-avif');
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');

//js
const uglify = require('gulp-uglify-es').default;



//Complia los archivos de Sass a CSS
function compileScssToCss(done){
    src('src/scss/**/*.scss') // Identificar el archivo .SCSS a compilar
        .pipe( sourcemaps.init() )
        .pipe( plumber() )
        .pipe( sass().on("error", sass.logError) ) // Compilarlo
        .pipe( postcss([autoprefixer(), cssnano()]) ) // Minifica el codigo css
        .pipe( sourcemaps.write('.') )
        .pipe( dest('public/css') ); // Almacenarla en el disco duro

    done();
}

//Convierte imagenes a formatyo webp
function convertImageToWebp(done){
    const options = {
        quality: 50
    };

    src('src/img/**/*.{png,jpg}') //identifica las imagenes con los formatos definidos
        .pipe( webp(options) )
        .pipe( dest('public/assets/img') ); // Almacenarla en el disco duro
    done();
}

//Convierte imagenes a formatyo avif
function convertImageToAvif(done){
    const options = {
        quality: 50
    };

    src('src/img/**/*.{png,jpg}') //identifica las imagenes con los formatos definidos
        .pipe( avif(options) )
        .pipe( dest('public/assets/img') ); // Almacenarla en el disco duro
    done();
}

//Aligera el peso de las imagenes
function optimizeImgaeSize(done){
    const options = {
        optimizationLevel: 3
    }

    src('src/img/**/*.{png,jpg}')
        .pipe( cache(imagemin(options)) )
        .pipe( dest('public/assets/img') ); // Almacenarla en el disco duro

    done();
}

function javascript(done){
    src('src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(uglify())
		.pipe(sourcemaps.write('.')) 
        .pipe( dest('public/js') );

    done();
}

//Vigila los cambios en los archivos scss y ejecuta la funcion css()
function watchCompile(done){
    watch('src/scss/**/*.scss', compileScssToCss);
    watch('src/js/**/*.js', javascript);

    done()
}

exports.javascript = javascript;
exports.compileScssToCss = compileScssToCss;
exports.optimizeImgaeSize = optimizeImgaeSize;
exports.convertImageToAvif = convertImageToAvif;
exports.convertImageToWebp = convertImageToWebp;
exports.watchCompile = parallel( optimizeImgaeSize, convertImageToWebp, convertImageToAvif, compileScssToCss,javascript, watchCompile );