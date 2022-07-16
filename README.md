# Weather-app

This project consist of the creation of an application that uses a weather API to acomplish the main goal of the application.

Compared to all the previous projects done during my Full Stack Development Bootcamp, this one was very different as we had to work with the UX/UI Bootcamp team to acomplish the challenge.

The idea was to simulate a real project on a company to learn the creation and development flow where both, UX/UI and Development teams had to collaborate to make the project a reality.

The team was composed by 5 people from UX/UI and 3 people from Full Stack Development. We had only one week time and in our case we designed an application that based on the weather forecast either at current location or any other place, showed you how to take care of your home plants, taking into account temperature and humidity and therefore offering advices of plant care best practices.

The technological stack used was:

- React 18.1.0
- Bootstrap 5.1.3
- CSS3

The application has the following main features:

- Initially the weather forecast shown is for the user current location.
- The user can change the location to whatever place desired and go back to current location at any time.
- The user can filter by plant name.
- On the reverse of each plant card the user will find specific care instructions based on the weather of the place selected and also general information about the plant living conditions.


# Repository Structure

It only consists on the app client side.


# Front End

One of the remarkable implementations of the API is the use of custom hook for API request management in our components.

```js
// weather.hooks.js
import { useEffect, useState } from "react";
import { getCurrentLocationName, getCityWeather, getCityWeatherByName } from './weather.api.js';
import {arrPlants} from './plantList.js'

export const useCurrentLocation = () => {
    const [currentLocation, updateCurrentLocation] = useState({});
    const [arrPlantsFiltered, updateArrPlantsFiltered] = useState(arrPlants)


    const filterPlantByName = (e) => {
        const inputValue = e.target.value.toLowerCase();
        const nameFiltered = arrPlants.filter(p => p.title.toLowerCase().includes(inputValue));
        updateArrPlantsFiltered(nameFiltered);
    }
  
    useEffect(() => {
      navigator.geolocation.getCurrentPosition(async (success, error) => {
          if (error) {
              return updateCurrentLocation(`No ha sido posible obtener tu localización`);
          } else {
              const { latitude, longitude } = success.coords;
              const currentLocationInfo = await getCityWeather(latitude, longitude);
              const cityName = await getCurrentLocationName(latitude, longitude);
              updateCurrentLocation({info: currentLocationInfo, name: cityName});
          }
      });
  },[]);
  
      return {currentLocation,
              arrPlantsFiltered,
              filterPlantByName } 

  };


  export const useCityWeatherByName = () => {
    const [cityWeatherByName, updateCityWeatherByName] = useState({});
  
  
      const getCoordsByName = async city => {
          
          const {lon, lat} = await getCityWeatherByName(city);
          const cityInfo = await getCityWeather(lat, lon);
          const cityName = await getCurrentLocationName(lat, lon);
          updateCityWeatherByName({info: cityInfo, name: cityName})
      }
  
      return {
          cityWeatherByName,
          getCityByName: getCoordsByName
      };
  }
```

```js
//weather.api.js

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
```

```js
//home/index.jsx

import { useCurrentLocation, useCityWeatherByName} from '../../data/weather.hooks.js';

function Home() {
   ...
    const {currentLocation, arrPlantsFiltered, filterPlantByName} = useCurrentLocation();
    const {cityWeatherByName, getCityByName} = useCityWeatherByName();
   ...

    return (
        <Header></Header>
```


# Deployment

The application has been deployed using GitHub Pages on the following url:

https://marcogarciakoch.github.io/weather-app/


# Local setup

Although it is deployed in GitHub Pages, it can be configured to run in a local environment.

## Prerequisites

1. Git latest version
2. Create a [new account](https://home.openweathermap.org/users/sign_up) on Open Weather Map API
3. Get a [free account](https://openweathermap.org/price) on the Open Weather Map API
4. Get you *API KEY* on your personal area

To do so, the following steps must be performed:

1. Clone the monorepo

    > git clone https://github.com/MarcoGarciaKoch/weather-app.git

2. On root folder run install

    > npm i

3. Create local .env files inside main packages folder

    - Inside weather-app/maquet .env must declare the following environment vars:

        - REACT_APP_APIKEY= Your API KEY copied on prerequisites step 4


4. Now you can start the app as it follows:

    > npm start (It will start the application)