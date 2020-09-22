const axios = require('axios')

const getImage = async (location)=>{
    const response = await  axios.get(`https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_KEY}&query=${location}&per_page=1&orientation=landscape`)
    return response.data
}

module.exports = {
    getImage
}