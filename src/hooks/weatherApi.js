import { useHttp } from "./http.hook";

export const useWeather = () => {

    const {error, clearError, loading, request} = useHttp();

    const weatherHeaders = {
        'X-RapidAPI-Key': '6bde943cfamsh0ce11eba15c8e92p117f22jsnd24d0813f3fc',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    };

    const getForecast = async (location) => {
        const res = await request(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${location}&days=3`, "GET", null, weatherHeaders);
        return res;
    }

    return {error, clearError, loading, getForecast};
}