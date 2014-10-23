/*
 * compile/node.js contains all the logic for jade files in the asset pipeline
 */

///Import Modules
var glob = require('glob')
var exec = require('child_process').exec
var path = require('path')
///

///Declare Globals
var browserifyPath = path.dirname(require.resolve('browserify'))
var browserifyPJSON = require(path.join(browserifyPath,"package.json"))
var browserifyCMD = path.join(browserifyPath,browserifyPJSON.bin.browserify)
///End Globals

///Export an Object
var m = module.exports = function() {}
m.prototype = Object.create(Object.prototype)
m.prototype.constructor = m
///

/// Declare functions on exported object
/**
 * browserify accepts a glob path to your node files and generates a single
 * javascript file that can be run clientside without the node runtime
 */
m.prototype.browserify = function(glob_exp,cb) {
  glob(glob_exp,function(e,files) {
    if(e) return cb(e)
    exec(browserifyCMD+" "+files.join(" "),{maxBuffer:"1000*1024"},function(e,so,se) {
      if(e) return cb(e)
      //return cb(null,so)
      return cb(null,so)
    })
  })
}
///
