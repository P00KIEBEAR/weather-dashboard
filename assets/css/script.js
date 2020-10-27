"use strict";

var city = document.querySelector('.city');
var searchBtn = document.querySelector('.button');
var card5 = document.querySelector('.card-5')
var place = document.querySelector('.location');
var temp = document.querySelector('.temp');
var wind = document.querySelector('.wind');
var humidity = document.querySelector('.humidity')
var uv = document.querySelector('uv')
var icon = document.createElement('img');
var iconcode = [];
var historyLog = JSON.parse(localStorage.getItem('historyLog')) || [];
var day = '';
var days = [];
var process = []
if (historyLog === []) {
  console.log("hi")
}
else {
  console.log(historyLog)
}

var days = [];
searchBtn.addEventListener('click', function () {
  Promise.all([
    fetch('http://api.openweathermap.org/data/2.5/forecast?q=' + city.value + '&units=imperial&appid=ab02afd371ef6319765f7162754109b5'),
    fetch('http://api.openweathermap.org/data/2.5/weather?q=' + city.value + '&units=imperial&appid=074f5d708bcfe1160c8fa4c5b0d9f5f7')
  ]).then(function (responses) {
    return Promise.all(responses.map(function (response) {
      return response.json();
    }));
  }).then(function (data) {
    days = data
    console.log(data);
    showData()
  }).catch(function (error) {

    console.log(error);
  });
})


var showData = function () {
  historyLog.push(city.value);
  localStorage.setItem('historyLog', JSON.stringify(historyLog))
  //need current date
  var s = new Date(days[1].dt).toLocaleDateString("en-US")
  console.log(s)

  icon.src = "http://openweathermap.org/img/w/" + days[1].weather[0].icon + ".png";
  place.innerHTML = days[0].city.name;
  temp.innerText = days[1].main.temp;
  humidity.innerText = days[1].main.humidity;
  wind.innerText = days[1].wind.speed;
  place.appendChild(icon);




  var dateArr = [days[0].list[6].dt_txt, days[0].list[12].dt_txt, days[0].list[18].dt_txt, days[0].list[24].dt_txt, days[0].list[30].dt_txt];
  var iconArr = [days[0].list[6].weather[0].icon, days[0].list[12].weather[0].icon, days[0].list[18].weather[0].icon, days[0].list[24].weather[0].icon, days[0].list[30].weather[0].icon];
  var tempArr = [days[0].list[6].main.temp, days[0].list[12].main.temp, days[0].list[18].main.temp, days[0].list[24].main.temp, days[0].list[30].main.temp];
  console.log(dateArr)

  // need to search and check time to make sure it allways noon may have to use moment?
  /*
   for (let i = 0; i < days[0].length; i++) {
 
 
   }
 
 */

  for (let i = 0; i < dateArr.length; i++) {

    var dateSlpit = dateArr[i].split(" ");
    //still need to reverse date
    var card = document.createElement('div');
    card.setAttribute('class', 'col-2 mx-auto');
    card5.appendChild(card);
    var dateEl = document.createElement('p')
    dateEl.innerHTML = dateSlpit[0];
    card.appendChild(dateEl);
    var tempEl = document.createElement('a')
    tempEl.innerHTML = tempArr[i] + '°F';
    card.appendChild(tempEl);
    console.log(iconArr[i])
    var iconImg = document.createElement('img')
    iconImg.src = "http://openweathermap.org/img/w/" + iconArr[i] + ".png";
    dateEl.appendChild(iconImg)


  }
}
 //need to make a search history

//need to add link to history list



