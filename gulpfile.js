var gulp = require('gulp');

var Dropbox = require('dropbox');
var Promise = require('bluebird');
var readFile = Promise.promisify(require('fs').readFile);
var exec = require('child_process').exec;

const path = {};

// Dropbox acess
const token='iernAqGWD_kAAAAAAAAe19plIWkCymKPuYd8Ll5GG82Y_H62baRYouaA8gOWfpYY';
const dbx = new Dropbox({ accessToken: token });

// Tasks
gulp.task('path', (done) => {

  readFile('path.json')
    .then(content => {
      const config = JSON.parse(content);
      Object.assign(path, config, {});

      done();
    })
    .catch(err => {
      console.log(err);
    });

});

gulp.task('pdf', (done) => {

  exec(`cscript saveAsPDF.js ${path.src} ${path.pdf}`, (err, stdout, stderr) => {
    if (err) {
      console.error(`exec error: ${error}`);
      return;
    }

    console.log(`\nPDF saved to: ${path.pdf}\n`);
    done();
  });

});

gulp.task('sync', ['pdf'], () => {

  readFile(path.src)
    .then(content => {
      return dbx.filesUpload({
        contents: content, 
        path: path.dest + 'CV.docx',
        mode: {
          '.tag': 'overwrite'
        },
        autorename: false
      });
    })
    .catch(error => {
      console.log(error);
    });

  readFile(path.pdf)
    .then(content => {
      return dbx.filesUpload({
        contents: content, 
        path: path.dest + 'CV.pdf',
        mode: {
          '.tag': 'overwrite'
        },
        autorename: false
      });
    })
    .catch(error => {
      console.log(error);
    });

});

gulp.task('watch', ['path'],  () => {
  console.log(`\n?? Watching source: ${path.src}\n`);
  gulp.watch(path.src, ['sync']);
});

gulp.task('default', ['watch']);
