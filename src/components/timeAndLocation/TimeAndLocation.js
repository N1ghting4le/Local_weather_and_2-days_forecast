import { useEffect } from "react";
import classNames from "classnames";

const TimeAndLocation = ({locationAndTime, hours, setHours, num}) => {
    useEffect(() => {
        if (locationAndTime) {
            setHours(+locationAndTime.time.slice(0, locationAndTime.time.indexOf(':')));
        }
    }, [locationAndTime]);

    const onHoursIncrease = () => {
        setHours(hours => hours + 1);
    }

    const onHoursDecrease = () => {
        setHours(hours => hours - 1);
    }

    const toggleLeftArrow = () => {
        return num === 0 && hours === +locationAndTime.time.slice(0, locationAndTime.time.indexOf(':')) || hours === 0 ?
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
            <span className="time"><i className={`arrow left ${toggleLeftArrow()}`} onClick={onHoursDecrease}></i> {hours === +locationAndTime.time.slice(0, locationAndTime.time.indexOf(':')) ? locationAndTime.time : `${hours}:00`} <i className={`arrow right ${toggleRightArrow()}`} onClick={onHoursIncrease}></i></span>
        </div>
    ) : null;
}

export default TimeAndLocation;