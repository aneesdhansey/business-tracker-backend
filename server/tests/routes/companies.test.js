const expect = require('expect');
const request = require('supertest');

const { app } = require('../../server');

const { Company } = require('../../models').company;

const { users, populateUsers, clearCompanies } = require('../seed/seed');

beforeEach(populateUsers);

describe('POST /companies', () => {
    
    before(clearCompanies);

    it('should create a new company', (done) => {
        const company = {
            "title": "Test Company",
            "shortname": "TC",
            "licenseno": "LC1234",
            "street": "Test Street",
            "city": "Test City",
            "state": "Test State",
            "country": "Test Country",
            "phone": "Test Phone",
            "fax": "Test Fax",
            "email": "testemail@gmail.com",
            "website": "www.test.com"
        };

        request(app)
            .post('/companies')
            .set('x-auth', users[0].tokens[0].token)
            .send(company)
            .expect(200)
            .expect((res) => {
                const { company } = res.body;
                expect(company).toMatchObject(company);
                expect(company._lastmodifiedat).toBeGreaterThan(0);
                expect(company._lastmodifiedby).toBe(users[0]._id.toHexString());
                expect(company._creator).toBe(users[0]._id.toHexString());
            })
            .end((err, res) => {
                if (err)
                    return done(err);

                done();
            });
    });
});