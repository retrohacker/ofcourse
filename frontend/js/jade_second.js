Object.keys(JADE).forEach(function(v) {
  console.log("Evaluating "+v+".jade") //allows us to debug
  eval("JADE['"+v+"'] = "+JADE[v])
})
