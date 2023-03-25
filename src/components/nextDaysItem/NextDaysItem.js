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

    const createWeatherObj = () => {
        setWeather({
            condition: dailyForecast.hourlyForecasts[11].condition.text,
            icon: dailyForecast.hourlyForecasts[11].condition.icon,
            tempo: Math.floor(dailyForecast.hourlyForecasts[11].temp_c),
            humidity: `${dailyForecast.hourlyForecasts[11].humidity}%`,
            wind: `${dailyForecast.hourlyForecasts[11].wind_kph} kph`,
            clouds: `${dailyForecast.hourlyForecasts[11].cloud}%`
        });
    }

    const toggleActive = () => {
        return i === num ?
        classNames({
            'active': true
        }) :
        classNames({
            'active': false
        })
    }

    return (
        <li onClick={updateWeatherInfo} className={toggleActive()}>
            <span className="day">{dailyForecast.date}</span>
            <img src={dailyForecast.weather.condition.icon} alt={dailyForecast.weather.condition.text}></img>
            <span className="temperature">{Math.floor(dailyForecast.weather.mintemp_c)}&deg; - {Math.floor(dailyForecast.weather.maxtemp_c)}&deg;</span>
        </li>
    );
}

export default NextDaysItem;