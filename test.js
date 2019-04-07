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
var selection = "";

function searchInput(){

  const selectElement = document.querySelector('.dropdown');
  //console.log(selectElement);
  selectElement.addEventListener("change", (event) => {
    // grabbing category selected
    selection = event.target.value;
    //console.log("searched " + selection);
  });
  var searchItem = document.getElementById('searchbar').value;
  console.log("selection " + selection + " searchbar "+ searchItem );

  var search_field = selection;
  var search_input = searchItem;
  var search_result = search(search_field, search_input);
  console.log(search_result);

  for (var idx = 0; idx < search_result.length; idx++) {
    var elem = search_result[idx];
    var elem_info = info(elem);
    var info_return = JSON.stringify(elem_info);
  }

  document.getElementById('searchOutputM').innerHTML = info_return;

};

/*
 * Defining a table
 * Use Bootstrap styling: jumbotron, container, media, border, p-3,  mr-3, mt-3, rounded-circle, media-body
 * Input: A person's name, major, hobbies, email, number, location
 * Processing: Calls writeNewUserData to store data into database
 * Output: Name and The saying using the innerHTML property
 */
function menteeInput() {
  //prompt the user name from the text field with nameInputBox id and store it
  var name = document.getElementById('nameInputBox').value;
  var major = document.getElementById('majorInputBox').value;
  var hobbies = document.getElementById('hobbiesInputBox').value;
  var email = document.getElementById('emailInputBox').value;
  var number = document.getElementById('numberInputBox').value;
  var college = document.getElementById('collegeInputBox').value;
  var image = "https://cdn4.vectorstock.com/i/1000x1000/18/98/user-icon-female-person-symbol-profile-avatar-sign-vector-18991898.jpg";
  var status = "mentee";
  // use string concatenation to create a personalized saying
  var saying = "Here are some matches of possible mentors according to " + name + " " + major + " " + hobbies;

  //store data into database
  writeNewUserData(name, major, hobbies, email, number, college, image, status);

  var match_result = match(name);
  //display the saying in the div that has the outputDiv
  document.getElementById('outputName').innerHTML = name + ",";
  document.getElementById('outputSaying').innerHTML = match_result;
};
function mentorInput() {
  //prompt the user name from the text field with nameInputBox id and store it
  var name = document.getElementById('nameInputBoxM').value;
  var major = document.getElementById('majorInputBoxM').value;
  var hobbies = document.getElementById('hobbiesInputBoxM').value;
  var email = document.getElementById('emailInputBoxM').value;
  var number = document.getElementById('numberInputBoxM').value;
  var college = document.getElementById('collegeInputBoxM').value;
  var image = "https://cdn4.vectorstock.com/i/1000x1000/18/98/user-icon-female-person-symbol-profile-avatar-sign-vector-18991898.jpg";
  var status = "mentor";
  // use string concatenation to create a personalized saying
  var saying = "Here are some matches of possible mentees according to " + name + " " + major + " " + hobbies;

  // store data into database
  writeNewUserData(name, major, hobbies, email, number, college, image, status);

  var match_result = match(name);
  console.log("Matching result " + match_result);
  //display the saying in the div that has the outputDiv
  document.getElementById('outputNameM').innerHTML = name + ",";
  document.getElementById('outputSayingM').innerHTML = match_result;
};


 //give us the similariry  (returning name of person)
function search(field, input) {
  var ref = db.ref();
  var name_list = [];
  db.ref().on("child_added", snap => {
    var value = snap.child(field).val();
    if (value.toLowerCase() == input.toLowerCase()) {
      var name = snap.child("Name").val();
      name_list.push(name);
    }
  });
  return name_list;
};

function info(name) {
  var user_ref = db.ref().child(name);
  user_ref.on('value', function(snapshot) {
    user = snapshot;
  });

  var info = {
    "Name": user.child("Name").val(),
    "Major": user.child("Major").val(),
    "Hobbies": user.child("Hobbies").val(),
    "College": user.child("College").val(),
    "Email": user.child("Email").val(),
    "Number": user.child("Number").val(),
    "Status": user.child("Status").val()
  }

  return info;
};


function match(name) {
  var user_ref = db.ref().child(name);
  user_ref.on('value', function(snapshot) {
    user = snapshot;
  });
  var name_list = [];
  var match3 = [];
  var match2 = [];
  var match1 = [];
  var match0 = [];

  var user_major = String(user.child("Major").val());
  var user_hobbies = String(user.child("Hobbies").val());
  var user_college = String(user.child("College").val());

  //console.log(user_major);
  //console.log(user_hobbies);
  //console.log(user_college);

  db.ref().on('value', function(snapshot) {
    snapshot.forEach(function(snap) {
      if (snap.child("Status").val() != user.child("Status").val()) {
        var match = 0;
        var major = String(snap.child("Major").val());
        var hobbies = String(snap.child("Hobbies").val());
        var college = String(snap.child("College").val());

        if (snap.child("Name").val() != user.child("Name").val()) {
          // Check for matches
          if (major.toLowerCase() == user_major.toLowerCase()) {
            match += 1;
          }
          if (hobbies.toLowerCase() == user_hobbies.toLowerCase()) {
            match += 1;
          }
          if (college.toLowerCase() == user_college.toLowerCase()) {
            match += 1;
          }

          // Populate the matches arrays
          if (match == 3) {
            match3.push(snap.child("Name").val());
          }
          else if (match == 2) {
            match2.push(snap.child("Name").val());
          }
          else if (match == 1) {
            match1.push(snap.child("Name").val());
          }
          else {
            match0.push(snap.child("Name").val());
          }
        }
      }
    });
  });

  console.log("match3: " + match3.length);
  console.log("match2: " + match2.length);
  console.log("match1: " + match1.length);
  console.log("match0 " + match0.length);

  // Add all of the matches in the main name list to sort list by matches
  for (var i = 0; i < match3.length; i++) {
    name_list.push(match3[i]);
  }

  for (i = 0; i < match2.length; i++) {
    name_list.push(match2[i]);
  }

  for (i = 0; i < match1.length; i++) {
    name_list.push(match1[i]);
  }

  for (i = 0; i < match0.length; i++) {
    name_list.push(match0[i]);
  }
  // return the top 5 results
  console.log(name_list.length)
  console.log(name_list.slice(0,5))
  return name_list.slice(0,5);

};

function writeNewUserData(name, major, hobbies, email, number, college, imageUrl, status) {
  var data = {
    Name: name,
    Major: major,
    Hobbies: hobbies,
    Email: email,
    Number: number,
    Image: imageUrl,
    College: college,
    Status: status
  };

   db.ref(name).set(data);
};
