/**
 * This module will bootstrap the DB if it isn't already initialized
 *
 * NOTE:
 * Do *NOT* assume you are the only one using the database. There could be
 * one ofcourse process running or 1000, and they will all call this init.
 */
module.exports = function(db) {
  db('CREATE TABLE IF NOT EXISTS "users" ("fname" VARCHAR(50), "lname" VARCHAR(50), "age" INT,"graduationYear" INT)',function(e) {
    if(e) throw e
  })
}
