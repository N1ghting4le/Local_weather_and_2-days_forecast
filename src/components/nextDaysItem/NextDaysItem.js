import classNames from "classnames";

const NextDaysItem = ({dailyForecast, setlocationAndTime, i, setNum, current, setWeather, currentLocationAndTime, num}) => {
    const updateWeatherInfo = () => {
        setNum(i);
        if (i !== 0) {
            setlocationAndTime(state => ({...state, date: dailyForecast.date, time: '12:00'}));
            createWeatherObj();
        } else {
            setWeather(current);
            setlocationAndTime(currentLocationAndTime);
        }                                      
    }

    const updateWeatherInfoByKey = (e) => {
        if (e.code === 'Enter') {
            updateWeatherInfo();
        }
    }

    const createWeatherObj = () => {
        setWeather({
            condition: dailyForecast.hourlyForecasts[12].condition.text,
            icon: dailyForecast.hourlyForecasts[12].condition.icon,
            tempo: Math.floor(dailyForecast.hourlyForecasts[12].temp_c),
            humidity: `${dailyForecast.hourlyForecasts[12].humidity}%`,
            wind: `${dailyForecast.hourlyForecasts[12].wind_kph} kph`,
            clouds: `${dailyForecast.hourlyForecasts[12].cloud}%`
        });
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
        <li onClick={updateWeatherInfo} onKeyDown={updateWeatherInfoByKey} tabIndex={0} className={toggleActive()}>
            <span className="day">{dailyForecast.date}</span>
            <img src={dailyForecast.weather.condition.icon} alt={dailyForecast.weather.condition.text}></img>
            <span className="temperature">{Math.floor(dailyForecast.weather.mintemp_c)}&deg; - {Math.floor(dailyForecast.weather.maxtemp_c)}&deg;</span>
        </li>
    );
}

export default NextDaysItem;