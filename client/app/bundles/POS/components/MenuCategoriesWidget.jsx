import React, { PropTypes } from 'react';

const MenuCategoriesWidget = ({ menuCategories, onClick }) => {
  let menuCategoryItems = menuCategories.map(menuCategory => {
    return <button onClick={() => onClick(menuCategory.id)} key={menuCategory.id} className='btn btn-warning'>{menuCategory.name}</button>
  });
  return <div>{menuCategoryItems}</div>
}

MenuCategoriesWidget.propTypes = {
  menuCategories: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired
}
export default MenuCategoriesWidget