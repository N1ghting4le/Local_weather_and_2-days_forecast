import './App.css';
import { useState, useEffect, createContext } from 'react';
import NextDaysList from '../nextDaysList/NextDaysList';
import TimeAndLocation from '../timeAndLocation/TimeAndLocation';
import WeatherInfo from '../weatherInfo/WeatherInfo';
import Search from '../search/Search';
import useWeatherService from '../../service/WeatherService';

export const Context = createContext({});

function App() {
  const [locationAndTime, setlocationAndTime] = useState(null);
  const [currentLocationAndTime, setCurrentLocationAndTime] = useState(null);
  const [coords, setCoords] = useState([]);
  const [dailyForecasts, setDailyForecasts] = useState([]);
  const [hours, setHours] = useState(null);
  const [num, setNum] = useState(0);
  const [weather, setWeather] = useState(null);
  const [current, setCurrent] = useState(null);
  const [town, setTown] = useState(null);
  const {getCurrentState, getCurrentStateBySearch, process, setProcess, clearError} = useWeatherService();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCoords([position.coords.latitude, position.coords.longitude]);
    });
  }, []);

  useEffect(() => {
    if (coords.length === 2 && !town) {
      getCurrentState(coords[0], coords[1]).then(resolve);
    }
  }, [coords, town]);

  useEffect(() => {
    if (!coords.length) {
      setProcess('geolocation disabled');
    }
  }, [coords]);

  useEffect(() => {
    if (town) {
      getCurrentStateBySearch(town).then(resolve);
    }
  }, [town]);

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

  return (
    <div className="App">
      <main>
        <h1>Weather</h1>
        <Search setTown={setTown}/>
        <Context.Provider value={{process,
                                  weather, 
                                  setWeather, 
                                  current,  
                                  dailyForecasts, 
                                  hours,
                                  setHours, 
                                  locationAndTime,
                                  setlocationAndTime, 
                                  currentLocationAndTime,
                                  num,
                                  setNum,
                                  coords}}>
          <div className="info_wrapper">
            <WeatherInfo/>
            <TimeAndLocation/>
          </div>
          <NextDaysList/>
        </Context.Provider>
      </main>
    </div>
  );
}

export default App;
