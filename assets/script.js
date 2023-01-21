// Variables - starting with defining today and formate
var today = moment().format("[Today is - ] dddd, Do MMMM YYYY");
var currentTime = moment();
// Define the working hours
var dayStart = 9;
var container = $('.container');
// What the user types
// var theEventInput = $("");

// print date to page
$("#currentDay").text(today);

// List the current working hours of the day in timeblock
for (var i = dayStart; i <= 17; i++) {
    // dynamically create HTML elements for each hour
    var theRow = $('<div>').addClass('row');
    var theHour = $('<div>').addClass('hour col-2');
    var timeBlock = $('<div>').addClass('time-block col-12');
    var textArea = $('<textarea>').addClass('description col-8');

    var saveBtn = $('<button><i class="fas fa-save"></i>').addClass('saveBtn col-2');

    // chain methods together and print in hour
    var hourFormat = moment().hours(i).minutes(0).seconds(0).format('kk:mm a');
    var textAreaId = moment().hours(i).format('kk');
    theHour.text(hourFormat);
    //add id to the textarea, prefix hour string and add the hour in 24hr format
    textArea.attr('id', 'hour-'+ textAreaId);
    // textarea.attr("id", i+":00");

    // to check if past, present or future 
    var thisHour = moment().hours(i);

    // need to add the hours method to compare as different data types on their own - returning false
    if (thisHour.hours() < currentTime.hours()) {
        textArea.addClass('past');
    } else if (thisHour.hours() === currentTime.hours()) {
        textArea.addClass('present')
    } else if (thisHour.hours() > currentTime.hours()) {
        textArea.addClass('future')
    }

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
$('.saveBtn').on('click', function(event){
    event.preventDefault();
    // get the description from the sibling button that is clicked
    var description = $(this).siblings('.description').val();
    // assign the id from the sibling to the vaariable
    var id = $(this).siblings('.description').attr('id');
    // test output
    console.log(id, description);
    // pass both keys to local storage
    localStorage.setItem(id, description);
});


