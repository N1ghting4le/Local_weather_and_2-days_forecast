export const getHours = locationAndTime => +locationAndTime?.time.slice(0, locationAndTime.time.indexOf(':'));

export const onEnter = (e, func, ...args) => {
    if (e.code === 'Enter') {
        func(...args);
    }
}