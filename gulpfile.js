  const gulp = require('gulp');
  const sass = require ('gulp-sass')(require('sass'));
  const browserSync = require('browser-sync').create();
  const inject = require ('gulp-inject');

  gulp.task('sass', function () {
    return gulp.src('C:/Users/User/Desktop/Project/LessonSaas/saas/style.sass')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('C:/Users/User/Desktop/Project/LessonSaas/css/'))
      .pipe(browserSync.reload({stream:true}))
    });
 
    gulp.task('serve', function () {
      browserSync.init({
        server: {
          baseDir: 'C:/Users/User/Desktop/Project/LessonSaas/',
          serveStaticOptions: {
            extensions: ['html','css']
          }
        }
      });
    gulp.watch('C:/Users/User/Desktop/Project/LessonSaas/saas/style.sass', gulp.series('sass'))
   gulp.watch('C:/Users/User/Desktop/Project/LessonSaas/index.html').on('change', browserSync.reload);
  });
  gulp.task('inject', function () {
    return gulp.src('C:/Users/User/Desktop/Project/LessonSaas/index.html')
      .pipe(inject(gulp.src('./css/style.css'), {
        relative: true
      }))
      .pipe(gulp.dest('C:/Users/User/Desktop/Project/LessonSaas/'));
  });

  gulp.task('default', gulp.series('sass', 'serve','inject')); 