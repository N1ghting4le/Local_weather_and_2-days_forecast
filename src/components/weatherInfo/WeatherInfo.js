import { useGlobalContext } from "../GlobalContext";
import Spinner from '../spinner/Spinner';
import Error from '../error/Error';
import './weatherInfo.css';

const WeatherInfo = () => {
    const {process, weather} = useGlobalContext();

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

export default WeatherInfo;

const View = ({weather}) => (
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