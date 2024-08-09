import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js';  // Ajusta la ruta según sea necesario

const { expect } = chai;
chai.use(chaiHttp);

describe('API Tests', () => {
  it('should get all products', (done) => {
    chai.request(app)
      .get('/products')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should get a product by ID', (done) => {
    chai.request(app)
      .get('/products/1')  // Ajusta el ID según tu base de datos
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        done();
      });
  });
});
