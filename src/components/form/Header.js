import React from 'react';

const Header = ({  onClose, onRestart }) => {
  return (
    <div style={headerStyle}>
      <div>UROGULF SUPPORT</div>
      <div>
        
        <a title="Restart" onClick={onRestart}><i className="fa-solid  fa-rotate-right"></i></a>
        <a title='Close' onClick={onClose}><i className="fa-solid header-icon fa-x"></i></a>
      </div>
    </div>
  );
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '15px',
  borderBottom: '1px solid #ccc',
  backgroundColor:"#6e48aa",
  color:"white"
};

export default Header;
