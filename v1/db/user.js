var user = module.exports = {}

var db = require('./conn.js')
var sql = require('./sql.js')
var models = require('../models')

//USING POSTGRES
user.insert = function insert(values,cb) {
  var insert = sql.insert(models.User,values.toJSON())
  db(insert.str,insert.arr,function(e,rows,result) {
    if(e) return cb(e)
    return cb(null,result.rows[0].id)
  })
}

user.update = function update(values,cb) {
  var update = sql.update(models.User,values.toJSON())
  db(update.str,update.arr,function(e,rows,result) {
    if(e) return cb(e)
    return cb(null,result.rows[0].id)
  })
}

user.get = function get(id,cb) {
  db("select * from users where id="+id,function(e,rows,result) {
    if(e) return cb(e)
    cb(null,result.rows[0])
  })
}

user.getEvents = function getEvents(id,cb) {
  db("select * from events where userid="+id,function(e,rows,result) {
    if(e) return cb(e)
    for(i = 0; i < result.rows.length;i++){

      //correct start time
      var stringDate = String(result.rows[i].start)
      var splitDate = stringDate.split(" ")
      //replace timestamp with utc (DB assumes local but is really UTC)
      splitDate[5] = 'GMT-0000'
      splitDate[6] = '(UTC)'
      dateString = splitDate.join(" ")
      //set start as corrected timezone timestamp
      result.rows[i].start = new Date(dateString)

      // repeat for end date
      stringDate = String(result.rows[i].end)
      splitDate = stringDate.split(" ")
      splitDate[5] = 'GMT-0000'
      splitDate[6] = '(UTC)'
      dateString = splitDate.join(" ")
      result.rows[i].end = new Date(dateString)
    }
  
    cb(null,result.rows)
  })
}

user.getEventsByCourseID = function getEventsByCourseID(userid,courseid,cb) {
  db("select * from events where courseid="+courseid+" AND userid="+userid,function(e,rows,result) {
    if(e) return cb(e)
    cb(null,result.rows)
  })
}

user.getUniversityByUserID = function getUniversityByUserID(userid,cb) {
  db("select * from users where id="+userid,function(e,rows,result) {
    if(e) return cb(e)
    if(result.rows[0]) return cb(null,result.rows[0].university)
    else return cb(e,null)
  })
}

user.getCoursesByUniversity = function getCoursesByUniversity(university,cb) {
  db("select * from courses where university='"+university+"'",function(e,rows,result) {
    if(e) return cb(e)
    cb(null,result.rows)
  })
}

user.getUserByEmail = function getUserByEmail(email,done) {
  db("select * from users where email = '"+email+"'", function(err, rows, result) {
    if(err) return done(err,null)
    if(result.rowCount == 0) {
      return done('no users with that email address',null)
    }
    if(result.rowCount > 1) {
      return done('error: multiple users with that email address',rows[0])
    }
    return done(null,rows[0])
  });
}

user.addCourse = function addCourse(course,userid,done) {
  var insert = sql.insert(models.Course,course.toJSON())
  db(insert.str,insert.arr, function(err, rows, result) {
    if(err) return done(err,null)
    return done(null,result.rows[0].id)
  });
}

user.addEvent = function addEvent(userEvent,userid,done){
  userEvent.set({'userid': userid})
  var insert = sql.insert(models.Event,userEvent.toJSON())
  db(insert.str,insert.arr, function(err, rows, result) {
    if(err) return done(err,null)
    return done(null,result.rows[0].id)
  });
}

user.addParentEvent = function addParentEvent(parentEvent,done){
  var insert = sql.insert(models.ParentEvent,parentEvent.toJSON())
  db(insert.str,insert.arr, function(err, rows, result) {
    if(err) return done(err,null)
    return done(null,result.rows[0].id)
  });
}

user.getUniversities = function getUniversity(cb) {
  db("select * from universities",function(e,rows,result) {
    if(e) return cb(e)
    cb(null,result.rows)
  })
}
