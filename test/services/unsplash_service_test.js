const chai = require('chai')
const chaiHttp = require('chai-http')
const nock = require('nock')
const fs = require('fs')

chai.use(chaiHttp);

const { expect } = chai;

const { getImage } = require('../../services/services');

const data = fs.readFileSync('test/test-data/unsplash_data.json','utf8')

describe('GET /', () => {
    beforeEach(()=>{
        nock('https://api.unsplash.com/')
            .get(`/search/photos?client_id=${process.env.UNSPLASH_KEY}&query=denver,co&per_page=1&orientation=landscape`)
            .reply(200, JSON.parse(data))
    });
    it('GET the correct fields ',  async () =>{
        const response = await getImage('denver,co')

        expect(typeof response).to.eql('object')
        expect(typeof response['results']).to.eql('object')
        expect(typeof response['results'][0]).to.eql('object')
        expect(Object.keys(response['results'][0])).to.include('urls')
        expect(Object.keys(response['results'][0]['urls'])).to.include('raw')

        expect(Object.keys(response['results'][0])).to.include('user')
        expect(Object.keys(response['results'][0]['user'])).to.include('name')
    });
})