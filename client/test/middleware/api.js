import sinon from 'sinon';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { ActionTypes } from '../../app/bundles/POS/actions/index';
import * as api from '../../app/bundles/POS/middleware/api'
import { normalize, Schema, arrayOf } from 'normalizr';
 
const url = 'http://localhost';
const fixtureObject = { id: 1, name: 'name' };
const mockStore = configureMockStore([ thunk ]);
 
describe('api:', function () {
  describe('fetchTables', function () {
    let dispatch;
    let getTables = { type: ActionTypes.GET_TABLES, tables: fixtureObject };
 
    beforeEach(function () {
      dispatch = sinon.stub();
      nock(url).get('/tables.json').reply(200, fixtureObject);
    });
    afterEach(function () {
      nock.cleanAll();
    });
 
    it('should return a promise', function () {
      let promise = api.fetchTables(url)(dispatch);
      expect(promise).to.be.an.instanceof(Promise);
    });
 
    it('dispatch getTables action when success', function (done) {
      api.fetchTables(url)(dispatch).then(() => {
        expect(dispatch.calledWith(getTables)).to.be.true;
        done();
      });
    });
 
    it('should create GET_TABLES when fetching tables is done', function () {
      const store = mockStore({});
      return store.dispatch(api.fetchTables(url))
      .then(() => {
        const action = store.getActions()[0];
        expect(action).to.deep.equal(getTables); 
      });
    });
  });
 
  describe('fetchMenuCategories', function () {
    let dispatch;
    let getMenuCategories = { type: ActionTypes.GET_MENU_CATEGORIES, menuCategories: fixtureObject };
 
    beforeEach(function () {
      dispatch = sinon.stub();
      nock(url).get('/menu_categories.json').reply(200, fixtureObject);
    });
    afterEach(function () {
      nock.cleanAll();
    });
 
    it('should return a promise', function () {
      let promise = api.fetchMenuCategories(url)(dispatch);
      expect(promise).to.be.an.instanceof(Promise);
    });
     
    it('dispatch getMenuCategories action when success', function (done) {
      api.fetchMenuCategories(url)(dispatch).then(() => {
        expect(dispatch.calledWith(getMenuCategories)).to.be.true;
        done();
      });
    });
 
    it('should create GET_MENU_CATEGORIES when fetching is done', function () {
      const store = mockStore({});
      return store.dispatch(api.fetchMenuCategories(url))
      .then(() => {
        expect(store.getActions()[0]).to.deep.equal(getMenuCategories);
      })
    });
  });
 
  describe('fetchMenuItems', function () {
    let dispatch;
    let getMenuItems = { type: ActionTypes.GET_MENU_ITEMS, menuItems: fixtureObject };
 
    beforeEach(function () {
      dispatch = sinon.stub();
      nock(url)
      .post('/menu_items/show_by_category', { menu_item: { menu_category_id: 1 } })
      .reply(200, fixtureObject);
    });
    afterEach(function () {
      nock.cleanAll();
    });
 
    it('should return a promise', function () {
      let promise = api.fetchMenuItems(1, url)(dispatch);
      expect(promise).to.be.an.instanceof(Promise);
    });
     
    it('dispatch getMenuItems action when success', function (done) {
      api.fetchMenuItems(1, url)(dispatch).then(() => {
        expect(dispatch.calledWith(getMenuItems)).to.be.true;
        done();
      });
    });
 
    it('should create GET_MENU_ITEMS when fetching is done', function () {
      const store = mockStore({});
      return store.dispatch(api.fetchMenuItems(1, url))
      .then(() => {
        expect(store.getActions()[0]).to.deep.equal(getMenuItems);
      })
    });
  });
 
  describe('fetchOpenedTicket', function () {
    let dispatch;
    let getOpenedTicket = { type: ActionTypes.GET_OPENED_TICKET, ticket: fixtureObject };
 
    beforeEach(function () {
      dispatch = sinon.stub();
      nock(url)
      .post('/tickets/show_by_params', { ticket: { table_id: null, customer_id: null, is_open: true } })
      .reply(200, fixtureObject);
    });
 
    afterEach(function () {
      nock.cleanAll();
    });
 
    it('should return a promise', function () {
      let promise = api.fetchOpenedTicket(null, null, url)(dispatch);
      expect(promise).to.be.an.instanceof(Promise);
    });
     
    it('dispatch getOpenedTicket action when success', function () {
      return api.fetchOpenedTicket(null, null, url)(dispatch).then(() => {
        expect(dispatch.calledWith(getOpenedTicket)).to.be.true;
      });
    });
 
    it('should create GET_OPENED_TICKET when fetching is done', function () {
      const store = mockStore({});
      return store.dispatch(api.fetchOpenedTicket(null, null, url))
      .then(() => {
        expect(store.getActions()[1]).to.deep.equal(getOpenedTicket);
      })
    });
  });
 
  describe('fetchOrderGroups', function () {
    let dispatch;
    const normalized = normalize(fixtureObject, arrayOf(api.orderGroupSchema));
    let getOrderGroups = { type: ActionTypes.GET_ORDER_GROUPS, response: normalized };
 
    beforeEach(function () {
      dispatch = sinon.stub();
      nock(url)
      .post('/order_groups/show_by_params', { order_group: { ticket_id: null } })
      .reply(200, fixtureObject);
    });
 
    afterEach(function () {
      nock.cleanAll();
    });
 
    it('should return a promise', function () {
      let promise = api.fetchOrderGroups(null, url)(dispatch);
      expect(promise).to.be.an.instanceof(Promise);
    });
     
    it('dispatch getOrderGroups action when success', function () {
      return api.fetchOrderGroups(null, url)(dispatch).then(() => {
        expect(dispatch.calledWith(getOrderGroups)).to.be.true;
      });
    });
 
    it('should create GET_ORDER_GROUPS when fetching is done', function () {
      const store = mockStore({});
      return store.dispatch(api.fetchOrderGroups(null, url))
      .then(() => {
        expect(store.getActions()[0]).to.deep.equal(getOrderGroups);
      })
    });
  });

  describe('fetchCreateOrderGroup', function () {
    it('should return a promise', function () {
      nock(url)
      .post('/order_groups.json', { order_group: fixtureObject })
      .reply(200, fixtureObject);
      let promise = api.fetchCreateOrderGroup(fixtureObject, url);
      expect(promise).to.be.an.instanceof(Promise);
    });
  });

  describe('fetchCreateOrderItem', function () {
    it('should return a promise', function () {
      nock(url)
      .post('/orders.json', { order: fixtureObject })
      .reply(200, fixtureObject);
      let promise = api.fetchCreateOrderItem(fixtureObject, url);
      expect(promise).to.be.an.instanceof(Promise);
    });
  });

  describe('createTicket', function () {
    it('should return a promise', function () {
      nock(url)
      .post('/tickets.json', { ticket: fixtureObject })
      .reply(200, fixtureObject);
      let promise = api.createTicket(fixtureObject, url);
      expect(promise).to.be.an.instanceof(Promise);
    });
  });

  describe('updateOrderItem', function () {
    let dispatch;
    let updateOrderItem = { type: ActionTypes.UPDATE_ORDER_ITEM, orderItem: fixtureObject };
    
    beforeEach(function () {
      dispatch = sinon.stub();
      nock(url)
      .put(`/orders/${fixtureObject.id}.json`, { order: fixtureObject })
      .reply(200, fixtureObject);
    });
    
    afterEach(function () {
      nock.cleanAll();
    });
    
    it('should return a promise', function () {
      let promise = api.updateOrderItem(fixtureObject, url)(dispatch);
      expect(promise).to.be.an.instanceof(Promise);
    });
     
    it('dispatch updateOrderItem action when success', function () {
      return api.updateOrderItem(fixtureObject, url)(dispatch).then(() => {
        expect(dispatch.calledWith(updateOrderItem)).to.be.true;
      });
    });
    
    it('should create UPDATE_ORDER_ITEM when fetching is done', function () {
      const store = mockStore({});
      return store.dispatch(api.updateOrderItem(fixtureObject, url))
      .then(() => {
        expect(store.getActions()[0]).to.deep.equal(updateOrderItem);
      })
    });
  });
});

