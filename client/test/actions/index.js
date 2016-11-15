import * as actions from '../../app/bundles/POS/actions/index';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

const mockStore = configureMockStore([ thunk ]);
const url = 'http://localhost';
const fixtureObject = { id: 1, name: 'name' };

describe('async actions', function () {
  afterEach(function () {
    nock.cleanAll();
  });

  it('should create GET_TABLES when fetching tables is done', function () {
    let expectedAction = { type: actions.ActionTypes.GET_TABLES, tables: fixtureObject };
    const store = mockStore({});
    nock(url).get('/tables.json').reply(200, fixtureObject);
    return store.dispatch(actions.fetchTables(url))
    .then(() => {
      const action = store.getActions()[0];
      expect(action).to.deep.equal(expectedAction); 
    });
  });

  it('should create GET_MENU_CATEGORIES when fetching is done', function () {
    let expectedAction = { type: actions.ActionTypes.GET_MENU_CATEGORIES, menuCategories: fixtureObject };
    const store = mockStore({});
    nock(url).get('/menu_categories.json').reply(200, fixtureObject);
    return store.dispatch(actions.fetchMenuCategories(url))
    .then(() => {
      expect(store.getActions()[0]).to.deep.equal(expectedAction);
    })
  });

  it('should create GET_MENU_ITEMS when fetching is done', function () {
    let expectedAction = { type: actions.ActionTypes.GET_MENU_ITEMS, menuItems: fixtureObject };
    const store = mockStore({});
    nock(url).post('/menu_items/show_by_category', { menu_item: { menu_category_id: 1 } })
    .reply(200, fixtureObject);
    return store.dispatch(actions.fetchMenuItems(1, url))
    .then(() => {
      expect(store.getActions()[0]).to.deep.equal(expectedAction);
    })
  });

  it('should create GET_OPENED_TICKET when fetching is done', function () {
    let expectedAction = { type: actions.ActionTypes.GET_OPENED_TICKET, ticket: fixtureObject };
    const store = mockStore({});
    nock(url)
    .post('/tickets/show_by_params', { ticket: { table_id: null, customer_id: null, is_open: true } })
    .reply(200, fixtureObject);
    return store.dispatch(actions.fetchOpenedTicket(null, null, url))
    .then(() => {
      expect(store.getActions()[0]).to.deep.equal(expectedAction);
    })
  });

  it('should create GET_ORDER_GROUPS when fetching is done', function () {
    let expectedAction = { type: actions.ActionTypes.GET_ORDER_GROUPS, orderGroups: fixtureObject };
    const store = mockStore({});
    nock(url)
    .post('/order_groups/show_by_params', { order_group: { ticket_id: null, user_id: null } })
    .reply(200, fixtureObject);
    return store.dispatch(actions.fetchOrderGroups(null, null, url))
    .then(() => {
      expect(store.getActions()[0]).to.deep.equal(expectedAction);
    })
  });

  it('should create GET_ORDER_ITEMS when fetching is done', function () {
    let expectedAction = { type: actions.ActionTypes.GET_ORDER_ITEMS, orderItems: fixtureObject };
    const store = mockStore({});
    nock(url).post('/orders/show_by_params', { order: { order_groups_id: null } })
    .reply(200, fixtureObject);
    return store.dispatch(actions.fetchOrderItems(null, url))
    .then(() => {
      expect(store.getActions()[0]).to.deep.equal(expectedAction);
    })
  });
});