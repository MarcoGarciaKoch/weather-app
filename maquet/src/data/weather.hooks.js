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
  
