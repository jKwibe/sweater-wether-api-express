const axios = require('axios')

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


module.exports = {
    getImage,
    getAddress
}