const assert = require('assert');
const mongoose = require('mongoose');
const app = require('../../app');
const request = require('supertest');
const Line = mongoose.model('lines');

describe('Lines Controller', () => {
    it('Post to /api/lines creates a new line', (done) => {
        Line.count().then(count => {
            request(app)
                .post('/api/lines')
                .send({name:'LineName', description:'Some description'})
                .end( (err,response) => {
                    Line.count().then(newCount => {
                        assert(count + 1 == newCount );
                        done();
                    });
                });
        });
    }).timeout(5000);
});