import { useEffect } from "react";
import classNames from "classnames";

const TimeAndLocation = ({locationAndTime, currentLocationAndTime, hours, setHours, num, setlocationAndTime}) => {
    useEffect(() => {
        if (locationAndTime) {
            setHours(+locationAndTime.time.slice(0, locationAndTime.time.indexOf(':')));
        }
    }, [locationAndTime]);

    const onHoursIncrease = () => {
        setHours(hours => hours + 1);
        setlocationAndTime(state => ({...state, time: `${+state.time.slice(0, locationAndTime.time.indexOf(':')) + 1}:00`}));
    }

    const onHoursDecrease = () => {
        setHours(hours => hours - 1);
        if (num === 0 && hours - 1 === +currentLocationAndTime.time.slice(0, currentLocationAndTime.time.indexOf(':'))) {
            setlocationAndTime(currentLocationAndTime);
        } else {
            setlocationAndTime(state => ({...state, time: `${+state.time.slice(0, locationAndTime.time.indexOf(':')) - 1}:00`}));
        }
    }

    const toggleLeftArrow = () => {
        return num === 0 && hours === +currentLocationAndTime.time.slice(0, currentLocationAndTime.time.indexOf(':')) || hours === 0 ?
        classNames({
            'hidden': true
        }) :
        classNames({
            'hidden': false
        })
    }

    const toggleRightArrow = () => {
        return hours === 23 ?
        classNames({
            'hidden': true
        }) :
        classNames({
            'hidden': false
        })
    }

    return locationAndTime ? (
        <div className="location_and_time">
            <span>{locationAndTime.place}, {locationAndTime.country}</span>
            <span>{locationAndTime.date}</span>
            <span className="time"><i className={`arrow left ${toggleLeftArrow()}`} onClick={onHoursDecrease}></i> {locationAndTime.time} <i className={`arrow right ${toggleRightArrow()}`} onClick={onHoursIncrease}></i></span>
        </div>
    ) : null;
}

export default TimeAndLocation;