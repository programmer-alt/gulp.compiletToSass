  const gulp = require ('gulp');
  const sass = require ('gulp-sass')(require('sass'));
  const browserSync = require('browser-sync').create();
  const inject = require ('gulp-inject');
  const ts = require ('gulp-typescript');
  const tsProject = ts.createProject('tsconfig.json')
  gulp.task('sass', function () {
    return gulp.src('C:/Users/User/Desktop/Project/LessonSaas/saas/style.sass')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('C:/Users/User/Desktop/Project/LessonSaas/css/'))
      .pipe(browserSync.reload({stream:true}))
    });
  gulp.task('typescript', function () {
      return gulp.src('C:/Users/User/Desktop/Project/LessonSaas/ts/**/*.ts')
      .pipe (tsProject())
      .pipe(gulp.dest('C:/Users/User/Desktop/Project/LessonSaas/js/'))
      .pipe(browserSync.reload({stream:true}))
    })
 
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
   gulp.watch('C:/Users/User/Desktop/Project/LessonSaas/**/*.ts', gulp.series('typescript'));
  });
  gulp.task('inject', function (cb) {
    const target = gulp.src('C:/Users/User/Desktop/Project/LessonSaas/index.html')
    const sourses = gulp.src(['C:/Users/User/Desktop/Project/LessonSaas/css/style.css', 'C:/Users/User/Desktop/Project/LessonSaas/js/**/*.js'],{read:false});
    return target.pipe(inject(sourses))
    .pipe(gulp.dest('C:/Users/User/Desktop/Project/LessonSaas/'))
      .pipe(browserSync.reload({stream:true}))
      .on('end', function () {console.log('injection completed'); 
    cb() });
  });

  gulp.task('default', gulp.series('sass','typescript','inject','serve')); 