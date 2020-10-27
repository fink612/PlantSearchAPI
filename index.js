'use strict';

const baseURL = 'https://trefle.io/api/v1/plants'
const token = 'rR6ZgUfbFb0rebOrVMPw5jLcV9jpNT9o4Qj3tWuCAJE'

const options = {
  
  mode: 'no-cors',
  accept: '*/*'
};


function getData(plant, location) {
    const param = {
        "filter[common_name]": plant
    }
        
    const qString = buildString(param)
    const urlPlant = baseURL + '?' + 'token=' + token + '&' + qString
    console.log(urlPlant)

    fetch(urlPlant, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => showInfo(responseJson))
    .catch(err => {
      $('#results').text(`Something went wrong: ${err.message}`);
    });
}

function showInfo(responseJson) {
    $('#results').empty()
    for (let i=0; i < responseJson.data.length; i++) {
      $('#results').append(`<h2>${responseJson.data[i].common_name}</h2>`)
    }
    
}

function buildString(param) {
    const queryItems = Object.keys(param)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(param[key])}`)
    return queryItems.join('&');
}


function readForm() {
    $('form').submit(e => {
        e.preventDefault()
        const plant = $('#searchBar').val()
        const location = $('#location').val()
        console.log(plant, location)
        getData(plant, location)
    })
    
}

$(readForm)
