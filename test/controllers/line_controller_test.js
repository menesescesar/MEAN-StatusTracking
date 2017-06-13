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

    it('Put to /api/lines edit a line', (done) => {
        const newline = new Line({name:'LineName',description:'Some description'});
        newline.save().then(() =>{
            const lineId = newline._id;

            request(app)
            .put('/api/lines/'+lineId)
            .send({description:'New description'})
            .end( (err,response) => {
                Line.findById({ _id:lineId }).then(updatedLine => {
                    assert(updatedLine.description == 'New description' );
                    done();
                });
            });
        });
    }).timeout(5000);

    it('Delete to /api/lines delete a line', (done) => {
        Line.count().then(count => {
            var newline = new Line({name:'LineName',description:'Some description'});

            request(app)
            .delete('/api/lines/'+newline._id)
            .end( (err,response) => {

                Line.count().then(newCount => {
                    assert(count == newCount );
                    done();
                });
            });
        });
    }).timeout(5000);

});