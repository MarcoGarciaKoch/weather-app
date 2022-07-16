import { useState, useEffect } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import {IoIosArrowUp} from 'react-icons/io';
import Sun from '../../../src/assets/01d.png';
import PartialCloudy from '../../../src/assets/02d.png';
import Cloudy from '../../../src/assets/03d.png';
import MostlyCloudy from '../../../src/assets/04d.png';
import HeavyRain from '../../../src/assets/09d.png';
import Rainy from '../../../src/assets/10d.png';
import Thunder from '../../../src/assets/11d.png';
import Snow from '../../../src/assets/13d.png';
import Fog from '../../../src/assets/50d.png';
import Termometer from '../../../src/assets/Termometer.png';
import TermOne from '../../../src/assets/ter1.svg';
import TermTwo from '../../../src/assets/ter2.svg';
import WeeklyForecast from '../weeklyForecast';
import { Form } from 'react-bootstrap';

function WeatherInfoByName ({cityWeatherByName}) {
    const [showExtraInfo, updateShowExtraInfo] = useState(false);
    const [isCelsius, updateIsCelsius] = useState(true);
    const [arrow, updateArrow] = useState(true);
    const [sunrise, updateSunrise] = useState('');
    const [sunset, updateSunset] = useState('');
    const [date, updateDate] = useState('');

  
    useEffect(() => {
        const getTime = dt => {
            const d = new Date(dt);
            console.log(dt)
            const options = { hour: 'numeric', minute: 'numeric'};
            const f = new Intl.DateTimeFormat('es-ES', options)
            console.log(d)
            updateSunrise(f.format(d))
        }
        getTime(cityWeatherByName?.info?.current?.sunrise*1000);
    }, [])

    useEffect(() => {
        const getTime = dt => {
            const d = new Date(dt);
            console.log(dt)
            const options = { hour: 'numeric', minute: 'numeric'};
            const f = new Intl.DateTimeFormat('es-ES', options)
            console.log(d)
            updateSunset(f.format(d))
        }
        getTime(cityWeatherByName?.info?.current?.sunset*1000);

        const getFullDate = dt => {
            const d = new Date(dt);
            const options = { year: 'numeric', month: 'numeric', day: 'numeric',
            hour: 'numeric', minute: 'numeric'};
            const f = new Intl.DateTimeFormat('es-ES', options)
            updateDate(f.format(d))
        }
        getFullDate(cityWeatherByName?.info?.current?.dt*1000)
    }, [])


    const handleOnClickDown = () => {
        updateShowExtraInfo(!showExtraInfo);
        updateArrow(!arrow)
    }

    const handleOnClickUp = () => {
        updateShowExtraInfo(!showExtraInfo);
        updateArrow(!arrow)
    }
    

    const getIcon = (w) => {
        if(w === 'clear sky') {
            return Sun;
        }else if(w === 'few clouds') {
            return PartialCloudy;
        }else if(w === 'scattered clouds') {
            return Cloudy;
        }else if(w === 'broken clouds') {
            return MostlyCloudy;
        }else if(w === 'shower rain') {
            return HeavyRain;
        }else if(w === 'rain') {
            return Rainy;
        }else if(w === 'thunderstorm') {
            return Thunder;
        }else if(w === 'snow') {
            return Snow;
        }else {
            return Fog
        }
    }
   

    return (
        <main className='leaves-background__container'>
            <div className='blur__container'>
                <div className='info__container'>
                    <section className='main-weather-info__container'>
                        <section className='weather-info__box'>
                            <div className='img_background__box'>
                                <img src={getIcon(cityWeatherByName?.info?.current?.weather[0]?.description)} alt="weather-icon"/>
                            </div>
                            <div>
                                <p className='main-temp'>{isCelsius ? `${parseInt(cityWeatherByName?.info?.current?.temp)}ºC` : `${parseInt(((cityWeatherByName?.info?.current?.temp)*9/5)+32)}ºF`}</p>
                                <p className='city-name'>{cityWeatherByName?.name}</p>
                                <div className='range-temp__container'>
                                    <img src={TermOne} alt="termometer-icon" />
                                    <span className='range-temp'>{isCelsius ? `${parseInt(cityWeatherByName?.info?.daily[0]?.temp?.min)}ºC` : `${parseInt(((cityWeatherByName?.info?.daily[0]?.temp?.min)*9/5)+32)}ºF`}</span>
                                    <img src={TermTwo} alt="termometer-icon" />
                                    <span className='range-temp'>{isCelsius ? `${parseInt(cityWeatherByName?.info?.daily[0]?.temp.max)}ºC` : `${parseInt(((cityWeatherByName?.info?.daily[0]?.temp?.max)*9/5)+32)}ºF`}</span>
                                    {arrow ? <IoIosArrowDown onClick={handleOnClickDown} className='more-info__arrow'></IoIosArrowDown> : <IoIosArrowUp onClick={handleOnClickUp} className='more-info__arrow'></IoIosArrowUp>}
                                </div>
                            </div>
                            <div className='switch__container'>
                                <div className='switch-units__container'>
                                    <span>ºC</span>
                                    <span>ºF</span>
                                </div>
                                <Form onClick={() => updateIsCelsius(!isCelsius)}>
                                    <Form.Check 
                                        className='switch-button'
                                        type="switch"
                                        id="custom-switch"
                                    />
                                </Form>
                            </div>
                        </section>
                        <section className='time-info__box'>
                            <p>{date}</p>
                        </section>
                    </section>
                    <section className={showExtraInfo ? 'extra-weather-info__container' : 'extra-weather-info__container--hidden'}>
                        <div className='extra-info__box'>
                            <p>{`Humedad ${cityWeatherByName?.info?.current?.humidity}%`}</p>
                            <p>{`Indice Radiacion UVA ${cityWeatherByName?.info?.current?.uvi}%`}</p>
                        </div>
                        <div className='extra-info__box'>
                            <p>{`Visibilidad ${cityWeatherByName?.info?.current?.visibility} metros`}</p>
                            <p>{`Velocidad del viento ${cityWeatherByName?.info?.current?.wind_speed} m/s`}</p>
                        </div>
                        <div className='extra-info__box'>
                            <p>{`Amanecer ${sunrise}`}</p>
                            <p>{`Puesta de sol  ${sunset}`}</p>
                        </div>
                    </section>
                    <section className='weekly-info__container'>
                        {cityWeatherByName?.info?.daily?.map((d,i) => <WeeklyForecast key={i} forecast={d} isCelsius={isCelsius}></WeeklyForecast>)}
                    </section>
                </div>
            </div>
        </main>
    )
}


export default WeatherInfoByName;