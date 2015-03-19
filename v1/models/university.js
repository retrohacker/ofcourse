//NOTE: This file exists as a symbolic link in frontend/js/models
var Backbone = Backbone || require('backbone')

var UniversityModel =  Backbone.Model.extend({
  validate:function(attributes,options){    
    if(typeof attributes.id != 'number')
      return 'expected number for id'
    if(attributes.id < 0)
      return 'expected university id to be greater than 0'
    if(typeof attributes.name == 'undefined')
      return 'expected university to have a title'
    if(attributes.name.length > 50)
      return 'university name is too long. 50 chars max.'
    if(typeof attributes.abbreviation == 'undefined')
      return 'expected university to have a abbreviation'
    if(attributes.abbreviation.length > 8)
      return 'university abbreviation is too long. 8 chars max.'
    if(attributes.state.length > 2)
      return 'state abbreviation is too long. 2 chars max.'
    if(attributes.city.length > 50)
      return 'city abbreviation is too long. 50 chars max.'
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
