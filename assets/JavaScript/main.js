console.log("hello")

var config = {
    apiKey: "AIzaSyDINqkD3A8vIWb9JAoIo1A0SNwPtfEaU7o",
    authDomain: "train-time-5ad44.firebaseapp.com",
    databaseURL: "https://train-time-5ad44.firebaseio.com",
    projectId: "train-time-5ad44",
    storageBucket: "train-time-5ad44.appspot.com",
    messagingSenderId: "798477835633"
  };
  firebase.initializeApp(config);
  var database = firebase.database()


var trainName = ""
var destination = ""
var frequency = 0
var nextArrival = 0
var minutesAway = 0

database.ref().on("child_added", function(snapshot){
var tName = snapshot.val().trainName;
var tdestination = snapshot.val().destination;
var tfrequency = snapshot.val().frequency;
var tFirstTrain = snapshot.val().firstTrain;
var timeArray = tFirstTrain.split(":")
console.log(tFirstTrain)
console.log(timeArray)


var trainTime = moment().hours(timeArray[0]).minutes(timeArray[1])
var maxMoment = moment.max(moment(),trainTime)

var tMinutes;
var tArrival;

if (maxMoment === trainTime) {
    tArrival = trainTime.format("hh:mm A");
    tMinutes = trainTime.diff(moment(), "minutes")    
} else {
    var diffTimes = moment().diff(trainTime, "minutes");
    var remainder = diffTimes%tfrequency;
    tMinutes = tfrequency - remainder;
    tArrival = moment().add(tMinutes, "m").format("hh:mm A")
}

$("#train-table > tbody").append("<tr><td>" + tName + "</td><td>" + tdestination + "</td><td>" + tfrequency + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td></tr>")


})


$(document).on("click", ".addTrain", function(){
    trainName = $("#trainName-input").val().trim();
    console.log(trainName)
    destination = $("#destination-input").val().trim();
    console.log(destination)
    firstTrain = $("#firstTrain-input").val().trim();
    console.log(firstTrain)
    frequency = $("#frequency-input").val().trim();
    console.log(frequency)

    database.ref().push( {
        trainName:trainName,
        destination:destination,
        frequency:frequency,
        firstTrain:firstTrain,
        dateAdded:firebase.database.ServerValue.TIMESTAMP
    })

})
