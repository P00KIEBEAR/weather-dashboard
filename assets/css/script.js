"use strict";

var date = moment().format('MM/DD/YYYY')
var city1 = document.querySelector('#city-1');
var city2 = document.querySelector('#city-2');
var city3 = document.querySelector('#city-3');
var city4 = document.querySelector('#city-4');
var city5 = document.querySelector('#city-5');
var city = document.querySelector('.city');
var searchBtn = document.querySelector('.button');
var card5 = document.querySelector('.card-5');
var place = document.querySelector('.location');
var temp = document.querySelector('.temp');
var wind = document.querySelector('.wind');
var humidity = document.querySelector('.humidity');
var uv = document.querySelector('.uv');
var uvData = ' ';
var icon = document.createElement('img');
var iconcode = [];
var historyLog = JSON.parse(localStorage.getItem('historyLog')) || [];
var days = [];
var process = [];
var pastSearches = [city1, city2, city3, city4, city5];



//need to reverse history list

if (historyLog.length === 0) {

}
else if (historyLog.length > 4) {

  for (let i = 0; i < 5; i++) {
    pastSearches[i].innerHTML = historyLog[i]

  }
}
else {
  for (let i = 0; i < historyLog.length; i++) {
    pastSearches[i].innerHTML = historyLog[i]

  }
}

function cityA() {
  city.value = city1.innerHTML;
  search()
}
function cityB() {
  city.value = city2.innerHTML;
  search()
}
function cityC() {

  city.value = city3.innerHTML;
  search()
}
function cityD() {
  city.value = city4.innerHTML;
  search()
}
function cityE() {
  city.value = city5.innerHTML;
  search()
}

var days = [];

function search() {
  card5.innerHTML = "";
  if (city.value === "") {
    city.value = 'phoenix'
  }
  else {

  }

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
    getUv()
  }).catch(function (error) {

    console.log(error);
  });
}

function getUv() {
  return fetch('http://api.openweathermap.org/data/2.5/uvi?lat=' + days[1].coord.lat + '&lon=' + days[1].coord.lon + '&appid=4edc6a02b1204b6d524189262cf14708')
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      uvData = json.value
      console.log(json);
      showData();
    })
}
//fetch('http://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}&appid={API key}')

function showData() {
  historyLog.push(city.value);
  localStorage.setItem('historyLog', JSON.stringify(historyLog))



  var m = moment(days[1].dt_txt)

  icon.src = "http://openweathermap.org/img/w/" + days[1].weather[0].icon + ".png";
  place.innerHTML = days[0].city.name;
  temp.innerText = 'Temperature:' + days[1].main.temp + '°F';
  humidity.innerText = 'Humidity:' + days[1].main.humidity + '%';
  wind.innerText = 'Wind Speed:' + days[1].wind.speed + 'MPH';
  var uvEl = document.createElement('span');
  // still need to get uv in colored box will use an if else
  if (uvData < 3) {
    uvEl.classList.remove;
    uvEl.classList.add('low');
  }
  else if (uvData < 6) {
    uvEl.classList.remove;
    uvEl.classList.add('moderate');
  }
  else if (uvData < 8) {
    uvEl.classList.remove;
    uvEl.classList.add('high');
  }
  else if (uvData < 11) {
    uvEl.classList.remove;
    uvEl.classList.add('very-high');
  }
  else {
    uvEl.classList.remove;
    uvEl.classList.add('extreme');
  }


  uvEl.innerText = uvData;
  uv.innerText = 'UV :';
  uv.appendChild(uvEl)
  place.appendChild(icon);
  var currentDate = document.querySelector('.date');
  currentDate.textContent = date;

  var dateArr = [days[0].list[6].dt_txt, days[0].list[15].dt_txt, days[0].list[23].dt_txt, days[0].list[30].dt_txt, days[0].list[38].dt_txt];
  var iconArr = [days[0].list[6].weather[0].icon, days[0].list[15].weather[0].icon, days[0].list[23].weather[0].icon, days[0].list[30].weather[0].icon, days[0].list[38].weather[0].icon];
  var tempArr = [days[0].list[6].main.temp, days[0].list[15].main.temp, days[0].list[23].main.temp, days[0].list[30].main.temp, days[0].list[38].main.temp];


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

    var iconImg = document.createElement('img')
    iconImg.src = "http://openweathermap.org/img/w/" + iconArr[i] + ".png";
    dateEl.appendChild(iconImg)


  }
}




