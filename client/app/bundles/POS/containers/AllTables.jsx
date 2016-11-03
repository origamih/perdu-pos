import { connect } from 'react-redux';
import AllTablesWidget from '../components/AllTablesWidget';
import { fetchTables } from '../actions/index'

const mapStateToProps = (state) => {
  return { tables: state.tables }
}

const mapDispatchToProps = (dispatch) => {
  return { getTables: dispatch(fetchTables()) }
}

const AllTables = connect(mapStateToProps, mapDispatchToProps)(AllTablesWidget);
export default AllTables;