import * as actions from '../../app/bundles/POS/actions/index';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { expect } from 'chai';
import nock from 'nock';

const mockStore = configureMockStore([ thunk ]);
const url = 'http://localhost';
const fixtureObject = { id: 1, name: 'name' };

describe('async actions', function () {
  afterEach(function () {
    nock.cleanAll();
  });

  it('should create GET_TABLES when fetching tables is done', function () {
    let tables = fixtureObject;
    let expectedAction = { type: actions.ActionTypes.GET_TABLES, tables: tables };
    const store = mockStore({});
    nock(url).get('/tables.json').reply(200, tables);
    return store.dispatch(actions.fetchTables(url))
    .then(() => {
      const action = store.getActions()[0];
      expect(action).to.deep.equal(expectedAction); 
    });
  });

  it('should create GET_MENU_CATEGORIES when fetching is done', function () {
    let menuCategories = fixtureObject;
    let expectedAction = { type: actions.ActionTypes.GET_MENU_CATEGORIES, menuCategories: menuCategories };
    const store = mockStore({});
    nock(url).get('/menu_categories.json').reply(200, menuCategories);
    return store.dispatch(actions.fetchMenuCategories(url))
    .then(() => {
      expect(store.getActions()[0]).to.deep.equal(expectedAction);
    })
  });

  it('should create GET_MENU_ITEMS when fetching is done', function () {
    let menuItems = { ...fixtureObject, menu_category_id: 1 };
    let expectedAction = { type: actions.ActionTypes.GET_MENU_ITEMS, menuItems: menuItems };
    const store = mockStore({});
    nock(url).post('/menu_items/show_by_category')
    .query({ menu_category_id: 1 }).reply(200, menuItems);
    return store.dispatch(actions.fetchMenuItems(1, url))
    .then(() => {
      expect(store.getActions()[0]).to.deep.equal(expectedAction);
    })
  });
});