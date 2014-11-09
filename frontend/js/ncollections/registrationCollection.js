//This is a function for creating a Forms collection
//for the "Registration" page.
function registrationCollection() {
  //Create Entry models
  var firstName = new Entry({id:"fname",desc:"First Name",name:"firstName"});
  var lastName = new Entry({id:"lname",desc:"Last Name",name:"lastName"});
  var emailAddress = new Entry({id:"email",desc:"E-mail",name:"email"});

  //Add entry models to Forms collection
  var regFields = new Forms([
    firstName,
    lastName,
    emailAddress
  ]);

  //Return the collection to be passed to the FormView
  return regFields;
}
