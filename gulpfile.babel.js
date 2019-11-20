import gulp from 'gulp';
import path from 'path';
import del from 'del';
import runSequence from 'run-sequence';

const plugins = require('gulp-load-plugins')();

const paths = {
    js: ['./**/*.js', '!dist/**', '!node_modules/**', '!coverage/**'],
    nonJs: ['./package.json', './.gitignore', './.env', './.sequelizerc'],
    resources: ['./server/resources/**'],
    masterdata: ['./server/masterdata/**'],
    locales: ['./locales/**'],
    tests: './server/tests/*.js',
};

// Clean up dist and coverage directory
gulp.task('clean', (done) => {
    del.sync(['dist/**', 'dist/.*', 'coverage/**', '!dist', '!coverage']);
    done();
});

// Copy non-js files to dist
gulp.task('copy', (done) => {
    gulp.src(paths.nonJs)
        .pipe(plugins.newer('dist'))
        .pipe(gulp.dest('dist'));
    gulp.src(paths.resources)
        .pipe(plugins.newer('dist/server/resources'))
        .pipe(gulp.dest('dist/server/resources'));
    gulp.src(paths.masterdata)
        .pipe(plugins.newer('dist/server/masterdata'))
        .pipe(gulp.dest('dist/server/masterdata'));
    gulp.src(paths.locales)
        .pipe(plugins.newer('dist/locales'))
        .pipe(gulp.dest('dist/locales'));
    done();
});

// Compile ES6 to ES5 and copy to dist
gulp.task('babel', (done) => {
    gulp.src([...paths.js, '!gulpfile.babel.js'], { base: '.' })
        .pipe(plugins.newer('dist'))
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.babel())
        .pipe(plugins.sourcemaps.write('.', {
            includeContent: false,
            sourceRoot(file) {
                return path.relative(file.path, __dirname);
            },
        }))
        .pipe(gulp.dest('dist'));
    done();
});

// Start server with restart on file changes
gulp.task('nodemon', gulp.series((done) => {
    plugins.nodemon({
        script: path.join('dist', 'index.js'),
        ext: 'js',
        ignore: ['node_modules/**/*.js', 'dist/**/*.js'],
        tasks: ['copy', 'babel'],
    });
    done();
}));

// gulp serve for development
gulp.task('serve', gulp.series('clean', 'nodemon'));

// default task: clean dist, compile js files and copy non-js files.
gulp.task('default', gulp.series('clean'), (done) => {
    runSequence(['copy', 'babel']);
    done();
});
