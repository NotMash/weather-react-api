import React, { useState } from 'react';


import { WiHumidity,WiStrongWind } from "react-icons/wi";





const api = {
  key: "47525f0e1fc90897595c78f5cbffc723",
  base: "https://api.openweathermap.org/data/2.5/"
}


function App() {






  const [query,setQuery] = useState('');
  const [weather,setWeather] = useState({});
  const [unit, setUnit] = useState('metric');
  const [forecast, setForecast] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const [uniqueDates, setUniqueDates] = useState([]);



  const search = (evt) => {
    if (evt.key === "Enter") {
      // Fetch current weather
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setQuery('');
          setWeather(result);
        });

      // Fetch forecast
      getForecast();
    }
  };

  
  // Update the API request with the selected unit
  fetch(`${api.base}weather?q=${query}&units=${unit}&APPID=${api.key}`)

  const getForecast = () => {
    fetch(`${api.base}forecast?q=${query}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        const dates = result.list.reduce((dates, item) => {
          const date = formatDate(new Date(item.dt * 1000));
          if (!dates.includes(date)) {
            dates.push(date);
          }
          return dates;
        }, []);

        setUniqueDates(dates);

        const updatedForecast = result.list.map((item) => ({
          date: formatDate(new Date(item.dt * 1000)),
          time: getForecastTime(new Date(item.dt * 1000)),
          temp: Math.round(item.main.temp),
          weather: item.weather[0].main,
          windSpeed: item.wind.speed,
          humidity: item.main.humidity,
        }));
        setForecast(updatedForecast);
      })
      .catch((error) => {
        console.error(error);
        setUniqueDates([]);
        setForecast([]);
      });
  };
  



    // Get user's geolocation and set it as the query
  const getGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        fetch(`${api.base}weather?lat=${latitude}&lon=${longitude}&units=${unit}&APPID=${api.key}`)
          .then((res) => res.json())
          .then((result) => {
            setQuery(result.name);
            setWeather(result);
            console.log(result);
          });
      });
    }
  };

  // Define formatDate function
  const formatDate = (d) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day = days[d.getDay()];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const date = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    return `${day}, ${date} ${month} ${year}`;
  };
  
  const getForecastTime = (date, index) => {
    const time = new Date(date);
    time.setHours(0, 0, 0, 0); // Initialize time to midnight
    time.setHours(index * 3); // Increment by 3 hours for each index
    return time;
  };
  

  const formatTime = (d) => {
    const hours = d.getHours();
    const minutes = d.getMinutes();
    const amPm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = (hours % 12) || 12; // Convert 0 to 12
    const formattedMinutes = (minutes < 10) ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${amPm}`;
  };
  

  



  return (
    <div className={`app ${(typeof weather.main !== "undefined") ? (weather.weather[0].main === 'Clouds' ? 'app-cloud' : (weather.weather[0].main === 'Clear' ? 'app-clear' : (weather.weather[0].main === 'Sunny' ? 'app-sunny' : (weather.weather[0].main === 'Rain' ? 'app-rain' : '')))) : ''}`}>

     <main> 
        <div className="search-box">
            <input type="text"
            className='search-bar'
            placeholder='Search City...'
            onChange={e =>setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
            />
             <div className="button-container">
                <button onClick={getGeolocation}>Use My Location</button>
            </div>

        </div>
       

        {(typeof weather.main !== "undefined") ? (
          <div>
            <div className='location-box'>
              <div className='location'>{weather.name},{weather.sys.country}</div>
              <div className='date'>{formatDate(new Date())}</div>
            </div>
            <div className='weather-box'>
              <div className='temp'>
                {Math.round(weather.main.temp)}ºc
              </div>
              <div className='weather'>{weather.weather[0].main}</div>
              <div className='weather-wind-speed'> Wind Speed: {weather.wind.speed} m/s <WiStrongWind className='icons'/></div>
              <div className='weather-humidity'>Humidity: {weather.main.humidity}<WiHumidity className='icons'/> </div>
            </div>
          </div>
        ) : ('')}


        {(typeof weather.main !== "undefined") ? (
          <div className="forecast-box">
            <div className="forecast-title">5-Day Forecast/3 Hours</div>
            {uniqueDates
              .filter(date => date !== formatDate(new Date())) // Exclude the current day
              .map((date, index) => (
                <div key={index}>
                  <div className="forecast-date" onClick={() => setSelectedDate((prevDate) => (prevDate === date ? null : date))}>
                    {date}
                  </div>
                  {selectedDate === date && (
                    forecast
                      .filter((item) => formatDate(new Date(item.date)) === date)
                      .map((item, index) => (
                        <div className="forecast-item" key={index}>
                          <div className="forecast-date-2">{formatDate(getForecastTime(new Date(item.date), index))}</div>
                          <div className="forecast-time">{formatTime(getForecastTime(new Date(item.date), index))}</div>
                          <div className="forecast-temp">{item.temp}ºc</div>
                          <div className="forecast-weather">{item.weather}</div>
                          <div className="forecast-wind-speed">Wind Speed: {item.windSpeed} m/s<WiStrongWind className='icons-per-day'/></div>
                          <div className="forecast-humidity">Humidity: {item.humidity}<WiHumidity className='icons-per-day'/></div>
                        </div>
                      ))
                  )}
                </div>
              ))}
          </div>
        ) : (
          ""
        )}







          
     </main>
    </div>
  );
}

export default App;
