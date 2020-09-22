const chai = require('chai')
const chaiHttp = require('chai-http')
const nock = require('nock')
const fs = require('fs')

chai.use(chaiHttp);

const { expect } = chai;

const { getAddress } = require('../../services/services');
const data = fs.readFileSync('test/test-data/map-geo-data.json','utf8')

describe('Map Service', () => {
    beforeEach(()=>{
        nock('http://www.mapquestapi.com/geocoding/v1/')
            .get(`/address?key=${process.env.MAPQUEST_KEY}&location=denver,co`)
            .reply(200, JSON.parse(data))
    })
    it('GET the correct field', async ()=> {
        const response = await getAddress('denver,co')

        expect(typeof response).to.eql('object')

        expect(Object.keys(response)).to.include('results')
        expect(Object.keys(response['results'][0])).to.include('locations')
        expect(Object.keys(response['results'][0]['locations'][0])).to.include('latLng')
        expect(Object.keys(response['results'][0]['locations'][0]['latLng'])).to.include('lat')
        expect(Object.keys(response['results'][0]['locations'][0]['latLng'])).to.include('lng')

        expect(Object.keys(response['results'][0]['locations'][0])).to.include('adminArea1')
        expect(Object.keys(response['results'][0]['locations'][0])).to.include('adminArea3')
        expect(Object.keys(response['results'][0]['locations'][0])).to.include('adminArea5')
    });
})
