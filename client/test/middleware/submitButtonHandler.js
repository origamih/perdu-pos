import thunk from 'redux-thunk';
import { submitButtonClick } from '../../app/bundles/POS/middleware/submitButtonClick'
import posApp, { initialState } from '../../app/bundles/POS/reducers/index';
import { createStore, applyMiddleware } from 'redux';


const fixtureObject = { id: 1, name: 'name' };
let store = {}

describe('submitButtonClick', function () {
  describe("when there's new Order", function () {
    describe("when there's no Ticket", function () {
      it('creates new Ticket', function () {
        
      });
      it('creates new OrderGroup', function () {
        
      });
      it('creates new OrderItem(s)', function () {
        
      });
      it('redirects to All Table page', function () {
        
      });
    });
    describe("when the Ticket has already created", function () {
      
    });
  });
  describe("when there's no new Order", function () {
    it('redirects to All Table page', function () {
      
    });
  });
});