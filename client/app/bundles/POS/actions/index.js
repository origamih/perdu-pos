export const ActionTypes = {
  GET_TABLES: 'GET_TABLES',
  GET_MENU_CATEGORIES: 'GET_MENU_CATEGORIES',
  GET_MENU_ITEMS: 'GET_MENU_ITEMS'
}

// Action Creator 
function getTables(tables) {
  return { type: ActionTypes.GET_TABLES, tables: tables };
}

function getMenuCategories(menuCategories) {
  return { type: ActionTypes.GET_MENU_CATEGORIES, menuCategories: menuCategories };
}

function getMenuItems(menuItems) {
  return { type: ActionTypes.GET_MENU_ITEMS, menuItems: menuItems }
}

// thunks
export const fetchTables = function(testURL = '') {
  const url = testURL ? testURL : '';
  return dispatch => {
    return fetch(url + '/tables.json')
    .then(response => response.json())
    .then(json => dispatch({ type: ActionTypes.GET_TABLES, tables: json }));
  }
}

export const fetchMenuCategories = function(testURL = '') {
  return dispatch => {
    return fetch('/menu_categories.json')
    .then(response => response.json())
    .then(json => dispatch(getMenuCategories(json)));
  }
}

export const fetchMenuItems = function(id, testURL = '') {
  let url = '/menu_items/show_by_category?' + $.param({ menu_category_id: id });
  return dispatch => {
    return fetch(url)
    .then(response => response.json())
    .then(json => dispatch(getMenuItems(json)));
  }
}