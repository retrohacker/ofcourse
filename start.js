var gaze = require('gaze')

var spawn = require('child_process').spawn
spawn('node',['index.js']).stdout.on('data',function(chunk) {
  process.stdout.write(chunk)
})

spawn('node',['frontend/compile.js']).stdout.on('data',function(chunk) {
  process.stdout.write(chunk)
})

var paths = [
  '*.js',
  '{v1,test}/**/*.{jade,css,js}',
  'frontend/*.{jade,css,js}',
  'frontend/{compile,css,jade,js,test}/**/*.{jade,css,js}',
]

gaze(paths, function(err, watcher) {
  console.log("Watching directory for changes...")
  // On changed/added/deleted
  this.on('all', function(event, filepath) {
    console.log(filepath + ' was ' + event);
    spawn('node',['frontend/compile.js']).stdout.on('data',function(chunk) {
      process.stdout.write(chunk)
    })
  });
});

