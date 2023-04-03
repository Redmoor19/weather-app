import { Paper, TextField, InputAdornment, createTheme, ThemeProvider, Typography, Box, Grid } from '@mui/material';
import { useState } from 'react';
import Location from './img/location.png';
import Wind from "./img/wind.png";
import Hymidity from './img/hymidity.png';
import Pressure from './img/pressure.png';
import Cloud from './img/cloud.png';

import { useWeather } from './hooks/weatherApi';

const theme = createTheme({
    palette: {
        primary: {
            main: "#000"
        }
    }
})

const Weather = ({setLocation}) => {
    const [search, setSearch] = useState('');
    const [forecast, setForecast] = useState();
    const [isCelsius, setIsCelsius] = useState(true);


    const {error, clearError, loading, getForecast} = useWeather();

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            getForecast(search)
                .then( responce => {
                    clearError();
                    setForecast(responce);
                    setLocation(`${responce.location.name}, ${responce.location.country}`);
                })
            setSearch('');
        }
    };

    const upgradeUrl = (url) => {
        const regex = /\/\/cdn\.weatherapi\.com\/weather\/64x64\//g;
        return url.replace(regex, "//cdn.weatherapi.com/weather/128x128/");
    };
    console.log(forecast);

    const weather = forecast ? 
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
    </Box> : null;
    
    return(
        <ThemeProvider theme={theme}>
            <Paper
                sx={{
                    width: 600,
                    maxHeight: 'auto',
                    py: 5,
                    backgroundColor: 'rgba(265, 265, 265, 0.9)',
                    margin: '0 auto',
                    borderRadius: 5,
                    textAlign: 'center'
                }}>
                <TextField
                    label='City'
                    autoFocus={true}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={handleKeyDown}
                    value={search}
                    sx={{
                        width: '60%',
                    }}
                    InputProps = {{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <img className='location_icon' src={Location} alt='location'/>
                            </InputAdornment>
                        )
                    }}
                />
                {weather}
            </Paper>
        </ThemeProvider>
    )
}

export default Weather;