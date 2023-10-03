import React, { useState } from 'react';
import "../Weather App/WeatherApp.css";

import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import humidity_icon from "../Assets/humidity.png";
import rain_icon from "../Assets/rain.png";
import search_icon from "../Assets/search.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";

const WeatherApp = () => {

    let api_key='4fe5c329acbf720f1619553b673e7dd4';

    const [wicon,setWicon] = useState(cloud_icon);

    const search = async ()=>{
        const element = document.getElementsByClassName('cityInput');

        if(element[0].value=== ''){
            return 0;
        }

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

        let response = await fetch(url);
        let data = await response.json();

        const humidity = document.getElementsByClassName("humidity_percent");
        const wind = document.getElementsByClassName("wind_speed");
        const temperature = document.getElementsByClassName("weather_temp");
        const location = document.getElementsByClassName("weather_location");


        if(data && data.main){
            humidity[0].innerHTML = data.main.humidity+" %";
        }
        if(data && data.wind){
            wind[0].innerHTML = Math.floor(data.wind.speed)+" km/h";
        }
        if(data && data.main){
            temperature[0].innerHTML = Math.floor(data.main.temp)+"°c";
        }
        if(data ){
            location[0].innerHTML = data.name;  
        }

        if(data.weather[0].icon==="01d" || data.weather[0].icon==="01n"){
            setWicon(clear_icon);
        }
        else if(data.weather[0].icon==="02d" || data.weather[0].icon==="02n"){
            setWicon(cloud_icon);
        }
        else if(data.weather[0].icon==="03d" || data.weather[0].icon==="03n"){
            setWicon(drizzle_icon);
        }
        else if(data.weather[0].icon==="04d" || data.weather[0].icon==="04n"){
            setWicon(drizzle_icon);
        }
        else if(data.weather[0].icon==="09d" || data.weather[0].icon==="09n"){
            setWicon(rain_icon);
        }
        else if(data.weather[0].icon==="10d" || data.weather[0].icon==="10n"){
            setWicon(rain_icon);
        }
        else if(data.weather[0].icon==="13d" || data.weather[0].icon==="13n"){
            setWicon(snow_icon);
        }
        else{
            setWicon(clear_icon);
        }
        

    }
    return (
        <>
            <div className='container'>
                <div className='top-bar'>
                    <input type='text' className='cityInput' placeholder='Search'  />
                    <div className='search_icon' onClick={()=>{search()}}>
                        <img src={search_icon} alt='' />
                    </div>
                </div>
                <div className='weather_image'>
                    <img src={wicon} alt='' />
                </div>
                <div className='weather_temp'>24°c</div>
                <div className='weather_location'>London</div>

                <div className='data_container'>
                    <div className='element'>
                        <img src={humidity_icon} alt='' className='icon' />
                        <div className='data'>
                            <div className='humidity_percent'>64%</div>
                            <div className='text'>Humidity</div>
                        </div>
                    </div>

                    <div className='element'>
                        <img src={wind_icon} alt='' className='icon' />
                        <div className='data'>
                            <div className='wind_speed'>18 km/h</div>
                            <div className='text'>Wind Speed</div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default WeatherApp;