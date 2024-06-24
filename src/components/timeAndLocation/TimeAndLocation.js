import { useGlobalContext } from "../GlobalContext";
import { getHours, onEnter } from "../../commonFunctions";
import classNames from "classnames";
import './timeAndLocation.css';

const Arrow = ({classNames, handleClick}) => (
    <i className={`arrow ${classNames}`}
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={(e) => onEnter(e, handleClick)}/>
);

const TimeAndLocation = () => {
    const {process, locationAndTime, currentLocationAndTime, setlocationAndTime, dailyForecasts, num, current, setWeather, updateWeather} = useGlobalContext();
    const currHours = getHours(currentLocationAndTime);
    const hours = getHours(locationAndTime);
    const disableDecrease = (num === 0 && hours === currHours) || hours === 0;
    const disableIncrease = hours === 23;

    const onHoursIncrease = () => {
        if (disableIncrease) return;

        setlocationAndTime(state => ({...state, time: `${hours + 1}:00`}));
        updateWeather(dailyForecasts[num], hours + 1);
    }

    const onHoursDecrease = () => {
        if (disableDecrease) return;

        if (num === 0 && hours - 1 === currHours) {
            setlocationAndTime(currentLocationAndTime);
            setWeather(current);
        } else {
            setlocationAndTime(state => ({...state, time: `${hours - 1}:00`}));
            updateWeather(dailyForecasts[num], hours - 1);
        }
    }

    const toggleArrow = condition => classNames({
        'hidden': condition
    });

    return process === 'confirmed' ? (
        <div className="location_and_time">
            <span style={{textAlign: 'center'}}>{locationAndTime.place}, {locationAndTime.country}</span>
            <span>{locationAndTime.date}</span>
            <span className="time">
                <Arrow classNames={`left ${toggleArrow(disableDecrease)}`}
                        handleClick={onHoursDecrease}/>
                {locationAndTime.time}
                <Arrow classNames={`right ${toggleArrow(disableIncrease)}`}
                        handleClick={onHoursIncrease}/>
            </span>
        </div>
    ) : null;
}

export default TimeAndLocation;