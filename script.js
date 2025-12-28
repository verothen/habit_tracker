// GET THE DATE
//figure out what line 3 does
var date = new Date();
console.log(date);

// EXTRACT THE CURRENT DATE INFO
var currentMonth = date.getMonth();
var currentDay = date.getDay();
var currentDate = date.getDate();
var currentYear = date.getFullYear();

console.log(currentMonth); //current month - 1
console.log(currentDay); //day of the week
console.log(currentDate); //current date/number
console.log(currentYear); //current year

// IMPORTANT DATE INFO
var months = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",
];

// SET THE CORRECT MONTH
var title = document.getElementById("title");
title.innerHTML = months[currentMonth];