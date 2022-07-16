import './style.css';
import Header from '../../components/header';
import Footer from '../../components/Footer';
import search from '../../assets/search.svg';
import location from '../../assets/location.svg';
import union from '../../assets/union.svg';
import PlantCard from '../../components/plantCard';
import CurrentWeatherInfo from '../../components/CurrentWeatherInfo';
import WeatherInfoByName from '../../components/WeatherInfoByName';
import { useCurrentLocation, useCityWeatherByName} from '../../data/weather.hooks.js';
import { useState } from 'react';

function Home() {
    const [inputValue, updateInputValue] = useState('')
    const {currentLocation, arrPlantsFiltered, filterPlantByName} = useCurrentLocation();
    const {cityWeatherByName, getCityByName} = useCityWeatherByName();
    const [isCurrentLocation, updateIsCurrentLocation] = useState(true)
    
    const showWeatherByName = () => {
        if(inputValue.length >=1){
            getCityByName(inputValue);
            updateIsCurrentLocation(false);
            updateInputValue('');
        }else{
            console.log('Input vacío, no se puede mostrar ninguna ciudad');
        }
    }

    return (
        <>
        {(isCurrentLocation && Object.keys(currentLocation).length === 0) || (!isCurrentLocation && Object.keys(cityWeatherByName).length === 0) ? "" :
        <>
        <Header></Header>
            
            <div className='input__container'>
                <h1 className='welcome-title'>Bienvenido a <span className='tu-zona'>tu zona</span> de cuidado</h1>
                <div className='form__container'>
                    <input onChange={e => updateInputValue(e.target.value)} value={inputValue} className='input-box' placeholder='Localización'></input>
                    <button onClick={showWeatherByName}><img src={search}></img></button>
                    <button onClick={() => updateIsCurrentLocation(true)}><img src={location}></img></button>
                </div>
            </div>
        
            {isCurrentLocation ? <CurrentWeatherInfo currentLocationWeather={currentLocation}></CurrentWeatherInfo> : <WeatherInfoByName cityWeatherByName={cityWeatherByName}></WeatherInfoByName>}
           
            <section className='plants-section'>
                <div className='cards-section'>
                     <h1 className='plants-title' > Tus plantas</h1>
                    <div className='input-plants__container'>
                        <img className='union-icon' src={union} alt="" />
                        <input className='input-plants' placeholder='Busca tus plantas' onChange={filterPlantByName}></input>
                    </div>
                    <section className='cards__container'>
                    {arrPlantsFiltered?.map((c,i) => <PlantCard key={i} card={c} currentWeather={isCurrentLocation ? currentLocation : cityWeatherByName}></PlantCard>)}
                    </section>
                </div>
            </section>
            <Footer></Footer>
            </>
            }
        </>
    )
}

export default Home;