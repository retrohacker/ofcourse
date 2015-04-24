var argv = require('yargs').argv
var path = require('path')
var cheerio = require('cheerio')
var fs = require('fs')

// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

var usage =
  "Usage: index.js [file]\n"+
  "[file] is the html dump from salukinet"

if(argv._.length !== 1) return printUsage()

var file = path.resolve(argv._[0])

var file = fs.readFileSync(file)

var $ = cheerio.load(file)

/**
 * Begin program logic
 */

/**
 * States:
 *   + none: Haven't started parsing
 *   + title: title row
 *   + header: header row
 *   + default: content row
 */
var state = 'none'
var titles = []
var siu = {}
var classes = siu.classes = []
$('.datadisplaytable').children('tbody').children('tr').each(function(i) {
  var element = $(this)
  var childClass = element.children().first().attr('class').slice(2)
  /**
   * Ensure state transition is fine
   */
  if(!stateIsValid(state,childClass))
    return invalidState(state,childClass)
  state = childClass

  switch(childClass) {
  case 'title':
    break
  case 'header':
    titles = getColumnsTitle(element)
    break;
  case 'default':
    classes.push(getColumnValues(titles,element))
    break;
  default:
    console.error('Unrecognized class: '+childClass)
    process.exit(1)
    break;
  }
})

var mapTags = {
  'CRN'        : 'CRN',
  'Subj'       : 'department',
  'Crse'       : 'number',
  'Sec'        : 'section',
  'Title'      : 'title',
  'Location'   : 'location',
  'Instructor' : 'instructor'
}

// Cleanup the data
classes.forEach(function(v,i) {
  var newClass = {}
  newClass.cron = []
  if(v['CRN'] === ' ') { // We have multiple meeting times
    while(classes[i]['CRN'] === ' ') { //Empty space is unicode for something
      i--
    }
    if(v['Days'] !== 'TBA' &&  v['Time'] !== 'TBA')
      classes[i].cron.push(createTime(v['Days'],v['Time']))
  }
  if(v['Days'] !== 'TBA' &&  v['Time'] !== 'TBA')
    newClass.cron.push(createTime(v['Days'],v['Time']))

  Object.keys(mapTags).forEach(function(v2) {
    newClass[mapTags[v2]] = v[v2]
  })

  var date = v['Date (MM/DD)'].split('-')
  var start = date[0].split('/')
  var end = date[1].split('/')
  if(start[0] == 12)
    start = '2014'+start[0]+start[1]
  else
    start = '2015'+start[0]+start[1]
  if(end[0] == 12)
    end = '2014'+end[0]+end[1]
  else
    end = '2015'+end[0]+end[1]

  newClass.start = start
  newClass.end = end

  classes[i] = newClass
})

var looped = false
while(!looped) {
  for(var i = 0; i < classes.length; i++) {
    looped = true
    if(classes[i]['CRN'] === ' ') {
      classes.remove(i)
      looped = false
      break;
    }
    delete classes[i]['CRN']
  }
}

var departments = siu.departments = {}
// Add departments
classes.forEach(function(v,i) {
  if(v['department'])
    departments[v['department']] = true
})
console.log(JSON.stringify(siu,null,' '))


/**
 * End program logic
 */

function createTime(days,time) {
  //Convert to military time integers
  time = ''+time

  time = time.split('-')
  // 0 = start 1 = stop
  time[0] = time[0].trim()
  time[1] = time[1].trim()
  // 0 = time 1 = meridiem
  time[0] = time[0].split(' ')
  time[1] = time[1].split(' ')
  var meridiem = []
  meridiem[0] = time[0][1]
  meridiem[1] = time[1][1]
  // 0 = hour 1 = minute
  time[0] = time[0][0].split(':')
  time[1] = time[1][0].split(':')

  time[0][0] = time[0][0] | 0
  time[1][0] = time[1][0] | 0
  time[0][1] = time[0][1] | 0
  time[1][1] = time[1][1] | 0
  if(time[0][0] === 12) time[0][0] = 0
  if(time[1][0] === 12) time[1][0] = 0
  if(meridiem[0] === 'pm') time[0][0]+=12
  if(meridiem[1] === 'pm') time[1][0]+=12
  duration = (time[1][0] * 60 + time[1][1]) - (time[0][0] * 60 + time[0][1]) //minutes
  time[0][0] += 5 // to UTC
  var incrDay = false
  if(time[0][0] > 24) {
    time[0][0]-=24
    incrDay = true
  }

  days = ''+days
  days = days.trim().split('').map(function(day) {
    switch(day) {
    case 'M':
      return (incrDay) ? 'Tue' : 'Mon'
      break
    case 'T':
      return (incrDay) ? 'Wed' : 'Tue'
      break
    case 'W':
      return (incrDay) ? 'Thu' : 'Wed'
      break
    case 'R':
      return (incrDay) ? 'Fri' : 'Thu'
      break
    case 'F':
      return (incrDay) ? 'Sat' : 'Fri'
      break
    case 'S':
      return (incrDay) ? 'Sun' : 'Sat'
      break
    case 'U':
      return (incrDay) ? 'Mon' : 'Sun'
      break
    default:
      console.error('Unknown day '+day)
      return null
    }
  }).join()
  //Convert to cron
  cronStart = time[0][1]+" "+time[0][0]+" * * "+days
  return {cron:cronStart,duration:duration*60}
}

function getColumnsTitle(element) {
  var titles = []
  element.children().each(function(i) {
    titles.push($(this).text())
  })
  return titles
}

function getColumnValues(titles,element) {
  var values = {}
  element.children().each(function(i) {
    values[titles[i]] = $(this).text()
  })
  return values
}

function stateIsValid(oldState,newState) {
  switch(oldState) {
  case 'none':
    return newState === 'title'
  case 'title':
    return newState === 'header'
  case 'header':
    return newState === 'default'
  case 'default':
    return newState === 'title' || newState === 'default'
  }
}

function invalidState(oldState,newState) {
  console.log('Invalid transition from: '+oldState+', '+newState)
  process.exit(1)
}

function printUsage() {
  console.log(usage)
  process.exit(1)
}

