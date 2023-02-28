

let appId = '4d8fb5b93d4af21d66a2948710284366';
let units = 'metric'; 
let searchMethod; 

function getSearchMethod(searchTerm) {
    if(searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm){
        searchMethod = 'zip';
    }
    else 
        searchMethod = 'q'; // q means searching as a string.
}

function searchWeather(searchTerm) {
   getSearchMethod(searchTerm);
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`)
        .then((result) => {
            return result.json();
        }).then((res) => {
            init(res);
    });
}

function init(resultFromServer) {
    
    console.log(resultFromServer);
    let weatherDescriptionHeader = document.getElementById('cweadesheader');
    let temperatureElement = document.getElementById('temp');
    let humidityElement = document.getElementById('humidity');
    let windSpeedElement = document.getElementById('windSpeed');
    let cityHeader = document.getElementById('ccityheader');

    let weatherIcon = document.getElementById('documentIconImg');
    weatherIcon.src = 'http://openweathermap.org/img/w/' + resultFromServer.weather[0].icon + '.png';

    temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176;C';
    windSpeedElement.innerHTML = 'Wind Speed: ' + Math.floor(resultFromServer.wind.speed) + ' Km/s';
    cityHeader.innerHTML = resultFromServer.name;
    humidityElement.innerHTML = 'Humidity levels: ' + resultFromServer.main.humidity +  '%&#9748;';

    setPositionForWeatherInfo();
}


document.getElementById('searchBtn').addEventListener('click', () => {
    let searchTerm = document.getElementById('searchInput').value;
    if(searchTerm)
        searchWeather(searchTerm);
});

