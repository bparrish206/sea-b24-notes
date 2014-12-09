process.env.MONGO_URL = 'mongodb://localhost/notes_test';
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);

require('../../server');

var expect = chai.expect;

describe('basic notes crud', function() {
  var id;
  it('should be able to create a note', function(done) {
    chai.request('http://localhost:3000')
    .post('/api/notes')
    .send({noteBody: 'hello world'})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.noteBody).to.eql('hello world');
      expect(res.body).to.have.property('_id');
      id = res.body._id;
      done();
    });
  });

  it('should be able to get an index', function(done) {
    chai.request('http://localhost:3000/v1')
    .get('/api/notes')
    .end(function(err, res) {
      expect(err).to.eql(null);
      //expect(Array.isArray(res.body)).to.be.true;
      done();
    });
  });

  it('should be able to get a single note', function(done) {
    chai.request('http://localhost:3000')
    .get('/api/notes/' + id)
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.noteBody).to.eql('hello world');
      done();
    });
  });

  it('should be able to update a note', function(done) {
    chai.request('http://localhost:3000')
    .put('/api/notes/' + id)
    .send({noteBody: 'new note body'})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.noteBody).to.eql('new note body');
      done();
    });
  });

  it('should be able to destroy a note', function(done) {
    chai.request('http://localhost:3000')
    .delete('/api/notes/' + id)
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.msg).to.eql('success!');
      done();
    });
  });

it('note must be lowercase', function(done) {
  chai.request('http://localhost:3000')
  .post('/api/notes')
  .send({noteBody: 'Hello World'})
  .end(function(err, res) {
    expect(res.statusCode).to.eql(500);
    done();
  });
});

it('Do comments exsist', function(done) {
  chai.request('http://localhost:3000')
  .post('/api/notes')
  .send({comments: 'coding is cool'})
  .end(function(err, res) {
    expect(err).to.eql(null);
    expect(res.body.comments).eql();
    done();
  });
});

it('should not be able to create a user with a password that is too short', function (done) {
    chai.request('http://localhost:3000')
    .post('/api/users')
    .send({email: "test@examle.com", password: "I"})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.status).to.be.equal(500);
      done();
    });
  });

  it('should block invalid password', function(done){
    chai.request('http://localhost:3000')
    .post('/api/users')
    .send({email: "brent.example.com", password: "badhacker"})
    .end(function(err, res){
      expect(err).to.eql(null);
      expect(res.status).to.be.eql(500);
      done();
    });
  });
});
