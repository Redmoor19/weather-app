import { useHttp } from "./http.hook";

export const useImages = () => {
    const {error, loading, clearError, request} = useHttp();

    const imageHeaders = {
        "Accept-Version": "v1",
        "Authorization": "Client-ID GpeusYKOVl_wMEc3dBQtGLewN-kkDWFDm0bzRUp1rjY"
    };

    const getImages = async (search) => {
        const res = await request(`https://api.unsplash.com/search/photos?query=${search}&orientation=landscape`, "GET", null, imageHeaders);
        const result = await res.results.map( item => (item.urls.regular));
        return result;
    }
    
    return {error, loading, clearError, getImages};
}