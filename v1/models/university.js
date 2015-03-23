var Backbone = Backbone || require('backbone')

var UniversityModel =  Backbone.Model.extend({
  validate:function(attributes,options){
  },
  defaults:{
    name: '',
    location: ''
  }
})

UniversityModel.tableName = "universities"
UniversityModel.types = {
  id: 'serial primary key',
  name: 'varchar(50) not null',
  abbreviation: 'varchar(8) not null',
  state: 'varchar(2)',
  city: 'varchar(50)'  
}

if(typeof module !== 'undefined' && module.exports) {
  module.exports = UniversityModel
}
