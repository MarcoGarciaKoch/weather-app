import { apiKey } from "../config.js";

export const getCurrentLocationName = async (latitude, longitude) => {

    const r = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${apiKey}`);
    const data = await r.json();
    const city = data[0].name

    return city;
};


export const getCityWeather = async (latitude, longitude) => {

    const r = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&appid=${apiKey}&units=metric`);
    const data = await r.json();

    return data;
};


export const getCityWeatherByName = async cityName => {

        const r = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`);
        const data = await r.json();
        const {lon, lat} = data.coord
    
        return {lon, lat};
};