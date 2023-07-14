import { useHttp } from "../hooks/http.hook";

const useWeatherService = () => {
    const { request, clearError, process, setProcess } = useHttp();

    const _apiBase = 'https://api.weatherapi.com/v1/';
    const _apiKey = 'cfb797107452426caf663343232403';

    const getCurrentState = async (lat, lon, days = 3) => {
        const res = await request(
            `${_apiBase}forecast.json?key=${_apiKey}&q=${lat},${lon}&days=${days}`
        );
        return transformState(res);
    };

    const getCurrentStateBySearch = async (town, days = 3) => {
        const res = await request(
            `${_apiBase}forecast.json?key=${_apiKey}&q=${town}&days=${days}`
        );
        return transformState(res);
    };

    const transformState = (res) => {
        return {
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
    };

    return {
		clearError,
		process,
		setProcess,
		getCurrentState,
        getCurrentStateBySearch
	};
}

export default useWeatherService;