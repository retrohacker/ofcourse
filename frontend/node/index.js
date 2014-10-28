// Allow jade templates to be renedered clientside
window.jade = require('./runtime.js')

// Logic for turning JADE into functions
Object.keys(JADE).forEach(function(v) {
  console.log("Evaluating "+v+".jade") //allows us to debug
  eval("JADE['"+v+"'] = "+JADE[v])
})
