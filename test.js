var config = {
  apiKey: "AIzaSyCEQR0qM-a_4bBt459h9Bvls4ke1axFGkg",
  authDomain: "hackxx-wis.firebaseapp.com",
  databaseURL: "https://hackxx-wis.firebaseio.com",
  projectId: "hackxx-wis",
  storageBucket: "hackxx-wis.appspot.com",
  messagingSenderId: "754230720319"
};

firebase.initializeApp(config);

var db = firebase.database();

/*
 * Defining a table
 * Use Bootstrap styling: jumbotron, container, media, border, p-3,  mr-3, mt-3, rounded-circle, media-body
 * Input: A person's name
 * Processing: Personalize the greeting and display a saying for that person
 * Output: Name and The saying using the innerHTML property
 */
function userInput() {
  //prompt the user name from the text field with nameInputBox id and store it
  var name = document.getElementById('nameInputBox').value;
  var major = document.getElementById('majorInputBox').value;
  var hobbies = document.getElementById('hobbiesInputBox').value;
  var email = document.getElementById('emailInputBox').value;
  var number = document.getElementById('numberInputBox').value;
  var location = document.getElementById('locationInputBox').value;
  // use string concatenation to create a personalized saying
  var saying = "Here are some matches of possible mentors according to " + name + " " + major + " " + hobbies;

  writeNewUserData(name, major, hobbies, email, number, location, "https://cdn4.vectorstock.com/i/1000x1000/18/98/user-icon-female-person-symbol-profile-avatar-sign-vector-18991898.jpg");

  //display the saying in the div that has the outputDiv
  document.getElementById('outputName').innerHTML = name + ",";
  document.getElementById('outputSaying').innerHTML = saying;
}


function writeNewUserData(name, major, hobbies, email, number, location, imageUrl) {
  var data = {
    Major: major,
    Hobbies: hobbies,
    Email: email,
    Number: number,
    Image: imageUrl,
    Location: location
  };

   db.ref(name).set(data);
}
