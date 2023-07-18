import { useEffect, useContext, useMemo } from "react";
import { Context } from "../app/App";
import classNames from "classnames";

export const currentHours = currentLocationAndTime => +currentLocationAndTime.time.slice(0, currentLocationAndTime.time.indexOf(':'));

const TimeAndLocation = () => {
    const {process, locationAndTime, currentLocationAndTime, hours, setHours, num, setlocationAndTime} = useContext(Context);
    const index = useMemo(() => locationAndTime ? locationAndTime.time.indexOf(':') : null, [locationAndTime]);

    useEffect(() => {
        if (locationAndTime) {
            setHours(+locationAndTime.time.slice(0, index));
        }
    }, [locationAndTime]);

    const onHoursIncrease = () => {
        setHours(hours => hours + 1);
        setlocationAndTime(state => ({...state, time: `${+state.time.slice(0, index) + 1}:00`}));
    }

    const onHoursDecrease = () => {
        setHours(hours => hours - 1);
        if (num === 0 && hours - 1 === currentHours(currentLocationAndTime)) {
            setlocationAndTime(currentLocationAndTime);
        } else {
            setlocationAndTime(state => ({...state, time: `${+state.time.slice(0, index) - 1}:00`}));
        }
    }

    const onHoursIncreaseByKey = (e) => {
        if (e.code === 'Enter') {
            onHoursIncrease();
        }
    }

    const onHoursDecreaseByKey = (e) => {
        if (e.code === 'Enter') {
            onHoursDecrease();
        }
    }

    const toggleLeftArrow = () => {
        return num === 0 && hours === currentHours(currentLocationAndTime) || hours === 0 ?
        classNames({
            'hidden': true
        }) :
        classNames({
            'hidden': false
        });
    }

    const toggleRightArrow = () => {
        return hours === 23 ?
        classNames({
            'hidden': true
        }) :
        classNames({
            'hidden': false
        });
    }

    return locationAndTime && process === 'confirmed' ? (
        <div className="location_and_time">
            <span style={{'textAlign': 'center'}}>{locationAndTime.place}, {locationAndTime.country}</span>
            <span>{locationAndTime.date}</span>
            <span className="time">
                <i className={`arrow left ${toggleLeftArrow()}`} 
                   tabIndex={0} 
                   onClick={onHoursDecrease} 
                   onKeyDown={onHoursDecreaseByKey}/> {locationAndTime.time} <i className={`arrow right ${toggleRightArrow()}`} 
                                                                                tabIndex={0} 
                                                                                onClick={onHoursIncrease} 
                                                                                onKeyDown={onHoursIncreaseByKey}/>
            </span>
        </div>
    ) : null;
}

export default TimeAndLocation;