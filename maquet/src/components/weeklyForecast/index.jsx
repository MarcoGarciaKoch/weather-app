import './style.css';
import Suns from '../../assets/127.svg';
import PartialCloudys from '../../assets/126.svg'
import Cloudys from '../../assets/125.svg'
import MostlyCloudys from '../../assets/124.svg'
import HeavyRains from '../../assets/128.svg'
import Rainys from '../../assets/129.svg'
import Thunders from '../../assets/130.svg'
import Snows from '../../assets/131.svg'
import Fogs from '../../assets/132.svg'



function WeeklyForecast ({forecast, isCelsius}) {

    const getIconSmall = (w) => {
        if(w === 'Clear') {
            return Suns;
        }else if(w === 'Clouds') {
            return Cloudys;
        }else if(w === 'Rain') {
            return Rainys;
        }else if(w === 'Thunderstorm') {
            return Thunders;
        }else if(w === 'Drizzle') {
            return MostlyCloudys;
        }else if(w === 'Snow') {
            return Snows;
        }else {
            return Fogs
        }
    }

     const getDay = dt => {
        const d = new Date(dt);
        const options = { weekday: 'long'};
        const f = new Intl.DateTimeFormat('es-ES', options)
        return f.format(d).toUpperCase()
    }

    return (
        <section className='weekly-info__container'>
            <section className='week-day'>
                <img src={getIconSmall(forecast?.weather[0]?.main)} alt="week-day-weather-icon" />
                <p className='temp'>{isCelsius ? `${parseInt(forecast.temp.min)}ºC` : `${parseInt(((forecast.temp.min)*9/5)+32)}ºF`} - {isCelsius ? `${parseInt(forecast.temp.max)}ºC` : `${parseInt(((forecast.temp.max)*9/5)+32)}ºF`}</p>
                <p>{getDay(forecast.dt*1000)}</p>
            </section>
        </section>
    )
}




export default WeeklyForecast;