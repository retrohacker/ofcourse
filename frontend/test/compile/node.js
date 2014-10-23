var path = require('path')
var fs = require('fs-extra')
var exec = require('child_process').exec
var assert = require('assert')
var async = require('async')
var Node = require('../../compile/node.js')

var dir = path.join(__dirname,"_node")
var glob = path.join(dir,"*.js")

var deps = [
  "async"
]

var output = {
  "index.js":"var async = require('async'); var test=['lol','wut']; async.each(test,function(str,cb){console.log(str);cb();},function(e){});"
}

describe('browserifyNode()',function() {
  before(function(next) {
    //create test dir
    fs.mkdirp(dir,function(e) {
      assert(!e,"No error creating test dir")
      //create package.json
      fs.writeFile(path.join(dir,"package.json"),"{}",function(e) {
        assert(!e,"No error generating package.json")
        //install deps
        exec('cd '+dir+" && npm install --save "+deps.join(" "),function(e,so,se) {
          assert(!e,"No error installing deps")
          //create files
          async.each(Object.keys(output)
          ,function(file,cb) {
            fs.writeFile(path.join(dir,file),output[file],cb)
          }
          ,function(e) {
            assert(!e,"No error creating node files")
            next()
          })
        })
      })
    })
  })

  after(function(next) {
    fs.remove(dir,function(e) {
      assert(!e,"No error cleaning up dir")
      next()
    })
  })

  it('should create js file',function(next) {
    new Node().browserify(glob,function(e,file) {
      assert.equal(typeof file,'string')
      next()
    })
  })

  it('should have async in generated file',function(next) {
    new Node().browserify(glob,function(e,file) {
      assert.equal(typeof file,'string')
      assert.notEqual(file.indexOf('var async = {};'),-1,"async object declared")
      next()
    })
  })
})
