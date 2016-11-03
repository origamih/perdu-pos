export const ActionTypes = {
  GET_TABLES: 'GET_TABLES'
}

// Action Creator (is an object)
function getTables(tables) {
  return { type: ActionTypes.GET_TABLES, tables: tables };
}

// Fetch data thunk
export const fetchTables = function() {
  return function (dispatch) {
    $.get(
      '/tables',
      function(data) {
        dispatch(getTables(data));
      },
      'JSON'
    );
  }
}