import sinon from 'sinon';
import nock from 'nock';
import * as actions from '../../app/bundles/POS/actions/index';

const url = 'http://localhost';
const fixtureObject = { id: 1, name: 'name' };

describe('middleware:', function () {
  describe('fetchTables', function () {
    let dispatch;

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
      let getTables = { type: 'GET_TABLES', tables: fixtureObject }
      actions.fetchTables(url)(dispatch).then(() => {
        expect(dispatch.calledWith(getTables)).to.be.true;
        done();
      });
    });
  });

  describe('fetchMenuCategories', function () {
    let dispatch;

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
      let getMenuCategories = { type: 'GET_MENU_CATEGORIES', menuCategories: fixtureObject }
      actions.fetchMenuCategories(url)(dispatch).then(() => {
        expect(dispatch.calledWith(getMenuCategories)).to.be.true;
        done();
      });
    });
  });

  describe('fetchMenuItems', function () {
    let dispatch;
    let menuItems = { ...fixtureObject, menu_category_id: 1 };

    beforeEach(function () {
      dispatch = sinon.stub();
      nock(url)
      .post('/menu_items/show_by_category', { menu_item: { menu_category_id: 1 } })
      .reply(200, menuItems);
    });
    afterEach(function () {
      nock.cleanAll();
    });

    it('should return a promise', function () {
      let promise = actions.fetchMenuItems(1, url)(dispatch);
      expect(promise).to.be.an.instanceof(Promise);
    });
    
    it('dispatch getMenuItems action when success', function (done) {
      let getMenuItems = { type: 'GET_MENU_ITEMS', menuItems: menuItems };
      actions.fetchMenuItems(1, url)(dispatch).then(() => {
        expect(dispatch.calledWith(getMenuItems)).to.be.true;
        done();
      });
    });
  });

  describe('fetchOpenedTicket', function () {
    let dispatch;
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
      let getOpenedTicket = { type: 'GET_OPENED_TICKET', ticket: fixtureObject };
      return actions.fetchOpenedTicket(null, null, url)(dispatch).then(() => {
        expect(dispatch.calledWith(getOpenedTicket)).to.be.true;
      });
    });
  });

  describe('fetchOrderGroups', function () {
    let dispatch;
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
      let getOrderGroups = { type: 'GET_ORDER_GROUPS', orderGroups: fixtureObject };
      return actions.fetchOrderGroups(null, null, url)(dispatch).then(() => {
        expect(dispatch.calledWith(getOrderGroups)).to.be.true;
      });
    });
  });

  describe('fetchOrderItems', function () {
    let dispatch;
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
      let getOrderItems = { type: 'GET_ORDER_ITEMS', orderItems: fixtureObject };
      actions.fetchOrderItems('', url)(dispatch).then(() => {
        expect(dispatch.calledWith(getOrderItems)).to.be.true;
      });
    });
  });
});