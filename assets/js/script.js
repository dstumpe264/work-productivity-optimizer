// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html. Done.
$(document).ready(function () {
    // TODO: Add a listener for click events on the save button. Done.
    //  This code should use the id in the containing time-block as a key to save the user input in
    // local storage. HINT: What does `this` reference in the click listener
    // function? How can DOM traversal be used to get the "hour-x" id of the
    // time-block containing the button that was clicked? How might the id be
    // useful when saving the description in local storage?

    // click save button
    $('.saveBtn').on('click', function(){
        // save user input from id using time-block into local storage
        // Hint: 'this'
        // what is the id? hour-9? this.id?
        // localStorage.setItem('time', time)
        // use this to target the button clicked on, use parent to get id of specific time block
        // what is the description? the description of the task added to calendar.
        var value = $(this).siblings('.description').val();
        var time = $(this).parent().attr('id');

        // save time and description
        // saves it as a key pair, can find all values for time...
        localStorage.setItem(time, JSON.stringify(value));

        // notify user the task has been saved
        // .notification in html 
        // change from hide to show
        $('.notification').addClass('show');
        
        // will need to clear notification.
        setTimeout(function(){
            $('.notification').removeClass('show');
        }, 5000);



    });
    //
    // TODO: Add code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour. HINTS: How can the id
    // attribute of each time-block be used to conditionally add or remove the
    // past, present, and future classes? How can Day.js be used to get the
    // current hour in 24-hour time?
    var currentDay = dayjs();
    var currentHour = currentDay.hour();
    // confirm what currenthour looks like
    console.log(currentHour);
    // update current time to display correct past, present or future
    // need to separate block hour from clicked on button to compare to current time to apply past, present, or future.
    // this. parent?
    
    // use jQuery to iterate over block hours and compare against current hour
    $('.time-block').each(function(){
        // need to separate hour int from text
        // parseInt will convert string to integer to make it easier to compare 
        // 'this' refers to the current iteration of time-block
        // split is where it removes hour- from div id to determine current time block
        // console.log used to figure out what 'this' looks like
        // console.log(this);
        // if currentHour is greater than time current time block
        if(currentHour > parseInt($(this).attr('id').split('-')[1])){
            // set time block to past

            $(this).addClass('past');
        }
        else if(currentHour < parseInt($(this).attr('id').split('-')[1])){
            // set time block to past
            $(this).addClass('future');
        }
        else{
            // set time block to present
            $(this).addClass('present');
        };
        // TODO: Add code to get any user input that was saved in localStorage and set
        // the values of the corresponding textarea elements. HINT: How can the id
        // attribute of each time-block be used to do this?
        var storedvalue = JSON.parse(localStorage.getItem($(this).attr('id')));
        $(this).children('.description').text(storedvalue);
        console.log($(this).children('.description').text());

        
    });
    
    //
    //
    // TODO: Add code to display the current date in the header of the page.
    // target currentday class in html,
    // use currentDay var
    // set text of element to time using formatting
    $('#currentDay').text(currentDay.format('dddd, MMMM D, YYYY'));
    $('#currentTime').text(currentDay.format('hh:mm'));
  });
  