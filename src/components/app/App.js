import './App.css';
import { useState } from 'react';
import GlobalContext from '../GlobalContext';
import NextDaysList from '../nextDaysList/NextDaysList';
import TimeAndLocation from '../timeAndLocation/TimeAndLocation';
import WeatherInfo from '../weatherInfo/WeatherInfo';
import Search from '../search/Search';

function App() {
  const [town, setTown] = useState(null);

  return (
    <div className="App">
      <main>
        <h1>Weather</h1>
        <Search setTown={setTown}/>
        <GlobalContext town={town}>
          <div className="info_wrapper">
            <WeatherInfo/>
            <TimeAndLocation/>
          </div>
          <NextDaysList/>
        </GlobalContext>
      </main>
    </div>
  );
}

export default App;