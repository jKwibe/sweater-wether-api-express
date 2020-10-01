const chai = require('chai')
const fs = require('fs')

const { expect } = chai

const ForecastData = require('../../utils/forecastData')

const data = fs.readFileSync('test/test-data/weather-data.json')

const forecast = new ForecastData(JSON.parse( data ))

describe('Form Data', ()=>{
    it('#hourlyInfo ', function (done) {
        let info = forecast.hourlyInfo()
        expect(info).to.be.a('array')
        expect(Object.keys(info[0])).to.include('temp')
        expect(Object.keys(info[0])).to.include('time')

        expect(info[0].temp).not.null
        expect(info[0].time).not.null

        expect(info[0].temp).to.be.a('number')
        expect(info[0].time).to.be.a('number')
        done();
    });

    it('#current', function (done) {
        let info = forecast.currentIfo();

        expect(info).to.be.a('object')
        expect(Object.keys(info)).to.include('time')
        expect(Object.keys(info)).to.include('temp')
        expect(Object.keys(info)).to.include('uvi')
        expect(Object.keys(info)).to.include('humidity')

        expect(info.temp).not.null
        done();
    });

    it('#daily', function (done) {
        let info = forecast.dailyInfo();

        expect(info).to.be.a('array')
        expect(info[0]).to.be.a('object')

        expect(info[0]['time']).to.be.a('number')
        expect(info[0]['temp_high']).to.be.a('number')
        expect(info[0]['temp_low']).to.be.a('number')
        expect(info[0]['rain']).to.be.a('number')
        expect(info[0]['description']).to.be.a('string')

        expect(info[0]['time']).not.null
        expect(info[0]['temp_high']).not.null
        expect(info[0]['temp_low']).not.null
        expect(info[0]['rain']).not.null
        expect(info[0]['description']).not.null

        expect(info.temp).not.null
        done();
    });

    it('#attributes', function (done) {
        let info = forecast.attributes();

        expect(info).to.be.a('object')
        expect(Object.keys(info)).to.include('current')
        expect(Object.keys(info)).to.include('hourly')
        expect(Object.keys(info)).to.include('daily')

        expect(info['current']).to.be.a('object')
        expect(info['hourly']).to.be.a('array')
        expect(info['daily']).to.be.a('array')

        done();
    });
})