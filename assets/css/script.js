"use strict";

var city = document.querySelector('.city');
var searchBtn = document.querySelector('.button');
var card5 = document.querySelector('.card-5')
var place = document.querySelector('.location');
var temp = document.querySelector('.temp')
var wind = document.querySelector('.wind')
var humidity = document.querySelector('.humidity')
var uv = document.querySelector('uv')
var iconcode = '';
var day = [];
var days = [];


searchBtn.addEventListener('click', function () {
  fetch('http://api.openweathermap.org/data/2.5/weather?q=' + city.value + '&units=imperial&appid=074f5d708bcfe1160c8fa4c5b0d9f5f7')
    .then(function (response) {
      return response.json();
    }).then(function (data) {

      // Log the data to the console
      console.log(data);
      day = data;
      return fetch('http://api.openweathermap.org/data/2.5/forecast?q=' + city.value + '&units=imperial&appid=ab02afd371ef6319765f7162754109b5');

    }).then(function (response) {
      return response.json();
    }).then(function (data) {

      console.log(data);
      days = data;

    }).catch(function (error) {
      // if there's an error, log it
      console.log(error);
    });
})

Promise.all([day, days])
  .then(files => {
    files.forEach(file => {
      Process(file.json())
    })
  })
  .catch(err => {

  })

var process = (prom) => {
  prom.then(data => {

  })
}
// five day forcast
/*
searchBtn.addEventListener('click', function () {
  fetch('http://api.openweathermap.org/data/2.5/forecast?q=' + city.value + '&units=imperial&appid=ab02afd371ef6319765f7162754109b5')
    .then(response => response.json())
    // request was successful
    .then(data => {
      var dateArr = [data["list"][6]["dt_txt"], data["list"][12]["dt_txt"], data["list"][18]["dt_txt"], data["list"][24]["dt_txt"], data["list"][30]["dt_txt"]];
      debugger;
      console.log(data)
      for (let i = 0; i < dateArr.length; i++) {
        var card = document.createElement('div').className = 'col-2';
        var dateEl = document.createElement('p')
        var tempEl = document.createElement('p')
        var humidityEL = document.createElement('p')

        card5.appendChild(card);
        card.appendChild(dateEl)
        dateEl.innerHTML = dateArr[i];
      }
    })
    .catch(error => alert("opps"))
  debugger;
})
*/
/*

var  = "http://openweathermap.org/img/w/" + iconcode + "@.png";
fetch("http://openweathermap.org/img.png"
  .then(response => response.json())
  // request was successful
  .then(data =>  iconurl)
}
*/