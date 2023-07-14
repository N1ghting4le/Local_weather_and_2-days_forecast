import './App.css';
import { useState, useEffect } from 'react';
import NextDaysList from '../nextDaysList/NextDaysList';
import TimeAndLocation from '../timeAndLocation/TimeAndLocation';
import WeatherInfo from '../weatherInfo/WeatherInfo';
import Search from '../search/Search';
import useWeatherService from '../../service/WeatherService';

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
    updateLocation();
  }, []);

  useEffect(() => {
    if (coords.length === 2 && !town) {
      setCurrentWeather();
    }
  }, [coords, town]);

  useEffect(() => {
    if (town) {
      setCurrentWeatherBySearch();
    }
  }, [town]);

  const updateLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCoords([position.coords.latitude, position.coords.longitude]);
    });
  }

  const setCurrentWeather = () => {
    getCurrentState(coords[0], coords[1])
    .then(state => {
      clearError();
      setNum(0);
      setDailyForecasts(state.dailyForecasts);
      setWeather(state.currentWeather);
      setCurrent(state.currentWeather);
      setlocationAndTime(state.currentLocationAndTime);
      setCurrentLocationAndTime(state.currentLocationAndTime);
      setProcess('confirmed');
    });
  }

  const setCurrentWeatherBySearch = () => {
    getCurrentStateBySearch(town)
    .then(state => {
      clearError();
      setNum(0);
      setDailyForecasts(state.dailyForecasts);
      setWeather(state.currentWeather);
      setCurrent(state.currentWeather);
      setlocationAndTime(state.currentLocationAndTime);
      setCurrentLocationAndTime(state.currentLocationAndTime);
      setProcess('confirmed');
    });
  }

  return (
    <div className="App">
      <main>
        <h1>Weather</h1>
        <Search setTown={setTown}/>
        <div className="info_wrapper">
          <WeatherInfo
            process={process}
            setWeather={setWeather}
            current={current}
            weather={weather} 
            dailyForecasts={dailyForecasts} 
            hours={hours}
            locationAndTime={locationAndTime}
            currentLocationAndTime={currentLocationAndTime}
            num={num}/>
          <TimeAndLocation
            process={process} 
            locationAndTime={locationAndTime}
            setlocationAndTime={setlocationAndTime}
            currentLocationAndTime={currentLocationAndTime} 
            coords={coords} 
            hours={hours} 
            setHours={setHours}
            num={num}/>
        </div>
        <NextDaysList 
          dailyForecasts={dailyForecasts} 
          setlocationAndTime={setlocationAndTime}
          setNum={setNum}
          current={current}
          setWeather={setWeather}
          currentLocationAndTime={currentLocationAndTime}
          num={num}/>
      </main>
    </div>
  );
}

export default App;
