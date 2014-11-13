//This is a function for creating a Forms collection
//for the "Login" page.
function loginCollection() {
  //Create Entry models
  var emailAddress = new Entry({id:"email",desc:"E-mail",name:"email"});

  //Add entry models to Forms collection
  var regFields = new Forms([
    emailAddress
  ]);

  //Return the collection to be passed to the FormView
  return regFields;
}
