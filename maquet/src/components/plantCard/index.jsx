import './style.css'
import mas from '../../assets/mas.svg'

function PlantCard({card, currentWeather}) {
    
    const irrigateByTemp = temp => {
        if(temp <= 10) {
            return card.frio
        }else if (temp > 10 && temp <= 25) {
            return card.favorable
        }else {
            return card.calor
        }
    }
    
    return (

        <>
            <div className='card__container'>

                <div className='card-plant-front'>

                    <img className='card-img' src={card.img} alt="" />

                    <section className='card-text'>
                        <p>{card.title}</p>
                    </section>
                </div>

                <div className='card-plant-back'>
                    <article className='back-title__container'>
                        <h1 className='back-title'>{card.title}</h1>
                    </article>

                    <article className='text__container'>

                        <section className='dinamic-text'>
                            <h1 className='section-title'>Información en tiempo real</h1>
                            <p>{irrigateByTemp(currentWeather?.info?.current?.temp)}</p>
                            <p>{currentWeather?.info?.current?.humidity > 50 ? card.alta : card.baja}</p>
                        </section>

                        <section className='fixed-text'>
                            <h1 className='section-title'>Carácteristicas generales</h1>
                            <p>{card.riego}</p>
                            <p>Humedad: {card.hum_min}% - {card.hum_max}%</p>
                            <p>Temperatura: {card.temp_minC}ºC - {card.temp_maxC}ºC </p>
                            <p> <img src={mas} alt="plus-icon" /> Información</p>
                        </section>
                    </article>

                </div>

            </div>
        </>
    )
}

export default PlantCard