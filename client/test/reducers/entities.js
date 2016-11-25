import * as actions from '../../app/bundles/POS/actions/index';
import posApp from '../../app/bundles/POS/reducers/index';
import { defaultEntities } from '../../app/bundles/POS/reducers/entities'
import { initialState } from './index'

describe('Reducers: entities', function () {

  it('should return defaultEntities if no response from server', function () {
    let response = { entities: {}, result: [] };
    let newState = posApp(undefined, actions.getOrderGroups(response));
    expect(newState.entities).to.deep.equal(defaultEntities);
  });

  it('should handle GET_ORDER_GROUPS action', function () {
    let response = { entities: { orderGroups: { id: 1 } }, result: [] };
    let newState = posApp(undefined, actions.getOrderGroups(response));
    expect(newState.entities).to.deep.equal(response.entities);
  });

  it('should handle CREATE_ORDER_GROUP action', function () {
    let orderGroup = { id: 1 };
    let newState = posApp(undefined, actions.createOrderGroup(1, orderGroup));
    expect(newState.entities.orderGroups).to.deep.equal({ 1: orderGroup });
  });

  it('should handle UPDATE_MENU_ITEMS action', function () {
    let menuItem = { id: 1 };
    let newState = posApp(undefined, actions.updateMenuItems(menuItem));
    expect(newState.entities.menuItems).to.deep.equal({ 1: menuItem });

    let entities = { ...defaultEntities, menuItems: { 1: menuItem } }
    let prevState = { ...initialState, entities }
    newState = posApp(prevState, actions.updateMenuItems(menuItem));
    expect(newState.entities.menuItems).to.deep.equal({ 1: menuItem });
  });

  it('should handle UPDATE_USERS action', function () {
    let user = { id: 1 };
    let newState = posApp(undefined, actions.updateUsers(user));
    expect(newState.entities.users).to.deep.equal({ 1: user });

    let entities = { ...defaultEntities, users: { 1: user } }
    let prevState = { ...initialState, entities }
    newState = posApp(prevState, actions.updateMenuItems(user));
    expect(newState.entities.users).to.deep.equal({ 1: user });
  });

  it('should handle CREATE_ORDER_ITEM action', function () {
    let orderItem = { id: 1 };
    let newState = posApp(undefined, actions.createOrderItem(1, orderItem));
    expect(newState.entities.orderItems).to.deep.equal({ new1: orderItem });
  });

  it('should handle UPDATE_ORDER_ITEM action', function () {
    let orderItem = { id: 1 };
    let newState = posApp(undefined, actions.updateOrderItem(orderItem));
    expect(newState.entities.orderItems).to.deep.equal({ [orderItem.id]: orderItem });
  });

  it('should handle UPDATE_ORDER_GROUPS action', function () {
    let orderItem = { id: 1 };
    let orderGroups = { 1: { orders: [0] } };
    let entities = { ...defaultEntities, orderGroups }
    let prevState = { ...initialState, entities }
    let newState = posApp(prevState, actions.updateOrderGroups(1, orderItem));
    expect(newState.entities.orderGroups[1].orders).to.deep.equal([0, 1]);
  });

  it('should handle REMOVE_ORDER_ITEM action', function () {
    let orderItem = { id: 1 };
    let orderGroups = { 1: { orders: [0, 1] } };
    let entities = { ...defaultEntities, orderGroups }
    let prevState = { ...initialState, entities }
    let newState = posApp(prevState, actions.removeOrderItem(orderItem, 1));
    expect(newState.entities.orderGroups[1].orders).to.deep.equal([0]);
  });

});