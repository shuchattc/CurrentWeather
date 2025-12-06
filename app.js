const form = document.querySelector('#searchForm');
import dotenv from "dotenv";
dotenv.config();
const apiKey = process.env.API_KEY;

form.addEventListener('submit', async function (e) {
    e.preventDefault();
    //searchs the api from the value in the city element
    const searchTerm = form.elements.query.value;
    if(!searchTerm){
        alert("Please Enter City");
    }
    if(document.getElementById('temp_type_F').checked){
            //searchTerm is the value where you search the json files for object info
            try {
                const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&&units=imperial&appid=${apiKey}`);
                getWeather(res); // calls function that makes the weather display
              } catch (error) {
                alert("Please make a valid entry, city not found.");
                console.log(error);
              }
            
          //  console.log(res); //displays data information on search term to the console
           //check the DOM if the element is already there or not

    form.elements.query.value = ''; //sets the search bar value back to blank
    }else if(document.getElementById('temp_type_C').checked){
        try {
            const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&&units=metric&appid=${apiKey}`);
            getWeather(res); // calls function that makes the weather display
          } catch (error) {
            alert("Please make a valid entry, city not found.");
            console.log(error);
          }

        form.elements.query.value = ''; //sets the search bar value back to blank
    }
});

const getWeather = (searchTerm) => {
    const imgArea = document.getElementById("iconArea");
    const newImg = document.createElement('IMG');
    newImg.id = "weatherIcon";
    const nameP = document.createElement('p');
    nameP.id = "cityDisplay";
    const countryP = document.createElement('p');
    countryP.id = "countryName";
    const weatherIcon = `http://openweathermap.org/img/wn/${searchTerm.data.weather[0].icon}.png`; //weather icon search
    const city = searchTerm.data.name; //city name search
    const country = searchTerm.data.sys.country; //country search
    const weatherDescription = searchTerm.data.weather[0].description; //weather description
    const weatherP = document.createElement('p');
    weatherP.id = "weatherDesc";
    const temp = searchTerm.data.main.temp; //tempurature search
    const tempP = document.createElement('p');
    tempP.id = "tempDesc";
    newImg.src = weatherIcon;
    var tempType = 0;
    if(!imgArea.hasChildNodes()){ // if there is no info on screen, create info
        imgArea.append(newImg); //appends the img tag
        imgArea.append(nameP);
        imgArea.append(countryP);
        imgArea.append(weatherP);
        imgArea.append(tempP);
        nameP.append("City: " + city);
        countryP.append("Country: " + country);
        weatherP.append("Weather Description: " + weatherDescription);
        if(document.getElementById('temp_type_C').checked){
        tempP.append("Temperature: " + temp + '\u00B0' + 'C');
        tempType = 0;
        }else if (document.getElementById('temp_type_F').checked){
            tempP.append("Temperature: " + temp + '\u00B0' + 'F');
            tempType = 1;
        }
    }
    else if(imgArea.hasChildNodes()){ // if info on screen update info
        const newWeatherIcon = document.getElementById("weatherIcon");
        const newCity = document.getElementById("cityDisplay");
        const newCountryName = document.getElementById("countryName");
        const newWeatherDesc = document.getElementById("weatherDesc");
        const newTempDesc = document.getElementById("tempDesc");
        newWeatherIcon.src = weatherIcon;
        newCity.innerText = "City: " + city;
        newCountryName.innerText = "Country: " + country;
        newWeatherDesc.innerText = "Weather Description: " + weatherDescription;
        if(tempType == 1){
            newTempDesc.innerText = "Temperature: " + temp + '\u00B0' + 'F';
        }else{
            newTempDesc.innerText = "Temperature: " + temp + '\u00B0' + 'C';
        }
    }
}