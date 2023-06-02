import {Typography, Box, Grid, Table, TableBody, TableRow, TableCell} from '@mui/material';
import { useState } from 'react';

import Back from './img/back-button.png';

const Forecast = ({forecast}) => {
    const [display, setDisplay] = useState();

    const sortedData = forecast.forecast.forecastday.map( day => {
        return{
            date: day.date,
            day: {
                maxtemp_c: day.day.maxtemp_c,
                maxtemp_f: day.day.maxtemp_f,
                mintemp_c: day.day.mintemp_c,
                mintemp_f: day.day.mintemp_f,
                maxwind_kph: day.day.maxwind_kph,
                avghumidity: day.day.avghumidity,
                daily_chance_of_rain: day.day.daily_chance_of_rain,
                totalprecip_mm: day.day.totalprecip_mm,
                text: day.day.condition.text,
                icon: day.day.condition.icon
            },
            astro:{
                sunrise: day.astro.sunrise,
                sunset: day.astro.sunset,
            }
        }
    });

    const current = sortedData.find( day => day.date === display);

    return(
        <Box>
            <Typography 
                variant='h4'
                sx={{mt: 3}}
            >{`${forecast.location.name}, ${forecast.location.country}`}</Typography>
            {display ?
            <DayFull day={current} setDisplay={setDisplay}/> :
            <Grid
                container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
                sx={{
                    mt: 3
                }}>
                {sortedData.map( day => 
                    <DayBrief key={day.date} day={day} setDisplay={setDisplay}/>
                )}
            </Grid>}
        </Box>
    )
};

const DayBrief = ({day, setDisplay}) => {
    const weekdays = ['Sun','Mon' ,'Tue' ,'Wed' ,'Thu' ,'Fri' ,'Sat'];
    const date = new Date(day.date);
    const formatedDate = `${weekdays[date.getDay()]} ${date.getDate()}.${date.getMonth() + 1}`;

    return (
        <Box sx={{
            borderRadius: 5,
            p: 4,
            boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
            backgroundColor: '#fff',
            cursor: 'pointer'}}
            onClick={() => setDisplay(day.date)}>
            <Typography variant='h5'>{formatedDate}</Typography>
            <img style={{display: 'block', margin: '0 auto', marginTop: 4}} src={day.day.icon} alt={day.day.text}/>
            <Typography variant='h6' sx={{mt: 1}}>{day.day.maxtemp_c}°/{day.day.mintemp_c}°</Typography>
        </Box>
    )
};

const DayFull = ({day, setDisplay}) => {

    return(
        <Box>
            <Grid
                container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
                sx={{mt: 4}}>
                <Grid
                    container
                    direction="column"
                    justifyContent="space-around"
                    gap={5}
                    sx={{
                        width: 200,
                        height: 'auto'}}>
                    <Grid 
                        container
                        direction="row"
                        justifyContent="space-around"
                        sx={{
                        borderRadius: 5,
                        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                        backgroundColor: '#fff',
                        width: 200}}>
                        <Box>
                            <Typography variant='h5'>{day.day.text}</Typography>
                            <img style={{display: 'block', margin: '0 auto'}} src={day.day.icon} alt={day.day.text}/>
                        </Box>
                        <Box>
                            <Typography sx={{mt: 2}} variant='h6'>Max: {day.day.maxtemp_c}°</Typography>
                            <Typography variant='h6'>Min: {day.day.mintemp_c}°</Typography>
                        </Box>
                    </Grid>
                    <Box
                        sx={{
                        borderRadius: 5,
                        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                        backgroundColor: '#fff',    
                        width: 200}}>
                        <Typography variant='h6'>Sunrise: {day.astro.sunrise}</Typography>
                        <Typography variant='h6'>Sunset: {day.astro.sunset}</Typography>
                    </Box>
                </Grid>
                <Box sx={{
                    borderRadius: 5,
                    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                    backgroundColor: '#fff',
                    p: 1
                    }}>
                    <Table >
                        <TableBody>
                            <TableRow>
                                <TableCell>Hymidity</TableCell>
                                <TableCell>{day.day.avghumidity}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Wind</TableCell>
                                <TableCell>{day.day.maxwind_kph}kph</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Chance of rain</TableCell>
                                <TableCell>{day.day.daily_chance_of_rain}%</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Precipitation </TableCell>
                                <TableCell>{day.day.totalprecip_mm}mm</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Box>
            </Grid>
            <img 
                style={{display: 'block', margin: '0 auto', marginTop: 6, width: 30, cursor: 'pointer'}} 
                src={Back} 
                alt='back'
                onClick={() => setDisplay()}
                ></img>
        </Box>
    )
}

export default Forecast;