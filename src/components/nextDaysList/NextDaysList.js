import NextDaysItem from "../nextDaysItem/NextDaysItem";
import { Context } from "../app/App";
import { useContext } from "react";

const NextDaysList = () => {
    const {process, dailyForecasts} = useContext(Context);

    const createDayCards = () => {
        return dailyForecasts ? dailyForecasts.map((dailyForecast, i) => {
            return <NextDaysItem key={i} i={i} dailyForecast={dailyForecast}/>
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