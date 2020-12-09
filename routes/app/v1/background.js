const express = require('express');
const dotenv = require('dotenv');
const router = express.Router();

dotenv.config({
    path: '/config/config.env'
})

const {
    getImage,
    getAddress,
    getWeather
}  = require('../../../services/services')

const ImageData = require('../../../utils/image_data')
const ForecastData = require('../../../utils/forecastData')

router.get('/background',  async (req,res, next)=>{
    const location = req.query.location
    const data = await getImage(location)

    // Can return default image
    if (data === undefined) return res.status(500).json({message: 'Server error'})

    const imageInfo = new ImageData(data)

    res.status(200).json(imageInfo.parsedData)

})


router.get('/forecast', async  (req, res, next)=>{
    const { location, longitude, latitude } = req.query

    let lat, lon;

    if(location){
        const mapData = await getAddress(location)

        lat = mapData['results'][0]['locations'][0]['latLng']['lat']
        lon = mapData['results'][0]['locations'][0]['latLng']['lng']
    }else if(longitude && latitude){
        lat = latitude
        lon =  longitude
    } else {
        throw new Error('Enter correct parameters')
    }

    const weather = await getWeather(lat, lon)

    const weatherInfo = new ForecastData(weather)
    res.status(200).json(weatherInfo.forecastInfo)
})
module.exports = router;
