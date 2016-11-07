import * as actions from '../../app/bundles/POS/actions/index';
import posApp from '../../app/bundles/POS/reducers/index';

let initialState = {};
describe('Reducers', function () {

  beforeEach(function () {
    initialState = {
      menuCategories: [],
      menuItems: [],
      tables: []
    }
  });

  it('should return the default state when the action is unknown', function () {
    let action = { type: 'unknown' };
    let newState = posApp(undefined, action);
    expect(newState).to.deep.equal(initialState);
  });

  it('should handle tables reducer', function () {
    let tables = 'foo';
    let newState = posApp(undefined, actions.getTables(tables));
    expect(newState.tables).to.equal(tables);
    Object.assign(initialState, { tables: tables });
    expect(newState).to.deep.equal(initialState);
  });

  it('should handle menuCategories reducer', function () {
    let menuCategories = 'foo';
    let newState = posApp(undefined, actions.getMenuCategories(menuCategories));
    expect(newState.menuCategories).to.equal(menuCategories);
  });
});