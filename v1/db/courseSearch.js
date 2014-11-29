var async = require('async')
var db = require('./database.js')
var elasticsearch = require('elasticsearch');
var CourseModel = require('../models/CourseModel.js')
var client = new elasticsearch.Client({
  host: process.env.ELASTICSEARCH_URL || 'localhost:9200',
  log: 'trace'
});

/**
 * INIT ElasticSearch
 */

// First lets delete all indexes from elastic search
async.waterfall([function(cb) {
  client.indices.delete({index:'*'},cb)
},
function(resp,status,cb) {
  // Now lets get all courses so we can populate the search
  db('select * from courses',cb)
},  
function(rows,res,cb) {
  // Now we populate the search
  var courses = []
  async.each(res.rows,
  function(v,cb) {
      client.index({index:'courses',type:'course',body:v},cb)
  },cb)
},
function(cb) {
  // Refresh our indexes
  client.indices.refresh({index:''},cb)
}],
function(e) {
  if(e) return console.log(e)
  console.log("Inserted everything into elastic search.")
})

/**
 *  Implement basic search
 *  opts object in the form of:
 *  {
 *    department: "cs",
 *    university: 1,
 *    number: 201,
 *     section: 1
 *  }
 *
 *  all properties optional
 */
module.exports = function search(opts,cb) {
  client.search({
    index:'courses',
    body: {
      query : {
        match: {
          department: opts.department,
          university: opts.university,
          number: opts.number,
          section: opts.section
        }
      }
    }
  },function(e,r) {
    if(e) return cb(e)
    var result = []
    async.each(r.hits.hits,
      function(v,cb) {
        result.push(new CourseModel(v._source))
        cb()
      },
      function(e) {
        if(e) return cb(e)
        return cb(null,result)
      }
    )
  })
}
