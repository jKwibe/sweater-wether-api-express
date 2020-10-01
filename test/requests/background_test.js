const fs = require('fs')
const chai = require('chai')
const chaiHttp = require('chai-http')
const nock = require('nock')

chai.use(chaiHttp)

const { expect } = chai

const app = require('../../app')

const data = fs.readFileSync('test/test-data/unsplash_data.json','utf8')

describe('GET background-image',()=>{
    it('should render the image data', function (done) {
        nock('https://api.unsplash.com/')
            .get(`/search/photos?client_id=${process.env.UNSPLASH_KEY}&query=denver,co&per_page=1&orientation=landscape`)
            .reply(200, JSON.parse(data))

        let location = 'denver,co'

        chai.request(app)
            .get(`/api/v1/background?location=${location}`)
            .end((err, res)=>{
                expect(res.status).to.eql(200)
                expect(Object.keys(res.body)).to.include('id')
                expect(Object.keys(res.body)).to.include('type')
                expect(Object.keys(res.body)).to.include('attributes')

                expect(Object.keys(res.body['attributes'])).to.include('creditTo');
                expect(typeof res.body['attributes']['creditTo']).to.be.a('string');
                expect(res.body['attributes']['creditTo']).not.null;

                expect(Object.keys(res.body['attributes'])).to.include('imageUrl');
                expect(typeof res.body['attributes']['imageUrl']).to.be.a('string');
                expect(typeof res.body['attributes']['imageUrl']).not.null;

                done();
            });
    });
})
