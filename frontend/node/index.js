// Allow jade templates to be renedered clientside
window.jade = require('./runtime.js')

// Logic for turning JADE into functions
Object.keys(JADE).forEach(function(v) {
  eval("JADE['"+v+"'] = "+JADE[v])
})
