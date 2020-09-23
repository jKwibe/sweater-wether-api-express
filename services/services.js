const axios = require('axios')
const dotenv = require('dotenv');

dotenv.config({path: './config.env'});

const getImage = async (location)=>{
    const response = await  axios.get('https://api.unsplash.com/search/photos', {
        params:{
            client_id: `${process.env.UNSPLASH_KEY}`,
            query: location,
            per_page: 1,
            orientation: 'landscape'
        }
    })
    return response.data
}

const getAddress = async (location)=>{
    const response = await axios.get('http://www.mapquestapi.com/geocoding/v1/address', {
        params:{
            key: `${process.env.MAPQUEST_KEY}`,
            location: location
        }
    })
    return response.data
}

const getWeather = async (latitude, longitude) => {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/onecall', {
        params:{
            appid: `${process.env.WEATHER_KEY}`,
            lat: latitude,
            lon: longitude
        }
    })
    return response.data
}


module.exports = {
    getImage,
    getAddress,
    getWeather
}