import * as actions from '../../app/bundles/POS/actions/index';
import posApp, { initialState } from '../../app/bundles/POS/reducers/index';

describe('Reducers', function () {

  it('should handle tables reducer', function () {
    let tables = 'foo';
    let newState = posApp(undefined, actions.getTables(tables));
    expect(newState.tables).to.equal(tables);
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

  describe('orderGroupIds', function () {
    it('should handle GET_ORDER_GROUPS action', function () {
      let response = { result: [], entities: {} }
      let newState = posApp(undefined, actions.getOrderGroups(response));
      expect(newState.orderGroupIds).to.equal(response.result);
    });

    it('should handle CREATE_ORDER_GROUP action', function () {
      let orderGroup = {};
      let newState = posApp(undefined, actions.createOrderGroup(1, orderGroup));
      expect(newState.orderGroupIds).to.deep.equal([1]);
    });

    it('should handle REMOVE_ORDER_GROUP action', function () {
      let orderGroup = { id: 1 };
      let prevState = { ...initialState, orderGroupIds: [1] }
      let newState = posApp(prevState, actions.removeOrderGroup(orderGroup));
      expect(newState.orderGroupIds).to.deep.equal([]);
    });
  });

  describe('nextOrderGroupId', function () {
    it('should handle GET_ORDER_GROUP action', function () {
      let response = { result: [], entities: {} }
      let newState = posApp(undefined, actions.getOrderGroups(response));
      expect(newState.nextOrderGroupId).to.deep.equal(0);

      response = { result: [5], entities: {} }
      newState = posApp(undefined, actions.getOrderGroups(response));
      expect(newState.nextOrderGroupId).to.deep.equal(6);
    });

    it('should handle REMOVE_ORDER_GROUP action', function () {
      let orderGroup = { id: 1 };
      let newState = posApp(undefined, actions.removeOrderGroup(orderGroup));
      expect(newState.nextOrderGroupId).to.deep.equal(1);

      let prevState = { ...initialState, nextOrderGroupId: 5 };
      newState = posApp(prevState, actions.removeOrderGroup(orderGroup));
      expect(newState.nextOrderGroupId).to.deep.equal(6);
    });
  });

  describe('nextOrderItemId', function () {
    it('should handle CREATE_ORDER_ITEM action', function () {
      let orderItem = {}
      let newState = posApp(undefined, actions.createOrderItem(orderItem));
      expect(newState.nextOrderItemId).to.equal(1);

      let prevState = { ...initialState, nextOrderItemId: 5 };
      newState = posApp(prevState, actions.createOrderItem(orderItem));
      expect(newState.nextOrderItemId).to.equal(6);
    });
  });

  describe('currentUser', function () {
    it('should handle GET_CURRENT_USER action', function () {
      let user = { id: 1 };
      let newState = posApp(undefined, actions.getCurrentUser(user));
      expect(newState.currentUser).to.deep.equal(user);
    });
  });

  describe('openedTicket', function () {
    it('should handle GET_OPENED_TICKET action', function () {
      let openedTicket = { id: 1 };
      let newState = posApp(undefined, actions.getOpenedTicket(openedTicket));
      expect(newState.openedTicket).to.deep.equal(openedTicket);
    });
  });

  describe('utilityButtons', function () {
    it('should handle GET_UTILITY_BUTTONS action', function () {
      let utilityButtons = [ 'a' ];
      let newState = posApp(undefined, actions.getUtilityButtons(utilityButtons));
      expect(newState.utilityButtons).to.deep.equal(utilityButtons);
    });
  });

  describe('clickedOrders', function () {
    it('should handle ORDER_ITEM_CLICK action', function () {
      const state = posApp(undefined, { type: 'unknown' });
      let clickedOrders = { id: 1 };
      let newState = posApp(undefined, actions.orderItemClick(clickedOrders));
      expect(newState.clickedOrders).to.deep.equal([clickedOrders]);

      let nextState = posApp(newState, actions.orderItemClick(clickedOrders));
      expect(nextState).to.deep.equal(state);
    });
  });

  describe('clickedTickets', function () {
    it('should handle TICKET_CLICK action', function () {
      const state = posApp(undefined, { type: 'unknown' });
      let clickedTickets = { id: 1 };
      let newState = posApp(undefined, actions.ticketClick(clickedTickets));
      expect(newState.clickedTickets).to.deep.equal([clickedTickets]);

      let nextState = posApp(newState, actions.ticketClick(clickedTickets));
      expect(nextState).to.deep.equal(state);
    });
  });
});