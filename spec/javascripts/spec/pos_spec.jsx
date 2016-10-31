describe('React Router', function () {
  it('should render Router, AllTables, CustomerSearch, CustomerTickets', function (done) {
    var wrapper = mount(<POSHome/>)
    setTimeout( () => {
      expect(wrapper.find(Router)).to.exist;
      expect(wrapper.find(AllTables)).to.exist;
      expect(wrapper.find(CustomerSearch)).to.exist;
      expect(wrapper.find(CustomerTickets)).to.exist;
      done();
    }, 500);
  });
});

describe('All Tables',function() {
  it('should have table state: array of three',function(done) {
    // this.timeout(1501);
    sinon.spy(AllTables.prototype, 'componentDidMount');
    var wrapper = mount(<AllTables/>);
    setTimeout( () => {
      expect(AllTables.prototype.componentDidMount.calledOnce).to.be.true;
      expect(wrapper.state('tables')).to.be.an.instanceof(Array);
      expect(wrapper.state('tables').length).to.eq(3);
      done();
    }, 500);
  });
});

describe('Order Container', function () {
  it('should render Order', function () {
    var wrapper = shallow(<OrderContainer/>);
    expect(wrapper.type()).to.equal(Order);
  });
});

