// GET THE DATE
//figure out what line 3 does
var date = new Date();
console.log(date);

// EXTRACT THE CURRENT DATE INFO
var currentMonth = date.getMonth();
var currentDay = date.getDay();
var currentDate = date.getDate();
var currentYear = date.getFullYear();

console.log("The current month is "+currentMonth); //current month - 1
console.log("The current weekday is "+currentDay); //day of the week
console.log("The current date is "+currentDate); //current date/number
console.log("The current year is "+currentYear); //current year

// IMPORTANT DATE INFO
var months = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",
];

// SET THE CORRECT MONTH
var title = document.getElementById("title");
title.innerHTML = "🐰"+months[currentMonth]+"🐰";

//UPDATE THE CALENDAR INFO
var habitTitle = document.getElementById("habitTitle");
habitTitle.onclick = function(){
    let habits = prompt("What's your habit", habitTitle.innerHTML)
    if(habits.length == 0){
        habitTitle.innerHTML = "Click to set your habit";
     }else{
        habitTitle.innerHTML = habits;
     }

}

// SET THE TOTAL DAYS
var daysInTheMonthList = [31,28,31,30,31,30,31,31,30,31,30,31];
var daysInThisMonth = daysInTheMonthList[currentMonth];

var daysCompleted = 0;
var totalDays = document.getElementById("totalDays");
totalDays.innerHTML="0/"+daysInThisMonth;

//SET UP THE CALENDAR DAYS
var dayCount = 0;
var rowCount = 0;
var days = document.getElementsByClassName("days");

for(var i=0;i<days.length; i++){
    var day = days[rowCount].getElementsByClassName("day");
    for (var j=0;j<day.length;j++){

        //add a border to the current date
        if(dayCount==currentDate-1){
            day[j].setAttribute("style","color:rgb(234,1,144);");
            day[j].setAttribute("style","border:2px solid black");
        }

        //update the correct date number and id and hide any excess numbers
        if(dayCount<daysInThisMonth){
            day[j].innerHTML=dayCount+1;
            day[j].setAttribute("id","day"+(dayCount+1));
            dayCount++; //repeat for every day
        } else{
            day[j].innerHTML="";
            day[j].setAttribute("style","background-color:white;");
        }
    }
    rowCount++; //repeat for every row
}

// INITIALIZE COMPLETED ARRAY
var completed = new Array(31);
for(var i = 0; i<dayCount;i++){
    var tempString = 
    ""+(currentMonth+1)+"-"+(i+1)+"-"+currentYear;
    console.log("storing date: "+ tempString);
    var tempDay=localStorage.getItem(tempString);
    console.log(tempDay);
    if(tempDay == null || tempDay == "false"){
        localStorage.setItem(tempString,"false");
    }else if (tempDay == "true"){
        daysCompleted++;
    }
    totalDays.innerHTML = daysCompleted+ "/"+daysInThisMonth;
}

console.log("completed array: "+completed);
console.log("total days completed "+daysCompleted);

// CHECK STORAGE AND UPDATE COMPLETED ARRAY
for (var i=0; i< currentDate;i++){
    var tempString=""+(currentMonth+1)+"-"+(i+1)+"-"+currentYear;
    console.log(tempString);

    var chosenDay=localStorage.getItem(tempString);
    console.log(i+1+": "+chosenDay);
    var chosenDayDiv = document.getElementById("day"+(i+1));
    if (chosenDay=== "true"){
        chosenDayDiv.style.backgroundColor = "pink";
    } else if (chosenDay === "false"){
        chosenDayDiv.style.backgroundColor="white";
    }
}

// UPDATE COMPLETED ON CALENDAR
var dayDivs = document.querySelectorAll(".day");
for (var i=0; i<currentDate;i++){
    dayDivs[i].onclick = function (e){
        var num = e.target.innerText;
        var selectedDate = document.getElementById(e.target.id);
        var storageString = ""+(currentMonth+1)+"-"+num+"-"+currentYear;

        if(localStorage.getItem(storageString)==="false"){
            selectedDate.style.backgroundColor="pink";
            localStorage.setItem(storageString,true);
            daysCompleted++;
        }
        else if(localStorage.getItem(storageString)==="true"){
            selectedDate.style.backgroundColor="white";
            localStorage.setItem(storageString,false);
            daysCompleted--;
        }
        totalDays.innerHTML=daysCompleted+"/"+daysInThisMonth;
        console.log(daysCompleted, currentDate);
        if(daysCompleted===currentDate){
            alert("great progress");
        }
    }
}

// RESET BUTTON
var resetbutton = document.getElementById("resetButton");
resetbutton.onclick = function(){
    for(var i=0;i<dayCount;i++){
        var tempStrings=""+(currentMonth+1)+"-"+(i+1)+"-"+currentYear;
        localStorage.setItem(tempStrings,"false");
        var curDay=document.getElementById("day"+(i+1));
        curDay.style.backgroundColor="white";
    }
daysCompleted=0;
totalDays.innerHTML=daysCompleted+"/"+daysInThisMonth;
    }
