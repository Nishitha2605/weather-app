import React, { useState } from 'react';
import axios from "axios";

function Hero(){

  const [inputData,setInput] = useState('');
  const [Data,setData] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const [emoji, setEmoji] = useState(null);
  const [error,setError] = useState('');

  const key = "17e98268f9fc6387ec6bd94269a45b27" 
  
 
  const handleInput = (event) => {
    const inp = event.target.value;
    console.log(inp)
    setInput(inp)
  }
  const handleSave = async() => {
    setIsClicked(true); 
   console.log('clicked')
    setTimeout(() => {
        setIsClicked(false);
      }, 100);
   
    if(inputData){
    try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${inputData}&appid=${key}&units=metric`
        );
        const weatherDescription = response.data.weather[0].description;
        setEmoji(getEmojiForWeather(weatherDescription));
        setData(response.data);
        setError(""); 
      } catch (err) {
        setError("Location not found. Please try again.");
        setData(null);
      }
    }
    else {
      alert('Please Enter a city')
    }

}
const getEmojiForWeather = (description) => {
    if (description.includes('clear')) {
      return '☀️';
    } else if (description.includes('clouds')) {
      return '☁️'; 
    } else if (description.includes('rain')) {
      return '🌧️'; 
    } else if (description.includes('thunderstorm')) {
      return '⛈️';
    } else if (description.includes('snow')) {
      return '❄️';
    } else if (description.includes('mist') || description.includes('fog')) {
      return '🌫️'; 
    } else {
      return '🌤️'; 
    }
  };
  return <div className='container'>
    <div className='header'>
         <h1>Weather App</h1>
    </div>
    <div className='search'>
        <input type='text' placeholder='Enter city name' onChange={handleInput}></input>
        <button onClick={handleSave}  className={`button ${isClicked ? 'clicked' : ''}`}><b>Go</b></button>
  
        {error && <p style={{ color: "red" }}>{error}</p>}
    </div>   
    { Data && ( 
        <>
    <div className='weather'>
        <p><b>{Data.name}📍</b></p>
        <h1>{Data.weather[0].description}{emoji}</h1>
    </div>
    <div className='humid'>
        <p><b>Humidity 💦</b></p>
        <h1>{Data.main.humidity}% ☀️</h1>
    </div>
    <div className='temp'>
        <p><b>Temperature🌡</b></p>
        <h1>{Data.main.temp} °C 🌤️</h1>
    </div>
    <div className='precip'>
        <p><b>Precipitation💧</b></p>
        <h1>{Data.clouds.all}% ⛈️</h1>
    </div>
    </>
    )}
     
    </div>
         


  
}

export default Hero;
