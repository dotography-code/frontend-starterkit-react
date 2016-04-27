import del from "del";
import path from "path";
import gulp from "gulp";
import open from "open";
import gulpLoadPlugins from "gulp-load-plugins";
import packageJson from "./package.json";
import runSequence from "run-sequence";
import webpack from "webpack";
import webpackConfig from "./webpack.config";
import WebpackDevServer from "webpack-dev-server";


const PORT = process.env.PORT || 3000;
const $ = gulpLoadPlugins({camelize: true});

var config = {
  devPath: 'app/src',
  distPath: 'app/dist',
  deployTarget: 'public',
  verdorsPath: [
    'app/dev/vendors/**/*',
    'bower_components/jquery/dist/jquery.min.js'
    //'bower_components/jquery-ui/jquery-ui.min.js',
  ]
}

// Main tasks
gulp.task('serve', () => runSequence('serve:clean', 'serve:index', 'serve:start'));
gulp.task('dist', () => runSequence('dist:clean', 'dist:build', 'dist:index'));
gulp.task('clean', ['dist:clean', 'serve:clean', 'deploy:clean']);
gulp.task('open', () => open('http://localhost:3000'));

gulp.task('deploy', () => runSequence('dist:clean', 'deploy:clean', 'dist:build', 'dist:index', 'deploy:dist'))


gulp.task('deploy:dist', () => {
  gulp.src(config.distPath + '/assets/**').pipe(gulp.dest(config.deployTarget+'/assets'));
  gulp.src(config.distPath + '/*.html').pipe(gulp.dest(config.deployTarget));
});

// Remove all built files
gulp.task('serve:clean', cb => del('app/build', {dot: true}, cb));
gulp.task('dist:clean', cb => del(['app/dist', 'app/dist-intermediate'], {dot: true}, cb));
gulp.task('deploy:clean', cb => del([config.deployTarget + '/assets', config.deployTarget + '/index.html'], {dot: true}, cb));

// Copy static files across to our final directory
gulp.task('serve:static', () =>
  gulp.src([
    'app/src/assets/**'
  ])
    .pipe($.changed('build'))
    .pipe(gulp.dest('app/build/assets'))
    .pipe($.size({title: 'static'}))
);

gulp.task('dist:static', () =>
  gulp.src([
    'app/src/assets/**'
  ])
    .pipe(gulp.dest('app/dist/assets/'))
    .pipe($.size({title: 'static'}))
);

// Copy our index file and inject css/script imports for this build
gulp.task('serve:index', () => {
  return gulp
    .src('app/src/index.html')
    .pipe($.injectString.after('<!-- inject:app:css -->', '<link href="/assets/style.css" rel="stylesheet" />'))
    .pipe($.injectString.after('<!-- inject:app:js -->', '<script src="/assets/main.js"></script>'))
    .pipe($.injectString.after('<!-- inject:app:js -->', '<script src="/assets/common.js"></script>'))
    .pipe(gulp.dest('app/build'));
});

// Copy our index file and inject css/script imports for this build
gulp.task('dist:index', ['dist:update-static'],  () => {

  const app = gulp
    .src(["*.{css,js}"], {cwd: 'app/dist-intermediate'})
    .pipe(gulp.dest('app/dist/assets'));

  // Build the index.html using the names of compiled files
  return gulp.src('app/src/index.html')
    .pipe($.inject(app, {
      ignorePath: 'app/dist',
      starttag: '<!-- inject:app:{{ext}} -->'
    }))
    .on("error", $.util.log)
    .pipe(gulp.dest('app/dist'));
});

gulp.task('dist:update-static', () =>
  gulp.src([
    'app/dist-intermediate/images/**'
  ])
    .pipe(gulp.dest('app/dist/assets/images'))
    .pipe($.size({title: 'update-static'}))
);

// Start a livereloading development server
gulp.task('serve:start', ['serve:static'], () => {
  const config = webpackConfig(true, 'app/build', PORT);

  return new WebpackDevServer(webpack(config), {
    contentBase: './app/build',
    historyApiFallback: true,
    publicPath: '/assets/',
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  })
    .listen(PORT, '0.0.0.0', (err) => {
      if (err) throw new $.util.PluginError('webpack-dev-server', err);

      $.util.log(`[${packageJson.name} serve]`, `Listening at 0.0.0.0:${PORT}`);
    });
});

// Create a distributable package
gulp.task('dist:build', ['dist:static'], cb => {
  const config = webpackConfig(false, 'app/dist-intermediate');

  webpack(config, (err, stats) => {
    if (err) throw new $.util.PluginError('dist', err);

    $.util.log(`[${packageJson.name} dist]`, stats.toString({colors: true}));

    cb();
  });
});
