const gulp = require('gulp');

const Dropbox = require('dropbox');
const Promise = require('bluebird');
const readFile = Promise.promisify(require('fs').readFile);

const path = {
  src: 'sample.txt',
  dest: '',
};

// Dropbox acess
const token='iernAqGWD_kAAAAAAAAe0Ng_4bFBSc95cCaA5-HHBy_hWnL7TGjw6Mm0Pi0soK0G'
const dbx = new Dropbox({ accessToken: token });

// Tasks
gulp.task('sync', function() {
  readFile(path.src)
    .then(function(content) {
      return dbx.filesUpload({contents: content, path: path.dest});
    })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });
});

gulp.task('watch', function() {
  gulp.watch(path.src, ['sync']);
});

gulp.task('default', ['watch']);
