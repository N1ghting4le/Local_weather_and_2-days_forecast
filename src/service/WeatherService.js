import { useHttp } from "../hooks/http.hook";

const cache = new Map();

const useWeatherService = () => {
    const { request, clearError, process, setProcess } = useHttp();

    const _apiBase = 'https://api.weatherapi.com/v1/';
    const _apiKey = 'cfb797107452426caf663343232403';

    const getCurrentState = async (geodata, days = 3) => {
        if (cache.has(geodata)) {
            return cache.get(geodata);
        }

        const geodataStr = Array.isArray(geodata) ? geodata.join() : geodata;

        const res = await request(
            `${_apiBase}forecast.json?key=${_apiKey}&q=${geodataStr}&days=${days}`
        );

        return transformState(res, geodata);
    };

    const transformState = (res, key) => {
        const obj = {
            currentWeather: {
                condition: res.current.condition.text,
                icon: res.current.condition.icon,
                tempo: Math.floor(res.current.temp_c),
                humidity: `${res.current.humidity}%`,
                wind: `${res.current.wind_kph} kph`,
                clouds: `${res.current.cloud}%`
            },
            currentLocationAndTime: {
                country: res.location.country,
                time: res.location.localtime.slice(res.location.localtime.indexOf(' ')),
                date: res.location.localtime.slice(0, res.location.localtime.indexOf(' ')),
                place: res.location.name
            },
            dailyForecasts: res.forecast.forecastday.map(day => {
                return {
                    date: day.date,
                    weather: day.day,
                    hourlyForecasts: day.hour
                }
            }) 
        };

        cache.set(key, obj);

        return obj;
    };

    return {
		clearError,
		process,
		setProcess,
		getCurrentState
	};
}

export default useWeatherService;