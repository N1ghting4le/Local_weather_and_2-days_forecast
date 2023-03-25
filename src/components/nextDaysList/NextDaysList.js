import NextDaysItem from "../nextDaysItem/NextDaysItem";

const NextDaysList = ({dailyForecasts, setlocationAndTime, setNum, current, setWeather, currentLocationAndTime, num}) => {
    const createDayCards = () => {
        if (dailyForecasts) {
            return dailyForecasts.map((dailyForecast, i) => {
                return <NextDaysItem key={i} 
                                        i={i} 
                                        dailyForecast={dailyForecast} 
                                        setlocationAndTime={setlocationAndTime}
                                        setNum={setNum}
                                        current={current}
                                        setWeather={setWeather}
                                        currentLocationAndTime={currentLocationAndTime}
                                        num={num}/>
            });
        }
        return null;
    }

    const elements = createDayCards();

    return (
        <ul className="next_days">
            {elements}
        </ul>
    );
}

export default NextDaysList;