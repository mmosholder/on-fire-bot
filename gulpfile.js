var gulp = require('gulp');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano')
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer')
var webpack = require('webpack')
var pack = require('gulp-webpack');
var pug = require('gulp-pug');
var del = require('del');

var paths = {
  html: 'index.html',
  dest: 'assets/',
  js: ['src/js/**/*.js', '!src/js/vendor/*.js'],
  vendor: 'src/js/vendor/*.js',
  scss: 'src/scss/style.scss',
  templates: 'src/templates/**/*.pug',
  index: 'src/templates/index.pug'
};

gulp.task('clean', function() {
  return del(['public/assets/**/*']);
});

gulp.task('css', [], function() {
  return gulp.src(paths.scss)
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: ['./node_modules/normalize.css']
    }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
      .pipe(cssnano({autoprefixer: false}))
      .pipe(rename('style.min.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.dest + 'css'));
});

gulp.task('index', [], function() {
  return gulp.src(paths.templates)
    .pipe(pug({
      'pretty': true
    }))
    .pipe(gulp.dest('./'))
})

gulp.task('js', [], function() {
  return gulp.src(paths.js)
    .pipe(sourcemaps.init())
      .pipe(pack({
        plugins: [
          new webpack.DefinePlugin({
            'process.env': {
              NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            },
          }),
          new webpack.ProvidePlugin({
            'window.fetch': 'exports?self.fetch!whatwg-fetch',
            'fetch': 'exports?self.fetch!whatwg-fetch'
          })
        ],
        module: {
          loaders: [{
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
              presets: [{
                "plugins": [
                  "transform-class-properties"
                ]
              }, 'es2015', 'stage-0', 'react'],
              plugins: [
                ["transform-replace-object-assign", "simple-assign"],
                "transform-dev-warning", "transform-class-properties"
              ]
            }
          }, {
            test: /\.json$/,
            loader: 'json-loader'
          }]
        }
      }))
      .pipe(uglify())
      .pipe(concat('app.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.dest + 'js'));
});

gulp.task('vendor', [], function() {
  return gulp.src(paths.vendor)
    .pipe(gulp.dest(paths.dest + 'js/vendor/'))
})


gulp.task('watch', function() {
  gulp.watch(paths.js, ['js']);
  gulp.watch(paths.templates, ['index'])
  gulp.watch(paths.vendor, ['vendor']);
  gulp.watch('resources/scss/**/*.scss', ['css']);
});

gulp.task('default', ['js', 'vendor', 'css', 'index']);
