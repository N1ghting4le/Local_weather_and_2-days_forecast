import {useEffect} from 'react';

const WeatherInfo = ({process, setWeather, current, weather, dailyForecasts, hours, locationAndTime, num}) => {
    useEffect(() => {
        if (locationAndTime) {
            updateWeather();
        } else if (num !== 0) {
            return;
        } else {
            setWeather(current);
        }
    }, [hours]);

    const updateWeather = () => {
        setWeather({
            condition: dailyForecasts[num].hourlyForecasts[hours].condition.text,
            icon: dailyForecasts[num].hourlyForecasts[hours].condition.icon,
            tempo: Math.floor(dailyForecasts[num].hourlyForecasts[hours].temp_c),
            humidity: `${dailyForecasts[num].hourlyForecasts[hours].humidity}%`,
            wind: `${dailyForecasts[num].hourlyForecasts[hours].wind_kph} kph`,
            clouds: `${dailyForecasts[num].hourlyForecasts[hours].cloud}%`
        });
    }

    return process === 'confirmed' ? (
        <>
            <div className="main_info">
                <img src={weather.icon} alt="sun with clouds" className="weather_icon"></img>
                <div className="tempo">
                    <span className="number">{weather.tempo}</span>
                    <span className="degrees">&deg;C</span>
                </div>
                <div className="state">{weather.condition}</div>
            </div>
            <div className="additional_info">
                <span>Clouds: {weather.clouds}</span>
                <span>Humidity: {weather.humidity}</span>
                <span>Wind speed: {weather.wind}</span>
            </div>
        </>
    ) : null; 
}

export default WeatherInfo;