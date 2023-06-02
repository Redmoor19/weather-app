import Wind from "./img/wind.png";
import Hymidity from './img/hymidity.png';
import Pressure from './img/pressure.png';
import Cloud from './img/cloud.png';

import {Typography, Box, Grid} from '@mui/material';
import { useState } from "react";

const Current = ({forecast}) => {
    const [isCelsius, setIsCelsius] = useState(true);

    const upgradeUrl = (url) => {
        const regex = /\/\/cdn\.weatherapi\.com\/weather\/64x64\//g;
        return url.replace(regex, "//cdn.weatherapi.com/weather/128x128/");
    };

    return(
        <Box>
            <Typography 
                variant='h4'
                sx={{mt: 3}}
            >{`${forecast.location.name}, ${forecast.location.country}`}</Typography>
            <img src={upgradeUrl(forecast.current.condition.icon)} alt="" className="weather_icon" />
            <Typography 
                variant='h4'
                onClick={() => setIsCelsius(isCelsius => !isCelsius)}
                style={{cursor: 'pointer'}}
            >
            {isCelsius ? `${forecast.current.temp_c}°C` : `${forecast.current.temp_f}°F`}</Typography>
            <Typography variant='h5'>{forecast.current.condition.text}</Typography>
            <Grid 
                container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
                sx={{
                    mt: 5
                }}>
                <Box>
                    <img className='small_icon' src={Wind} alt='wind'/>
                    <Typography variant='h6'>{`${forecast.current.wind_kph}kph`}</Typography>
                </Box>
                <Box>
                    <img className='small_icon' src={Hymidity} alt='hymidity'/>
                    <Typography variant='h6'>{`${forecast.current.humidity}`}</Typography>
                </Box>
                <Box>
                    <img className='small_icon' src={Cloud} alt='cloud'/>
                    <Typography variant='h6'>{`${forecast.current.cloud}%`}</Typography>
                </Box>
                <Box>
                    <img className='small_icon' src={Pressure} alt='pressure'/>
                    <Typography variant='h6'>{`${forecast.current.pressure_mb}mbar`}</Typography>
                </Box>
            </Grid>
        </Box>
    )
};

export default Current;