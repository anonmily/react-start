var gulp = require('gulp'),
    gutil = require('gulp-util'),

    browserify = require('browserify'),
    babelify = require('babelify'),
    reactify = require('reactify'),

    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),

    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    _ = require('lodash');

/*----- Scripts ------*/
gulp.task('scripts:combine', function(){
    return gulp.src([
            'bower_components/jquery/dist/jquery.min.js'
        ])
        .pipe(concat('frontend.js'))
        .pipe(uglify({
            mangle: false
        }))
        .on('error', gutil.log)
        .pipe(gulp.dest('public/js'));
});

gulp.task('scripts:bundle',function(){
    return gulp.src([
            'public/js/frontend.js',
            'public/js/bundle.js'
        ])
        .pipe(concat('app.js'))
        .on('error', gutil.log)
        .pipe(gulp.dest('public/js'));
});

gulp.task('scripts',['scripts:combine'], function(){
    return gulp.src([
            'public/js/frontend.js',
            'public/js/bundle.js'
        ])
        .pipe(concat('veloxdealerbackend.js'))
        .on('error', gutil.log)
        .pipe(gulp.dest('public/js'));
});

gulp.task('reloadjs', function() {
    return gulp.src(['public/js/**.js'])
        .pipe(reload({
            stream: true
        }));
});

gulp.task('reactify',function(cb){
    return browserify('./src/react/Main.js')
        .transform(reactify)
        //.transform(babelify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .on('error', gutil.log)
        .pipe(gulp.dest('public/js'))
        .on('error', gutil.log)
});

gulp.task('react',['reactify'], function(){
    return gulp.src([
            'public/js/frontend.js',
            'public/js/bundle.js'
        ])
        .pipe(concat('app.js'))
        .pipe(uglify())
        .on('error', gutil.log)
        .pipe(gulp.dest('public/js'))
});

/*------ Styles --------*/

gulp.task('sassify', function(cb) {
    return gulp.src([
            './src/sass/**/[^_]*.scss',
            './src/sass/[^_]*.scss'
        ])
        .pipe(sass({
            includePaths: ['./src/scss'],
            outputStyle: 'expanded'
        }))
        .on('error', gutil.log)
        .pipe(gulp.dest('./public/css'))
        .pipe(reload({
            stream: true
        }));
});
gulp.task('sass', ['sassify'], function() {
    return gulp.src([
            'public/css/**.css'
        ])
        .pipe(concat('style.css'))
        .pipe(gulp.dest('public/css'))
        .pipe(reload({
            stream: true
        }));
});

/*------ Watch ---------*/

gulp.task('browser-sync', function() {
    return browserSync.init({
        server: {
            baseDir: "./public"
        }
    });
});

gulp.task('watch', function() {
    gulp.watch(['src/sass/*/**.scss', 'src/sass/**.scss'], ['sass']);
    gulp.watch(['src/js/*.js', '!public/js/frontend.js'], ['scripts','reloadjs']);
    gulp.watch(['src/react/**.js','src/react/*/**.js', 'src/react/*/*/**.js'],['react','reloadjs']);
});

gulp.task('default',['sass','scripts','react', 'browser-sync','watch']);
