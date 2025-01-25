document.addEventListener('DOMContentLoaded', function() { //waits for the DOM to be fully loaded before running the script
    const cityInput = document.getElementById('city-input'); 
    const getWeatherButton = document.getElementById('get-weather-btn'); 
    const weatherInfo = document.getElementById('weather-info'); 
    const cityNameDisplay = document.getElementById('city-name');
    const temperatureDisplay = document.getElementById('temperature'); 
    const descriptionDisplay = document.getElementById('description');
    const errorMessage = document.getElementById('error-message'); 

    const API_KEY = "567ac5051b0775cd3a8ffbddabb0c450"; //(**INAVTIVE API KEY**)

    getWeatherButton.addEventListener('click', async () => { //async function to handle the fetch request
        const city = cityInput.value.trim() //removes any whitespace from the input
        if(!city) return; 
        
        try{
            const weatherData = await fetchWeatherData(city); //fetches the weather data
            displayWeatherData(weatherData); 
        } catch (error){
            showError(error.message);
        }
    });

    async function fetchWeatherData(city){ //fetches the weather data from the API
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}&units=metric`; 

        const response = await fetch(url) //fetches the data from the API
        console.log("RESPONSE",response); //logs the response

        if(!response.ok){ 
            throw new Error('City not found');
        }

        const data = await response.json(); //parses the response into JSON
        return data;
    }

    function displayWeatherData(data){ //displays the weather data on the page
        console.log(data);
        const {name, main, weather} = data; //destructures the data object
        cityNameDisplay.textContent = name; //displays the city name
        temperatureDisplay.textContent = 'Temperature: ' + main.temp + '°C'; 
        descriptionDisplay.textContent = 'Description: ' + weather[0].description;


      //unlocks the hidden class
      weatherInfo.classList.remove('hidden');   //unlocks the hidden class
      errorMessage.classList.add('hidden'); //hides the error message
    }

    function showError(message){ //displays an error message
        weatherInfo.classList.remove('hidden'); 
        errorMessage.classList.add('hidden'); 
    }

});