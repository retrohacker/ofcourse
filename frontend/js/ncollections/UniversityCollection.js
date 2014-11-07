var UniversityCollection = Backbone.Collection.extend({
  model: University
});

//Create University model instances

//Southern Illinois University
var siu = new University({name:'Southern Illinois University',location:'Carbondale, IL'})


//Add models to Collection
var universityCollection = new UniversityCollection([
  siu
]);