import thunk from 'redux-thunk';
import * as buttonClickHandlers from '../../app/bundles/POS/middleware/buttonClickHandlers'
import posApp, { initialState } from '../../app/bundles/POS/reducers/index';
import { createStore, applyMiddleware } from 'redux';


const fixtureObject = { id: 1, name: 'name' };
let store = {}

describe('buttonClickHandlers:', function () {

  describe('menuItemClick:', function () {
    it('should check the Menu Item entities list and update if needed', function () {
      // init state with a Menu Item entity
      const menuItems = { 1: { id: 1, name: 'name' } }
      const entities = { ...initialState.entities, menuItems }
      const state = { ...initialState, entities }
      store = createStore(posApp, state, applyMiddleware(thunk));
      store.dispatch(buttonClickHandlers.menuItemClick(fixtureObject));
      expect(store.getState().entities.menuItems).to.deep.equal(menuItems);

      // now dispatch with a new Menu Item
      const newMenuItem = { id: 2, name: 'foo' }
      const newMenuItems = { ...menuItems, 2: newMenuItem }
      store.dispatch(buttonClickHandlers.menuItemClick(newMenuItem));
      expect(store.getState().entities.menuItems).to.deep.equal(newMenuItems);
    });

    describe("when there's no new Order", function () {
      beforeEach(function () {
        store = createStore(posApp, initialState, applyMiddleware(thunk));
        store.dispatch(buttonClickHandlers.menuItemClick(fixtureObject));
      });
      // default state has nothing in it
      it('should create Order Group', function () {
        expect(store.getState().orderGroupIds).to.have.lengthOf(1);
        const orderGroupId = store.getState().nextOrderGroupId;
        expect(store.getState().entities.orderGroups[orderGroupId]).not.to.be.undefined;
      });
      it('should create Order Item', function () {
        const orderItemId = store.getState().nextOrderItemId - 1;
        expect(store.getState().entities.orderItems[`new${orderItemId}`]).not.to.be.undefined;
      });
      it('should check User entities list and update if needed', function () {
        // init state with a user entity and currentUser
        const users = { 1: { id: 1, name: 'name' } }
        const entities = { ...initialState.entities, users }
        const currentUser = { id: 1, name: 'name' };
        const state = { ...initialState, entities, currentUser }

        store = createStore(posApp, state, applyMiddleware(thunk));
        store.dispatch(buttonClickHandlers.menuItemClick(fixtureObject));
        expect(store.getState().entities.users).to.deep.equal(users);

        // now change the currentUser and dispatch
        const newUser = { id: 2, name: 'foo' }
        const newUsers = { ...users, 2: newUser }
        const newState = { ...initialState, entities, currentUser: newUser }

        store = createStore(posApp, newState, applyMiddleware(thunk));
        store.dispatch(buttonClickHandlers.menuItemClick(fixtureObject));
        expect(store.getState().entities.users).to.deep.equal(newUsers);
      });
    });

    describe("when there's new Order Item", function () {
      it(`should check for current new Order list 
        and update the quantity for the existing one`, function () {
        
      });
      it('should create a new Order Item if this item is not in the new Order list', function () {
        
      });
    });
  });

});