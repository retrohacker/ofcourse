function createCourseCollection() {
  var title = new Entry({id:"title", desc:"Title of Course", name:"title"});
  var number = new Entry({id:"number", desc:"Course Number", name:"number"});
  var section = new Entry({id:"section", desc:"Section Number", name:"section"});
  var start = new Entry({id:"start", desc:"Start Time of Course", name:"start"});
  var end = new Entry({id:"end", desc:"Ending Time of Course", name:"end"});

  var createCourseFields = new Forms([
    title,
    number,
    section,
    start,
    end
  ]);

  return createCourseFields;
}
