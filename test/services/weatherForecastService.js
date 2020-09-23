const chai = require('chai')
const nock = require('nock')
const fs = require('fs')
const dotenv = require('dotenv');

dotenv.config({path: './config.env'});

const { expect } = chai;

const { getWeather } = require('../../services/services');

const data = fs.readFileSync('test/test-data/weather-data.json','utf8')

describe('GET/ ', () => {
    beforeEach(()=>{
        nock('https://api.openweathermap.org/data/2.5/')
            .get(`/onecall?appid=${process.env.WEATHER_KEY}&lat=39.738453&lon=-104.984853`)
            .reply(200, JSON.parse(data))
    });
    it('GET the correct fields ',  async () =>{
        const response = await getWeather('39.738453', '-104.984853')

        expect(typeof response).to.eql('object')
        expect(Object.keys(response)).to.include('current')
        expect(Object.keys(response['current'])).to.include('dt')
        expect(Object.keys(response['current'])).to.include('sunrise')
        expect(Object.keys(response['current'])).to.include('sunset')
        expect(Object.keys(response['current'])).to.include('temp')
        expect(Object.keys(response['current'])).to.include('feels_like')
        expect(Object.keys(response['current'])).to.include('humidity')
        expect(Object.keys(response['current'])).to.include('uvi')
        expect(Object.keys(response['current'])).to.include('visibility')
        expect(Object.keys(response['current'])).to.include('weather')
        expect(Object.keys(response['current']['weather'][0])).to.include('main')
        expect(Object.keys(response['current']['weather'][0])).to.include('icon')
        expect(Object.keys(response['current']['weather'][0])).to.include('description')

        expect(Object.keys(response)).to.include('hourly')
        expect(Object.keys(response['hourly'][0])).to.include('dt')
        expect(Object.keys(response['hourly'][0])).to.include('temp')
        expect(Object.keys(response['hourly'][0])).to.include('weather')

        expect(Object.keys(response)).to.include('daily')
        expect(Object.keys(response['daily'][0])).to.include('dt')
        expect(Object.keys(response['daily'][0])).to.include('rain')
        expect(Object.keys(response['daily'][0])).to.include('temp')
        expect(Object.keys(response['daily'][0]['temp'])).to.include('min')
        expect(Object.keys(response['daily'][0]['temp'])).to.include('max')
    });
})