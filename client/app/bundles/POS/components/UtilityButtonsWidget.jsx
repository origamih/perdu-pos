import React, { PropTypes } from 'react'
import ChangeTableModalWidget from './ChangeTableModalWidget'
const UtilityButtonsWidget = ({ utilityButtons, onClick }) => {
  return(
    <div>
      {
        utilityButtons.map((button, id) => {
          return <button 
                    className='btn btn-default' 
                    onClick={() => onClick(button)} 
                    key={id}>
                    {button}
                  </button>
        })
      }
      <ChangeTableModalWidget/>
    </div>
  );
}

UtilityButtonsWidget.propTypes = { utilityButtons: PropTypes.array.isRequired }
export default UtilityButtonsWidget