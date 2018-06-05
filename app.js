


// Initialize Firebase
var config = {
    apiKey: "AIzaSyD3OXQgPa95Q1PrXZxNwThcU8CeFeNL0hc",
    authDomain: "trainschedule-a5c1d.firebaseapp.com",
    databaseURL: "https://trainschedule-a5c1d.firebaseio.com",
    projectId: "trainschedule-a5c1d",
    storageBucket: "",
    messagingSenderId: "967815597222"
};
firebase.initializeApp(config);


// Create a variable to reference the database.
var database = firebase.database();

var trainName = "";
var destination = "";
var firstTrain = "";
var frequency = "";
var nextArrival = "";
var minsAway = "";
var currentTime = moment();

/* <th scope="col">Train Name</th>
    <th scope="col">Destination</th>
    <th scope="col">Frequency (min)</th>
    <th scope="col">Next Arrival</th>
    <th scope="col">Minutes Away</th> */


// First Time (pushed back 1 year to make sure it comes before current time)
var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
// Current Time
var currentTime = moment();
// Difference between the times
var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
// Time apart (remainder)
var tRemainder = diffTime % frequency;
// Minute Until Train
var tMinutesTillTrain = frequency - tRemainder;
// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");

// $(function () {
//     $('#datetimepicker12').datetimepicker({
//         inline: true,
//         sideBySide: true
//     });
// });



$("#submit-train").on("click", function (event) {
    event.preventDefault();

    //var tableRow = $("<tr>")

    trainName = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    firstTrain = $("#first-train").val().trim();
    frequency = $("#frequency").val().trim();
    console.log(firstTrain);
    //console.log(employeeName);
    //console.log(employeeRole);
    // Code for handling the push



    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP,
    });

    $("#train-name").val("");
    $("#destination").val("");
    $("#frist-train").val("");
    $("#frequency").val("");

});

database.ref().on("child_added", function (snapshot) {
    // Log everything that's coming out of snapshot
    console.log(snapshot.val());
    console.log(snapshot.val().trainName);
    console.log(snapshot.val().destination);
    console.log(snapshot.val().firstTrain);
    console.log(snapshot.val().frequency);
    // Change the HTML to reflect
    // $("#name-display").text(snapshot.val().name);
    // $("#email-display").text(snapshot.val().email);
    // $("#age-display").text(snapshot.val().age);
    // $("#comment-display").text(snapshot.val().comment);

    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

database.ref().orderByChild("dateAdded").on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());
    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().firstTrain;
    var frequency = childSnapshot.val().frequency;
    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
    // Current Time
    var currentTime = moment();
    // Difference between the times
    var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    // Minute Until Train
    var tMinutesTillTrain = frequency - tRemainder;
    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");

    $("#employee-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
        frequency + "</td><td>" + moment(nextTrain).format("hh:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>");
    beeRight();
});

function beeLeft() {
    $("#train").animate({ left: "-=500" }, 2000, "swing", beeRight);
}
function beeRight() {
    $("#train").animate({ left: "+=500" }, 2000, "swing", beeLeft);
}

