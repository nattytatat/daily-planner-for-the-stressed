// To test other dates, change the date in today variable below
// var today = moment("22/01/23", "DD/MM/YY").format("[Today is - ] dddd, Do MMMM YYYY");
// Variables - starting with defining today and format
var today = moment().format('[Today is - ] dddd, Do MMMM YYYY');
var currentTime = moment();
// Define the working hour start
var dayStart = 9;
var container = $('.container');

// print date to page
$("#currentDay").text(today);

// clears the page for a new stored date
var storedDate = localStorage.getItem('storedDate');
if (storedDate !== today) {
  localStorage.clear();
  localStorage.setItem('storedDate', today);
}


// List the current working hours of the day in timeblock
for (var i = dayStart; i <= 17; i++) {
    // dynamically create HTML elements for each hour
    var theRow = $('<div>').addClass('row');
    var theHour = $('<div>').addClass('hour d-flex justify-content-center align-items-center col-2');
    var timeBlock = $('<div>').addClass('time-block col-12');
    var textArea = $('<textarea>').addClass('description col-8');

    var saveBtn = $('<button><i class="fas fa-save"></i>').addClass('saveBtn col-2');

    // chain methods together and print in hour
    var hourFormat = moment().hours(i).minutes(0).seconds(0).format('kk:mm a');
    var textAreaId = i;
    theHour.text(hourFormat);
    //add id to the textarea, prefix hour string and add the hour in 24hr format
    textArea.attr('id', 'hour-'+ textAreaId);
    // retrieve data from localstorage
    var storedValue = localStorage.getItem(textAreaId);
    if(storedValue){
    textArea.val(storedValue);
    }

    // to check if past, present or future 
    var thisHour = moment().hours(i);

    // use hours method to check time to change bg colour
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
    // assign the id from the sibling to the variable - remove hour string from id
    var id = $(this).siblings('.description').attr('id').split('-')[1]; 
    // if description is not empty- set items to local storage
    if (description == "") {
        alert('You need to enter an event!')
        return;
    } else if (description !== "") {
        localStorage.setItem(id,description)
        var display = $('<p>').addClass('text-center');
        display.text('Event added to local storage');
        display.prependTo(container);

        setTimeout(() => {
            display.remove();
          }, 5000);

    }
});





