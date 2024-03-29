import React, {useState} from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const apiKey = ``
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`

  const searchLocation = (event) => {
    if(event.key === 'Enter') {
      axios.get(url).then((response) =>{
        setData(response.data)
        console.log(response.data)
      }).catch(error => {
        console.error(error);
        const container = document.getElementById('weather-container');
        container.innerHTML = 'Error fetching weather data.';
      })
      
      setLocation('')
    }
  }

  return (
    <div className='app'>
      <div className='search'>
        <input
        value={location}
        onChange={event => setLocation(event.target.value)}
        onKeyPress={searchLocation}
        placeholder='Enter Location'
        type='text'/>
      </div>
      
      <div className='container'>
        <div className='top'>
          <div className='location'>
            {data.name ? <p>{data.name}, {data.sys.country}</p> : null}
          </div>
          <div className='temp'>
            {data.main ? <h1>{data.main.temp} C</h1> : null}
          </div>
          <div className='description'>
          {data.weather ? <p>{data.weather[0].main}</p> : null }
            {data.weather ? <p>{data.weather[0].description}</p> : null }
          </div>
        </div>
        {data.main !== undefined && 
          <div className='bottom'>
          <div className='feels'>
            {data.main ? <p className='bold'>{data.main.feels_like} C</p> : null}
            <p>Feels Like</p>
          </div>
          <div className='humidity'>
            {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
            
            <p>Humidity</p>
          </div>
          <div className='wind'>
            {data.main ? <p className='bold'>{data.wind.speed} KPH</p> : null}
            <p>Winds</p>
          </div>
        </div>
        }
        
      </div>
    </div>
  );
}

export default App;
