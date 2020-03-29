let gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  imagemin = require('gulp-imagemin'),
  sass = require('gulp-sass'),
  concat = require('gulp-concat');

/*
TOP LEVEL FUNCTIONS
gulp.task - define tasks
gulp.src - point to files to use
gulp.dest - point to folder to output
gulp.watch - watch files and folders for changes
*/
/*
gulp.task('message', function() {
  return new Promise((resolve, reject) => {
    console.log('Hello World! from gulp');
    resolve();
  });
});
*/
gulp.task('message', async function() {
  console.log('gulp is running...');
});

// gulp.task('uglify', async () => {
//   gulp
//     .src('src/js/*.js')
//     .pipe(uglify())
//     .pipe(gulp.dest('dist/js'));
// });

// copy all html files
gulp.task('copyHtml', async () => {
  gulp.src('src/*.html').pipe(gulp.dest('dist'));
});

// optimize images
gulp.task('imagemin', async () => {
  gulp
    .src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'));
});

// compile sass
gulp.task('sass', async () => {
  gulp
    .src('src/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('scripts', function() {
  return gulp
    .src('src/js/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task(
  'default',
  gulp.parallel(['message', 'copyHtml', 'imagemin', 'sass', 'scripts'])
);

gulp.task('watch', function() {
  gulp.watch('src/js/*.js', gulp.series('scripts'));
  gulp.watch('src/images/*', gulp.series('imagemin'));
  gulp.watch('src/sass/*.scss', gulp.series('sass'));
  gulp.watch('src/*.html', gulp.series('copyHtml'));
});
