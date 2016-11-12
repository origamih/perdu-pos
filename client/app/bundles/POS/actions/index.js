export const ActionTypes = {
  GET_TABLES: 'GET_TABLES',
  GET_MENU_CATEGORIES: 'GET_MENU_CATEGORIES',
  GET_MENU_ITEMS: 'GET_MENU_ITEMS'
}

// Action Creator 
export function getTables(tables) {
  return { type: ActionTypes.GET_TABLES, tables: tables };
}

export function getMenuCategories(menuCategories) {
  return { type: ActionTypes.GET_MENU_CATEGORIES, menuCategories: menuCategories };
}

export function getMenuItems(menuItems) {
  return { type: ActionTypes.GET_MENU_ITEMS, menuItems: menuItems }
}

// thunks
export const fetchTables = function(testURL = '') {
  const url = testURL ? testURL : '';
  return dispatch => {
    return fetch(url + '/tables.json')
    .then(response => response.json())
    .then(json => dispatch(getTables(json)))
    .catch(err => console.log(err));
  }
}

export const fetchMenuCategories = function(testURL = '') {
  const url = testURL ? testURL : '';
  return dispatch => {
    return fetch(url + '/menu_categories.json')
    .then(response => response.json())
    .then(json => dispatch(getMenuCategories(json)))
    .catch(err => console.log(err));
  }
}

export const fetchMenuItems = function(id, testURL = '') {
  let url = testURL ? testURL : '';
  let token = global.$ ? $('meta[name="csrf-token"]').attr('content') : '';
  let headers = {
    'X-Requested-With': 'XMLHttpRequest',
    'X-CSRF-Token': token,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };
  return dispatch => {
    return fetch(url + '/menu_items/show_by_category', { 
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ 'menu_item': { menu_category_id: id } }),
      credentials: 'same-origin'
    })
    .then(response => response.json())
    .then(json => dispatch(getMenuItems(json)))
    .catch(err => console.log(err));
  }
}