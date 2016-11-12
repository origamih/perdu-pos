import React from 'react';

const POSIndexWidget = ({ children }) => {
  return (
    <div className="container">
      {children}
    </div>
  );
}
POSIndexWidget.propTypes = { children: React.PropTypes.object.isRequired }
export default POSIndexWidget
