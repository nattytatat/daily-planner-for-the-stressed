// Variables - starting with defining today and format
var today = moment().format("[Today is - ] dddd, Do MMMM YYYY");
// time now in 24 hour clock
var timeNow = moment().format("kk:mm:ss a");
// Define the working hours
var dayStart = 9;
// var dayStart = moment().hours(9).minutes(0).seconds(0);
// var dayEnd = moment().hours(17).minutes(0).seconds(0);
// current hour
var currentHour = moment().hours();
var container = $('.container');
// What the user types
// var theEventInput = $("");

// print date to page
$("#currentDay").text(today);

// console.log(timeNow);

// for (var i = dayStart; i <= 17; i++) {
//     console.log("Each hour " + i);
// }

// List the current working hours of the day in timeblock
for (var i = dayStart; i < 17; i++) {
    // dynamically create HTML elements for each hour
    var theRow = $('<div>').addClass('row');
    var theHour = $('<div>').addClass('hour col-2');
    var timeBlock = $('<div>').addClass('time-block col-12');
    var textArea = $('<textarea>').addClass('col-8');
    var saveBtn = $('<button><i class="fas fa-save"></i>').addClass('saveBtn col-2');

    var hourFormat = moment().hours(i).minutes(0).seconds(0).format("h:mm a");
    theHour.text(hourFormat);
    textArea.attr("id", hourFormat);
    // textarea.attr("id", i+":00");
    
    theRow.append(
        timeBlock,
        theHour,
        textArea,
        saveBtn
    );
    textArea.append(timeBlock);

    theRow.appendTo(container);
  }
  

// event listener for saveBtn
