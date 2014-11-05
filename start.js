var gaze = require('gaze')
var path = require('path')

var ignore = [
  'jade.js',

]

var spawn = require('child_process').spawn
var node = spawn('node',['index.js'])
node.stdout.on('data',function(chunk) {
  process.stdout.write(chunk)
})
node.stderr.on('data',function(chunk) {
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
    if(ignore.indexOf(path.basename(filepath))!==-1) return null
    console.log(filepath + ' was ' + event);
    spawn('node',['frontend/compile.js']).stdout.on('data',function(chunk) {
      process.stdout.write(chunk)
    })
    node.kill()
    node = spawn('node',['index.js'])
    node.stdout.on('data',function(chunk) {
      process.stdout.write(chunk)
    })
    node.stderr.on('data',function(chunk) {
      process.stdout.write(chunk)
    })
  });
});

