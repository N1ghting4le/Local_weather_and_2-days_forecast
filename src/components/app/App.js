import './App.css';
import { useState, useEffect } from 'react';
import NextDaysList from '../nextDaysList/NextDaysList';
import TimeAndLocation from '../timeAndLocation/TimeAndLocation';
import WeatherInfo from '../weatherInfo/WeatherInfo';
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
  const {getCurrentState, process, setProcess} = useWeatherService();

  useEffect(() => {
    updateLocation();
  }, []);

  useEffect(() => {
    if (coords.length === 2) {
        setCurrentWeather();
    }
  }, [coords]);

  const updateLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
        setCoords([position.coords.latitude, position.coords.longitude]);
    });
  }

  const setCurrentWeather = () => {
    getCurrentState(coords[0], coords[1])
        .then(state => {
            setDailyForecasts(state.dailyForecasts);
            setWeather(state.currentWeather);
            setCurrent(state.currentWeather);
            setlocationAndTime(state.currentLocationAndTime);
            setCurrentLocationAndTime(state.currentLocationAndTime);
            console.log(state);
        })
        .then(() => setProcess('confirmed'));
  }

  return (
    <div className="App">
      <h1>Weather</h1>
      <main>
        <div className="info_wrapper">
          <WeatherInfo
            process={process}
            setWeather={setWeather}
            current={current}
            weather={weather} 
            dailyForecasts={dailyForecasts} 
            hours={hours}
            locationAndTime={locationAndTime}
            num={num}/>
          <TimeAndLocation 
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
