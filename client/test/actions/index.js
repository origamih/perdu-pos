import * as actions from '../../app/bundles/POS/actions/index';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { expect } from 'chai';
import fetchMock from 'fetch-mock';

const mockStore = configureMockStore([ thunk ]);
const url = 'http://localhost';

describe('async actions', function () {
  afterEach(function () {
    fetchMock.restore();
  });

  it('should create GET_TABLES when fetching tables is done', function () {
    let tables = { id: 1, name: 'B1' };
    let expectedAction = { type: actions.ActionTypes.GET_TABLES, tables: tables };
    let store = mockStore({});
    fetchMock.get(url + '/tables.json', tables);
    return store.dispatch(actions.fetchTables(url))
    .then(() => {
      const action = store.getActions()[0];
      expect(action).to.deep.equal(expectedAction); 
    });
  });
});