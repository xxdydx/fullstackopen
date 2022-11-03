import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';



const Country = ({country}) => {
    const [weather, setWeather] = useState([]);
    const access_key = process.env.REACT_APP_API_KEY
    const city = country.capital
    useEffect(() => {


        console.log('effect')
        axios
          .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${access_key}`)
          .then(response => {
            console.log('promise fulfilled')
            setWeather(response.data)
          })
      }, [])
      
    return (


    <div>
    <h1>{country.name.common}</h1>
    <p>capital {city} </p>
    <p>area {country.area} km²</p>
    <h2>Spoken Languages</h2>
    <ul>
        {Object.values(country.languages).map((language) => (
        <li key={language}>{language}</li>
        ))}
    </ul>

    <br />

    <img src={country.flags.png} alt={`${country.name.common}'s flag`}></img>
    
    <br />

    <div>
      {weather.main ? (
        <div>
          <h2>Weather in {city}</h2>
          <div>Temperature {weather.main.temp}°C</div>
          <img
            alt="weather icon"
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          />
          <div>Wind {weather.wind.speed} m/s</div>
        </div>
      ) : <div>...loading</div>}
    </div>






</div>

    )
}

export default Country;