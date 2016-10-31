describe('Order', function () {
  // before(function () {

  // });
  it('should have table_id state', function () {
    var table_id = { table_id: 4 };
    var route = { path: "/all_tables/:table_id" } ;
    var wrapper = mount(<Order params={table_id} route={route} />);
    setTimeout(() => {
      expect(wrapper.state('table_id')).to.equal(4);
      done();
    }, 500);
  });
});