import { useEffect, useContext } from "react";
import { Context } from "../app/App";
import classNames from "classnames";
import './timeAndLocation.css';

export const currentHours = currentLocationAndTime => +currentLocationAndTime.time.slice(0, currentLocationAndTime.time.indexOf(':'));

const TimeAndLocation = () => {
    const {process, locationAndTime, currentLocationAndTime, hours, setHours, num, setlocationAndTime} = useContext(Context);
    const index = locationAndTime ? locationAndTime.time.indexOf(':') : null;
    const currHours = currentLocationAndTime ? currentHours(currentLocationAndTime) : null;

    useEffect(() => {
        if (locationAndTime) {
            setHours(+locationAndTime.time.slice(0, index));
        }
    }, [locationAndTime]);

    const onHoursIncrease = () => {
        if (hours === 23) return;

        setHours(hours => hours + 1);
        setlocationAndTime(state => ({...state, time: `${+state.time.slice(0, index) + 1}:00`}));
    }

    const onHoursDecrease = () => {
        if ((num === 0 && hours === currHours) || hours === 0) return;

        setHours(hours => hours - 1);

        if (num === 0 && hours - 1 === currHours) {
            setlocationAndTime(currentLocationAndTime);
        } else {
            setlocationAndTime(state => ({...state, time: `${+state.time.slice(0, index) - 1}:00`}));
        }
    }

    const onEnter = (e, func) => {
        if (e.code === 'Enter') {
            func();
        }
    }

    const toggleArrow = condition => {
        return condition ?
        classNames({
            'hidden': true
        }) :
        classNames({
            'hidden': false
        });
    }

    return locationAndTime && process === 'confirmed' ? (
        <div className="location_and_time">
            <span style={{textAlign: 'center'}}>{locationAndTime.place}, {locationAndTime.country}</span>
            <span>{locationAndTime.date}</span>
            <span className="time">
                <i className={`arrow left ${toggleArrow((num === 0 && hours === currHours) || hours === 0)}`} 
                   tabIndex={0} 
                   onClick={onHoursDecrease} 
                   onKeyDown={(e) => onEnter(e, onHoursIncrease)}/>
                   {locationAndTime.time} 
                <i className={`arrow right ${toggleArrow(hours === 23)}`} 
                   tabIndex={0} 
                   onClick={onHoursIncrease} 
                   onKeyDown={(e) => onEnter(e, onHoursDecrease)}/>
            </span>
        </div>
    ) : null;
}

export default TimeAndLocation;