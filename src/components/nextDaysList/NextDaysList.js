import NextDaysItem from "../nextDaysItem/NextDaysItem";
import { useGlobalContext } from "../GlobalContext";
import './nextDaysList.css';

const NextDaysList = () => {
    const {process, dailyForecasts} = useGlobalContext();

    const createDayCards = () => dailyForecasts ? 
        dailyForecasts.map((dailyForecast, i) => <NextDaysItem key={i} i={i} dailyForecast={dailyForecast}/>) 
        : null;

    const elements = createDayCards();

    return process === 'confirmed' ? (
        <ul className="next_days">
            {elements}
        </ul>
    ) : null;
}

export default NextDaysList;