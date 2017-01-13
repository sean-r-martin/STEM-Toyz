const request = require('supertest-as-promised')
const {expect} = require('chai')
const db = require('APP/db')
const Order = require('APP/db/models/order')
const Item = require('APP/db/models/item')
const User = require('APP/db/models/user')
const app = require('./start')


describe.only('api/orders', () => {
  let userId;
  const alice = {
  username: 'alice@home.org',
  password: '123124124'
  }

   const testOrders = () => db.Promise.map([
    { status: 'in cart', user_id: userId},
    { status: 'ordered', user_id: userId},
    { status: 'shipped', user_id: userId}
  ], order => {
    db.model('orders').create(order);
  })

  const testItems = () => db.Promise.map([
    { quantity: 45, price: 170, order_id: 1},
    { quantity: 14, price: 210, order_id: 1},
    { quantity: 34, price: 105, order_id: 2},
    { quantity: 19, price: 310, order_id: 2},
    { quantity: 47, price: 140, order_id: 3},
    { quantity: 93, price: 101, order_id: 3}
  ], item => db.model('items').create(item));

  before('create a user', () =>
      db.sync({force:true})
      .then(() =>
        User.create({
          firstName: 'Reico',
          lastName: 'Lee',
          phoneNumber: '555.555.5555',
          email: alice.username,
          password: alice.password
        })
        .then(user => {
          userId = user.id
          return testOrders();
        })
      )
      .then(() => testItems
      )
    )

  describe('Authenticated Users', () => {
    const agent = request.agent(app)
      before('log in', () => agent
        .post('/api/auth/local/login')
        .send(alice))

    it('POST can create an order', () =>
       agent
       .post(`/api/orders/1`)
       .expect(201)
       .expect(function(res) {
          expect(res.body.status).to.equal('in cart');
          expect(res.body.price).to.equal(0);
          expect(res.body.user_id).to.equal(6);
       })
    )

    it('GET view past orders', () =>
       agent
        .get(`/api/orders/${userId}`)
        .expect(200)
        .expect(function(res) {
          expect(res.body.length).to.equal(4);
        })
    )

    it('DELETE can cancel an order', () => {
     return agent
        .delete(`/api/orders/9`)
        .expect(function(){
          User.findAll({
            where: {
              user_id: 5
            }
          })
          .then(function(orders){
            expect(orders.length).to.equal(2);
          })
        })
        // })
    })
  // describe('Admin Users', () => {

  })

})
