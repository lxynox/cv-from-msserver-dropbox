var gulp = require('gulp');

var Dropbox = require('dropbox');
var Promise = require('bluebird');
var readFile = Promise.promisify(require('fs').readFile);
var exec = Promise.promisify(require('child_process').exec);

var path = require('path');

const PATH = {}; // override by path.json values

// Dropbox acess
const token='';
const dbx = new Dropbox({ accessToken: token });

// Tasks
gulp.task('path', (done) => {

  readFile('path.json')
    .then( (content) => {
      const config = JSON.parse(content);
      Object.assign(PATH, config, {});

      done();
    })
    .catch( (err) => {
      console.log(err);
    });

});

gulp.task('clean', () => {});

gulp.task('watch', ['path'],  () => {
  
  console.log(`\n?? Watching source: ${PATH.src}\n`);

  const watcher = gulp.watch(PATH.src, ['clean']);
  watcher.on('change', (event) => {
    const p = event.path,
          t = event.type;

    const src = p,
          pdf = path.dirname(p) + path.basename(p, '.docx') + '.pdf';

    exec(`cscript saveAsPDF.js ${src} ${pdf}`)
      .then( () => {
        console.log(`\nPDF saved to: ${pdf}\n`);
        
        function asyncUpload(file) {
          return readFile(file)
                   .then( (content) => {
                     return dbx.filesUpload({
                       contents: content,
                       path: PATH.dest + path.basename(file),
                       mode: {
                         '.tag': 'overwrite'
                       },
                       autorename: false
                     });
                   })
                   .then( (res) => {
                     return Promise.resolve(res);
                   })
                   .catch( (err) => {
                     return Promise.reject(err);
                   });
        };
        const asyncUploadTasks = [ src, pdf ].map( asyncUpload );
      
        return Promise.all(asyncUploadTasks)
                      .then( (msgs) => {
                         msgs.forEach( (msg) => {
                           console.log(msg);
                         });
                        
                         return Promise.resolve(`\n${src} and ${pdf} uploaded ^_^`);
                      })
                      .catch( (err) => {
                         return Promise.reject(err);
                      });
      })
      .then( (successMsg) => {
        console.log(successMsg);
      })
      .catch( (err) => {
        console.log(err);
      });
  });

});

gulp.task('default', ['watch']);
