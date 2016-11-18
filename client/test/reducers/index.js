import * as actions from '../../app/bundles/POS/actions/index';
import posApp from '../../app/bundles/POS/reducers/index';

let initialState = {};
describe('Reducers', function () {

  beforeEach(function () {
    initialState = {
      menuCategories: [],
      menuItems: [],
      tables: [],
      orderGroups: [],
      currentUser: {},
      nextOrderGroupId: 0,
      openedTicket: {}
    }
  });

  it('should return the default state when the action is unknown', function () {
    let action = { type: 'unknown' };
    // undefined is the initial state pass to the reducer
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

  it('should handle menuItems reducer', function () {
    let menuItems = 'foo';
    let newState = posApp(undefined, actions.getMenuItems(menuItems));
    expect(newState.menuItems).to.equal(menuItems);
  });

  it('should handle orderGroups reducer', function () {
    let orderGroups = [{ id: 1 }];
    let state = [{ id: 1, orderItems: [], user: {} }];
    let newState = posApp(undefined, actions.getOrderGroups(orderGroups));
    expect(newState.orderGroups).to.deep.equal(state);

    let orderItems = [{ foo: 'foo' }];
    state = [{ id: 1, orderItems: orderItems, user: {} }];
    newState = posApp(newState, actions.getOrderItems(1, orderItems));
    expect(newState.orderGroups).to.deep.equal(state);

    let user = { name: 'foo' };
    state = [{ id: 1, orderItems: orderItems, user: user }];
    newState = posApp(newState, actions.getUser(1, user));
    expect(newState.orderGroups).to.deep.equal(state);
  });
});