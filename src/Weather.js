import { Paper, TextField, InputAdornment, Switch, Box } from '@mui/material';
import { RingLoader } from 'react-spinners'
import { useState } from 'react';
import Location from './img/location.png';

import { useWeather } from './hooks/weatherApi';
import Current from './Current';
import Forecast from './Forecast';

const Weather = ({setLocation}) => {
    const [search, setSearch] = useState('');
    const [forecast, setForecast] = useState();
    const [tab, setTab] = useState('1');

    const changeTab = () => {
        if (tab === '1') {
            setTab('2')
        } else {
            setTab('1')
        }
    };

    const {clearError, loading, getForecast} = useWeather();

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

    return(
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
                { forecast && 
                <Box sx={{display: 'block', mb: 2}}>
                    <Switch onClick={changeTab}/>
                </Box>
                }
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
                {loading && 
                <Box sx={{margin: '0 auto', width: 40, mt: 5}}>
                    <RingLoader color="#798AA3"/>
                </Box>}
                {(forecast && !loading) && 
                (tab === '1') ? <Current forecast={forecast}/> : null ||
                (tab === '2') ? <Forecast forecast={forecast}/> : null
                }
            </Paper>
    )
}

export default Weather;