import React, { PropTypes } from 'react'
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
    </div>
  );
}

UtilityButtonsWidget.propTypes = { utilityButtons: PropTypes.array.isRequired }
export default UtilityButtonsWidget