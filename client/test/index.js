import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import { connect } from 'react-redux';
import { MenuItemsWidget } from '../app/bundles/POS/components/MenuItemsWidget';

function mapStateToProps(state) {
  return { menuItems: state.menuItems }
}

describe('suite', function () {
  it('expectation', function () {
    let MenuItems = connect(mapStateToProps)(MenuItemsWidget);
  });
});