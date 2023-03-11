// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.


const saveButton = document.querySelector('.saveBtn');
const input = document.querySelector('container-fluid');
const pastEvent = document.getElementById('hour-9');
const currentEvent = document.getElementById('hour-10');
const futureEvent = document.getElementById('hour-11');


// We want this to be an object like this:
//  {'hour-11': 'some saved text', 'hour-12': 'some diff text'}
var savedData = localStorage.getItem('savedData')


function getTextForEachTimeBlock() {
  // return this: {'hour-11': 'some saved text', 'hour-12': 'some diff text'}
  let data = {}

  $('.time-block').each(function() {
    let divId = $(this).attr('id') 
    let text = $(this).find('textarea').val()
    data[divId] = text  // maps 'hour-11' to text
    // Get the inner `text-area` elements value
  })
  return data
}

function saveTextToLocalStorage() {
  savedData = getTextForEachTimeBlock()
  localStorage.setItem('savedData', JSON.stringify(savedData));
}


$(function () {
  saveButton.addEventListener('click', function() {
    // ME-- add code for saving user input
    //saveButton.textContent = savedData; // This works. Don't edit. 
  })



  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  
});



// This will set the current day

const currentDay = document.getElementById('currentDay');
currentDay.innerText = dayjs();
// ME-- want to change format of date 


$(document).ready(function () {
  let currentHour = new Date().getHours()
  let textData = JSON.parse(savedData)

  $('.time-block').each(function() {
    console.log("IM RUNNING!")
    let divId = $(this).attr('id')  // 'hour-11'
    let textForThisTimeBlock = textData[divId]

    // Get the int suffix from divId
    divId = divId.replace(/hour-/g, '');
    console.log(divId)
    // Compare that number to the current hour and set correct class.
    if (divId == currentHour){
      $(this).addClass('present')
    }
    if(divId > currentHour){
      $(this).addClass('future')
    }
    if(divId < currentHour){
      $(this).addClass('past')
    }
    // Set past, present, or  future based on currentHour
  })


})

// hours in 24 hour format. suffix of each time-block element's id to current 24 our integer hour.