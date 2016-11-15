import sinon from 'sinon';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../app/bundles/POS/actions/index';
 
const url = 'http://localhost';
const fixtureObject = { id: 1, name: 'name' };
const mockStore = configureMockStore([ thunk ]);
 
describe('async actions:', function () {
  describe('fetchTables', function () {
    let dispatch;
    let getTables = { type: actions.ActionTypes.GET_TABLES, tables: fixtureObject };
 
    beforeEach(function () {
      dispatch = sinon.stub();
      nock(url).get('/tables.json').reply(200, fixtureObject);
    });
    afterEach(function () {
      nock.cleanAll();
    });
 
    it('should return a promise', function () {
      let promise = actions.fetchTables(url)(dispatch);
      expect(promise).to.be.an.instanceof(Promise);
    });
 
    it('dispatch getTables action when success', function (done) {
      actions.fetchTables(url)(dispatch).then(() => {
        expect(dispatch.calledWith(getTables)).to.be.true;
        done();
      });
    });
 
    it('should create GET_TABLES when fetching tables is done', function () {
      const store = mockStore({});
      return store.dispatch(actions.fetchTables(url))
      .then(() => {
        const action = store.getActions()[0];
        expect(action).to.deep.equal(getTables); 
      });
    });
  });
 
  describe('fetchMenuCategories', function () {
    let dispatch;
    let getMenuCategories = { type: actions.ActionTypes.GET_MENU_CATEGORIES, menuCategories: fixtureObject };
 
    beforeEach(function () {
      dispatch = sinon.stub();
      nock(url).get('/menu_categories.json').reply(200, fixtureObject);
    });
    afterEach(function () {
      nock.cleanAll();
    });
 
    it('should return a promise', function () {
      let promise = actions.fetchMenuCategories(url)(dispatch);
      expect(promise).to.be.an.instanceof(Promise);
    });
     
    it('dispatch getMenuCategories action when success', function (done) {
      actions.fetchMenuCategories(url)(dispatch).then(() => {
        expect(dispatch.calledWith(getMenuCategories)).to.be.true;
        done();
      });
    });
 
    it('should create GET_MENU_CATEGORIES when fetching is done', function () {
      const store = mockStore({});
      return store.dispatch(actions.fetchMenuCategories(url))
      .then(() => {
        expect(store.getActions()[0]).to.deep.equal(getMenuCategories);
      })
    });
  });
 
  describe('fetchMenuItems', function () {
    let dispatch;
    let getMenuItems = { type: actions.ActionTypes.GET_MENU_ITEMS, menuItems: fixtureObject };
 
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
      let promise = actions.fetchMenuItems(1, url)(dispatch);
      expect(promise).to.be.an.instanceof(Promise);
    });
     
    it('dispatch getMenuItems action when success', function (done) {
      actions.fetchMenuItems(1, url)(dispatch).then(() => {
        expect(dispatch.calledWith(getMenuItems)).to.be.true;
        done();
      });
    });
 
    it('should create GET_MENU_ITEMS when fetching is done', function () {
      const store = mockStore({});
      return store.dispatch(actions.fetchMenuItems(1, url))
      .then(() => {
        expect(store.getActions()[0]).to.deep.equal(getMenuItems);
      })
    });
  });
 
  describe('fetchOpenedTicket', function () {
    let dispatch;
    let getOpenedTicket = { type: actions.ActionTypes.GET_OPENED_TICKET, ticket: fixtureObject };
 
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
      let promise = actions.fetchOpenedTicket(null, null, url)(dispatch);
      expect(promise).to.be.an.instanceof(Promise);
    });
     
    it('dispatch getOpenedTicket action when success', function () {
      return actions.fetchOpenedTicket(null, null, url)(dispatch).then(() => {
        expect(dispatch.calledWith(getOpenedTicket)).to.be.true;
      });
    });
 
    it('should create GET_OPENED_TICKET when fetching is done', function () {
      const store = mockStore({});
      return store.dispatch(actions.fetchOpenedTicket(null, null, url))
      .then(() => {
        expect(store.getActions()[0]).to.deep.equal(getOpenedTicket);
      })
    });
  });
 
  describe('fetchOrderGroups', function () {
    let dispatch;
    let getOrderGroups = { type: actions.ActionTypes.GET_ORDER_GROUPS, orderGroups: fixtureObject };
 
    beforeEach(function () {
      dispatch = sinon.stub();
      nock(url)
      .post('/order_groups/show_by_params', { order_group: { ticket_id: null, user_id: null } })
      .reply(200, fixtureObject);
    });
 
    afterEach(function () {
      nock.cleanAll();
    });
 
    it('should return a promise', function () {
      let promise = actions.fetchOrderGroups(null, null, url)(dispatch);
      expect(promise).to.be.an.instanceof(Promise);
    });
     
    it('dispatch getOrderGroups action when success', function () {
      return actions.fetchOrderGroups(null, null, url)(dispatch).then(() => {
        expect(dispatch.calledWith(getOrderGroups)).to.be.true;
      });
    });
 
    it('should create GET_ORDER_GROUPS when fetching is done', function () {
      const store = mockStore({});
      return store.dispatch(actions.fetchOrderGroups(null, null, url))
      .then(() => {
        expect(store.getActions()[0]).to.deep.equal(getOrderGroups);
      })
    });
  });
 
  describe('fetchOrderItems', function () {
    let dispatch;
    let getOrderItems = { type: actions.ActionTypes.GET_ORDER_ITEMS, orderItems: fixtureObject };
 
    beforeEach(function () {
      dispatch = sinon.stub();
      nock(url)
      .post('/orders/show_by_params', { order: { order_groups_id: null } })
      .reply(200, fixtureObject);
    });
 
    afterEach(function () {
      nock.cleanAll();
    });
 
    it('should return a promise', function () {
      let promise = actions.fetchOrderItems(null, url)(dispatch);
      expect(promise).to.be.an.instanceof(Promise);
    });
     
    it('dispatch getOrderItems action when success', function () {
      actions.fetchOrderItems('', url)(dispatch).then(() => {
        expect(dispatch.calledWith(getOrderItems)).to.be.true;
      });
    });
 
    it('should create GET_ORDER_ITEMS when fetching is done', function () {
      const store = mockStore({});
      return store.dispatch(actions.fetchOrderItems(null, url))
      .then(() => {
        expect(store.getActions()[0]).to.deep.equal(getOrderItems);
      })
    });
  });
});