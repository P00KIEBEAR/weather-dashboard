"use strict";

var date = moment().format('MM/DD/YYYY')
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


for (let i = historyLog.length - 1; i >= 0; i--) {
  var list = document.createElement('li');
  list.setAttribute('class', "list-group-item list-group-item-action");
  list.setAttribute('Onclick', 'research(this)');
  list.setAttribute('value', historyLog[i]);
  list.innerText = historyLog[i];
  pastSearches.appendChild(list);
}
var days = [];

function search() {
  card5.innerHTML = "";

  if (city.value === "") {
    city.value = 'phoenix';
  }
  else {

  }
  // TA Wesley told me to looking it up
  Promise.all([
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + city.value + '&units=imperial&appid=ab02afd371ef6319765f7162754109b5'),
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city.value + '&units=imperial&appid=074f5d708bcfe1160c8fa4c5b0d9f5f7')
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
  return fetch('https://api.openweathermap.org/data/2.5/uvi?lat=' + days[1].coord.lat + '&lon=' + days[1].coord.lon + '&appid=4edc6a02b1204b6d524189262cf14708')
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      uvData = json.value
      showData();
    })
}
//fetch('http://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}&appid={API key}')

function showData() {
  historyLog.push(city.value);
  localStorage.setItem('historyLog', JSON.stringify(historyLog))

  list = document.createElement('li')
  list.setAttribute('class', "list-group-item list-group-item-action");
  list.setAttribute('Onclick', 'research(this)')
  list.setAttribute('value', city.value)
  list.innerText = city.value
  pastSearches.prepend(list);

  var m = moment(days[1].dt_txt)
  city.value = ''
  icon.src = "http://openweathermap.org/img/w/" + days[1].weather[0].icon + ".png";
  place.innerHTML = days[0].city.name;
  temp.innerText = 'Temperature:' + days[1].main.temp + '°F';
  humidity.innerText = 'Humidity:' + days[1].main.humidity + '%';
  wind.innerText = 'Wind Speed:' + days[1].wind.speed + 'MPH';
  var uvEl = document.createElement('span');

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

  var dateArr = [days[0].list[6].dt_txt, days[0].list[14].dt_txt, days[0].list[22].dt_txt, days[0].list[30].dt_txt, days[0].list[38].dt_txt];
  var iconArr = [days[0].list[6].weather[0].icon, days[0].list[14].weather[0].icon, days[0].list[22].weather[0].icon, days[0].list[30].weather[0].icon, days[0].list[38].weather[0].icon];
  var tempArr = [days[0].list[6].main.temp, days[0].list[14].main.temp, days[0].list[22].main.temp, days[0].list[30].main.temp, days[0].list[38].main.temp];
  var humArr = [days[0].list[6].main.humidity, days[0].list[14].main.humidity, days[0].list[23].main.humidity, days[0].list[30].main.humidity, days[0].list[38].main.humidity];


  // need to search and check time to make sure it allways noon may have to use moment?

  for (let i = 0; i < dateArr.length; i++) {


    var dateSlpit = dateArr[i].split(" ");
    //still need to reverse date
    var card = document.createElement('div');
    card.setAttribute('class', 'col-2 mx-auto ');
    card5.appendChild(card);
    var dateEl = document.createElement('h6');
    dateEl.innerHTML = dateSlpit[0];
    card.appendChild(dateEl);
    var tempEl = document.createElement('p');
    tempEl.innerHTML = 'Temp :' + tempArr[i] + '°F';
    card.appendChild(tempEl);
    var humEl = document.createElement('a')
    humEl.innerHTML = 'Humidity :' + humArr[i] + '%';
    card.appendChild(humEl);
    var iconImg = document.createElement('img');
    iconImg.src = "http://openweathermap.org/img/w/" + iconArr[i] + ".png";
    dateEl.appendChild(iconImg);


  }
}

var research = function (value) {
  city.value = value.textContent;
  search()
}

