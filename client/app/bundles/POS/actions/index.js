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
    .then(json => dispatch(getTables(json)));
  }
}

export const fetchMenuCategories = function(testURL = '') {
  const url = testURL ? testURL : '';
  return dispatch => {
    return fetch(url + '/menu_categories.json')
    .then(response => response.json())
    .then(json => dispatch(getMenuCategories(json)));
  }
}

export const fetchMenuItems = function(id, testURL = '') {
  let url = testURL ? testURL : '';
  return dispatch => {
    return fetch(url + '/menu_items/show_by_category', { 
      method: 'POST',
      body: JSON.stringify({ menu_category_id: id })
    })
    .then(response => response.json())
    .then(json => dispatch(getMenuItems(json)));
  }
}