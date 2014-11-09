var UniversityCollection = Backbone.Collection.extend({
  model: University
});

//Create University model instances

//Southern Illinois University
var siu = new University({name:'Southern Illinois University',location:'Carbondale, IL'})
var delaware = new University({name:'The Delaware One',location:'Somewhere, DE'})

//Add models to Collection
var universityCollection = new UniversityCollection([
  siu,
  delaware
]);