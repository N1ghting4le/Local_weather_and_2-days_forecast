import NextDaysItem from "../nextDaysItem/NextDaysItem";

const NextDaysList = ({process, dailyForecasts, setlocationAndTime, setNum, current, setWeather, currentLocationAndTime, num}) => {
    const createDayCards = () => {
        return dailyForecasts ? dailyForecasts.map((dailyForecast, i) => {
            return <NextDaysItem key={i} 
                                    i={i} 
                                    dailyForecast={dailyForecast} 
                                    setlocationAndTime={setlocationAndTime}
                                    setNum={setNum}
                                    current={current}
                                    setWeather={setWeather}
                                    currentLocationAndTime={currentLocationAndTime}
                                    num={num}/>
        }) : null;
    }

    const elements = createDayCards();

    return process === 'confirmed' ? (
        <ul className="next_days">
            {elements}
        </ul>
    ) : null;
}

export default NextDaysList;