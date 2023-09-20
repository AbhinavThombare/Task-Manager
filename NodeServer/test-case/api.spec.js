const chai = require('chai')
var chaihttp = require('chai-http')
// const subadminusers = fs.readFileSync('subadmin.json');
// var mySubAdmin = JSON.parse(subadminusers);

var server = require('../app')

var expect = chai.expect;
chai.use(chaihttp)

describe('---- API Check ----', () => {
    it('GET API check', function (done) {
        chai.request(server)
            .get('/api/allusers')
            .end((err, res) => {
                expect(res.status).to.be.equal(200)
                expect(res).to.be.json;
                expect(res).to.not.redirect;
                done()
            })
    })

    it('GET API with id check', function (done) {
        chai.request(server)
            .get('/api/getsubadmin/' + 2)
            .end((err, res) => {
                expect(res.status).to.be.equal(200)
                expect(res.body).to.be.a('object')
                expect(res.body).to.have.property('name')
                expect(res.body).to.have.property('email')
                expect(res.body).to.have.property('password')
                done()
        })
    })

    it('POST API check', function (done) {
        let data = {
            "name":"subadmin",
            "email":"sadmin@gmail.com",
            "password":"test123",
            "role":"subadmin"
        }
        chai.request(server)
            .post('/api/getsubadmin')
            .send(data)
            .end((err, res) => {
                expect(res.status).to.be.equal(200)
                expect(res.body).to.be.a('object')
                expect(res.body.data).to.have.property('name')
                expect(res.body.data).to.have.property('email')
                expect(res.body.data).to.have.property('password')
            })
            done()
    })

    

    it.skip('DELETE API Check',function (done) {
        chai.request(server)
        .delete('/api/getsubadmin/delete/'+ 11)
        .end((err,res) => {
            expect(res.status).to.be.equal(200)
            expect(res.body).to.be.a('object')
            expect(res.body.result).to.have.property('ok').equal(1)
            expect(res.body.result).to.have.property('n').equal(1)
            
        })
        done()
    })
})


