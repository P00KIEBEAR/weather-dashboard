"use strict";

var city = document.querySelector('.city');
var searchBtn = document.querySelector('.button');
var card5 = document.querySelector('.card-5')
var place = document.querySelector('.location');
var temp = document.querySelector('.temp');
var wind = document.querySelector('.wind');
var humidity = document.querySelector('.humidity')
var uv = document.querySelector('uv')
var iconcode = [];
var icon = []
var day = [];
var days = [];
var process = []


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
    // if there's an error, log it
    console.log(error);
  });
})
var geticon = function () {
  fetch("http://openweathermap.org/w/" + iconcode + "img.png")
    .then(response => response)
    // request was successful
    .then(function (data) {
      icon = data

    }).catch(function (error) {
      // if there's an error, log it
      console.log(error);
    })
}
var showData = function () {

  iconcode = days[1].weather[0].icon;
  place.innerHTML = days[0].city.name;
  temp.innerText = days[1].main.temp;
  humidity.innerText = days[1].main.humidity;
  wind.innerText = days[1].wind.speed;

  // need for loop
}
// five day forcast
/*
searchBtn.addEventListener('click', function () {

      var dateArr = [days["list"][6]["dt_txt"], days["list"][12]["dt_txt"], days["list"][18]["dt_txt"], days["list"][24]["dt_txt"], days["list"][30]["dt_txt"]];
              for (let i = 0; i < dateArr.length; i++) {
        var card = document.createElement('div').className = 'col-2';
        var dateEl = document.createElement('p')
        var tempEl = document.createElement('p')
        var humidityEL = document.createElement('p')

        card5.appendChild(card);
        card.appendChild(dateEl)
        dateEl.innerHTML = dateArr[i];

*/
/*

var  = "http://openweathermap.org/img/w/" + iconcode + "@.png";
fetch("http://openweathermap.org/img.png"
  .then(response => response)
  // request was successful
  .then(data =>  iconurl)
}
*/