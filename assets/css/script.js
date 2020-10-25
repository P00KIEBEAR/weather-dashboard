"use strict";

var city = document.querySelector('#city');
var searchBtn = document.querySelector('.button');
var temp = document.querySelector('.temp')
var humidity = document.querySelector('.humidity')
var location = document.getElementById('locaton')

searchBtn.addEventListener('click', function () {
  // make a request to the url
  fetch('http://api.openweathermap.org/data/2.5/forecast?q=' + city.value + '&appid=074f5d708bcfe1160c8fa4c5b0d9f5f7')
    .then(response => response.json())
    // request was successful
    .then(data => console.log(data))

    .catch(error => alert("Unable to connect to the weather"))
})


