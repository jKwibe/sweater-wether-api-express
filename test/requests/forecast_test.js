const fs = require('fs')
const chai = require('chai')
const chaiHttp = require('chai-http')
const nock = require('nock')

chai.use(chaiHttp)

const { expect } = chai

const app = require('../../app')

const fileData = fs.readFileSync('test/test-data/weather-data.json','utf8')
const mapData = fs.readFileSync('test/test-data/map-geo-data.json','utf8')

describe('GET FORECAST', ()=>{
    beforeEach(()=>{
        nock('https://api.openweathermap.org/data/2.5/')
            .get(`/onecall?appid=${process.env.WEATHER_KEY}&lat=39.738453&lon=-104.984853`)
            .reply(200, JSON.parse(fileData))

        nock('http://www.mapquestapi.com/geocoding/v1/')
            .get(`/address?key=${process.env.MAPQUEST_KEY}&location=denver,co`)
            .reply(200, JSON.parse(mapData))
    });
    it('should return forecast data', function (done) {
        chai
            .request(app)
            .get('/api/v1/forecast')
            .query({ location: 'denver,co'})
            .end((err, res)=>{
                let data = res.body
                expect(res.status).to.eql(200)
                expect(Object.keys(data)).to.include('id')
                expect(Object.keys(data)).to.include('type')
                expect(Object.keys(data)).to.include('attributes')

                expect(Object.keys(data)).to.include('attributes')
                expect(Object.keys(data)).to.include('attributes')
                expect(Object.keys(data)).to.include('attributes')
                done();
            })
    });
})

describe('GET Forecast with Coordinates', ()=>{
    const lat = '39.738453'
    const lon = '-104.984853'
    beforeEach(()=>{
        nock('https://api.openweathermap.org/data/2.5/')
            .get(`/onecall?appid=${process.env.WEATHER_KEY}&lat=${lat}&lon=${lon}`)
            .reply(200, JSON.parse(fileData))
    });

    it('should return forecast data using coordinates', function (done) {
        chai
            .request(app)
            .get('/api/v1/forecast')
            .query({ latitude: lat, longitude: lon })
            .end((err, response)=>{
                let info = response.body
                expect(response.status).to.eql(200)
                expect(Object.keys(info)).to.include('id')
                expect(Object.keys(info)).to.include('type')
                expect(Object.keys(info)).to.include('attributes')

                expect(Object.keys(info)).to.include('attributes')
                expect(Object.keys(info)).to.include('attributes')
                expect(Object.keys(info)).to.include('attributes')
                done();
            })
    });
})