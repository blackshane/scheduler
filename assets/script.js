const input = document.querySelector('container-fluid');

// We want this to be an object like this:
//  {'hour-11': 'some saved text', 'hour-12': 'some diff text'}
var savedData = localStorage.getItem('savedData')
const currentDay = document.getElementById('currentDay');



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
  console.log('SAVE BUTTON HANDLER')
  savedData = getTextForEachTimeBlock()
  console.log(savedData)
  localStorage.setItem('savedData', JSON.stringify(savedData));
}


$('.saveBtn').click(saveTextToLocalStorage)


$(document).ready(function () {
  currentDay.innerText = dayjs().format('ddd MMM D, Hmm')
  let currentHour = new Date().getHours()
  let textData = JSON.parse(savedData)

  $('.time-block').each(function() {
    let divId = $(this).attr('id')  // 'hour-11'
    let textForThisTimeBlock = textData[divId]
    $(this).find('textarea').val(textForThisTimeBlock)

    // Get the int suffix from divId
    let hourOfDay = divId.replace('hour-', '');
    // Compare that number to the current hour and set correct class.
    if (hourOfDay == currentHour){
      $(this).addClass('present')
    }
    if(hourOfDay > currentHour){
      $(this).addClass('future')
    }
    if(hourOfDay < currentHour){
      $(this).addClass('past')
    }
    // Set past, present, or  future based on currentHour
  })


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