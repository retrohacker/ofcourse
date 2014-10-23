var assert = require('assert')
var Jade = require('../../compile/jade.js')
var jade = require('jade')
var async = require('async')
var fs = require('fs-extra')
var path = require('path')

var dir = path.join(__dirname,"_jade")
var suffix = ".jade"
var glob = path.join(dir,"*"+suffix)

var output = {
  "doctype":"doctype html",
  "html":"html(lang=en)\n  head\n    title=Woah\n  body\n    h1 ello m8"
}

describe('generateJade()',function() {

  before(function(next) {
    fs.mkdirs(dir,function(e) {
      assert.ok(!e,"No errors creating dir")
      //Create all the files
      async.each(Object.keys(output),createFile,function(e) {
        assert.ok(!e,"No errors creating files")
        next()
      })
    })
  })

  after(function(next) {
    //Cleanup all the files
    fs.remove(dir,function(e) {
      assert.ok(!e,"No errors cleaning up dir")
      next()
    })
  })

  it('should generate an object',function(next) {
    new Jade().generateJade(glob,function(e,json) {
      assert.ok(json,"generateJade()'s return value is not null")
      assert.equal(typeof json,"object","generateJade() returns an object")
      next()
    })
  })

  it('should compile JADE',function(next) {
    new Jade().generateJade(glob,function(e,json) {
      async.each(Object.keys(json)
      ,function(key,cb) {
        assert.equal(typeof json[key],"string","generated contents as string")
        assert.equal(json[key].indexOf("function template(locals) {"),0,"generated string is a function declaration")
        cb()
      }
      ,next)
    })
  })
})

function createFile(file,cb) {
  fs.writeFile(path.join(dir,file+suffix),output[file],cb)
}

function deleteFile(file,cb) {
  fs.unlink(path.join(dir,file+suffix),cb)
}
