import classNames from "classnames";
import { Context } from "../app/App";
import { updateWeather } from "../weatherInfo/WeatherInfo";
import { useContext } from "react";
import { onEnter } from "../timeAndLocation/TimeAndLocation";
import './nextDaysItem.css';

const NextDaysItem = ({dailyForecast, i}) => {
    const {setlocationAndTime, setNum, current, setWeather, currentLocationAndTime, num} = useContext(Context);

    const updateWeatherInfo = () => {
        setNum(i);
        if (i !== 0) {
            setlocationAndTime(state => ({...state, date: dailyForecast.date, time: '12:00'}));
            updateWeather(dailyForecast, 12, setWeather);
        } else {
            setWeather(current);
            setlocationAndTime(currentLocationAndTime);
        }                                      
    }

    const toggleActive = () => {
        return i === num ?
        classNames({
            'active': true
        }) :
        classNames({
            'active': false
        });
    }

    return (
        <li onClick={updateWeatherInfo} onKeyDown={(e) => onEnter(e, updateWeatherInfo)} tabIndex={0} className={toggleActive()}>
            <span className="day">{dailyForecast.date}</span>
            <img src={dailyForecast.weather.condition.icon} alt={dailyForecast.weather.condition.text}></img>
            <span className="temperature">{Math.floor(dailyForecast.weather.mintemp_c)}&deg; - {Math.floor(dailyForecast.weather.maxtemp_c)}&deg;</span>
        </li>
    );
}

export default NextDaysItem;