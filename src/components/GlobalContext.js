import { useState, useEffect, createContext, useContext } from 'react';
import useWeatherService from '../service/WeatherService';

const Context = createContext({});

const GlobalContext = ({children, town}) => {
    const [weather, setWeather] = useState(null);
    const [locationAndTime, setlocationAndTime] = useState(null);
    const [currentLocationAndTime, setCurrentLocationAndTime] = useState(null);
    const [coords, setCoords] = useState([]);
    const [dailyForecasts, setDailyForecasts] = useState([]);
    const [num, setNum] = useState(0);
    const [current, setCurrent] = useState(null);
    const {getCurrentState, process, setProcess, clearError} = useWeatherService();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setCoords([position.coords.latitude, position.coords.longitude]);
        });
    }, []);

    useEffect(() => {
        if (town) {
            getCurrentState(town).then(resolve);
        } else if (coords.length) {
            getCurrentState(coords).then(resolve);
        } else {
            setProcess('geolocation disabled');
        }
    }, [coords, town]);

    const resolve = state => {
        clearError();
        setNum(0);
        setDailyForecasts(state.dailyForecasts);
        setWeather(state.currentWeather);
        setCurrent(state.currentWeather);
        setlocationAndTime(state.currentLocationAndTime);
        setCurrentLocationAndTime(state.currentLocationAndTime);
        setProcess('confirmed');
    }

    const updateWeather = (root, hours) => {
        setWeather({
            condition: root.hourlyForecasts[hours].condition.text,
            icon: root.hourlyForecasts[hours].condition.icon,
            tempo: Math.floor(root.hourlyForecasts[hours].temp_c),
            humidity: `${root.hourlyForecasts[hours].humidity}%`,
            wind: `${root.hourlyForecasts[hours].wind_kph} kph`,
            clouds: `${root.hourlyForecasts[hours].cloud}%`
        });
    }

    return (
        <Context.Provider value={{
            process,
            current,
            weather,
            setWeather,
            updateWeather,
            dailyForecasts, 
            locationAndTime,
            setlocationAndTime, 
            currentLocationAndTime,
            num,
            setNum,
            coords,
        }}>
            {children}
        </Context.Provider>
    );
}

export const useGlobalContext = () => useContext(Context);

export default GlobalContext;