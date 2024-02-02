import { useEffect, useContext } from 'react';
import { Context } from '../app/App';
import { currentHours } from '../timeAndLocation/TimeAndLocation';
import Spinner from '../spinner/Spinner';
import Error from '../error/Error';
import './weatherInfo.css';

export const updateWeather = (root, hours, setWeather) => {
    setWeather({
        condition: root.hourlyForecasts[hours].condition.text,
        icon: root.hourlyForecasts[hours].condition.icon,
        tempo: Math.floor(root.hourlyForecasts[hours].temp_c),
        humidity: `${root.hourlyForecasts[hours].humidity}%`,
        wind: `${root.hourlyForecasts[hours].wind_kph} kph`,
        clouds: `${root.hourlyForecasts[hours].cloud}%`
    });
}

const setContent = (process, weather) => {
    switch (process) {
        case 'loading':
            return <Spinner/>;
        case 'confirmed':
            return <View weather={weather}/>;
        case 'error':
            return <Error text="Please enter the correct name of town"/>;
        case 'geolocation disabled':
            return <Error text="If you want to get weather data of your current location please turn on geolocation on your device 
                                and allow website to use it"/>
    }
}

const WeatherInfo = () => {
    const {process, setWeather, current, weather, dailyForecasts, hours, locationAndTime, currentLocationAndTime, num} = useContext(Context);

    useEffect(() => {
        if (locationAndTime && (num !== 0 || num === 0 && hours !== currentHours(currentLocationAndTime))) {
            updateWeather(dailyForecasts[num], hours, setWeather);
        } else if (num !== 0) {
            return;
        } else {
            setWeather(current);
        }
    }, [hours]);

    return setContent(process, weather);
}

export default WeatherInfo;

const View = ({weather}) => {
    return (
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
    );
}