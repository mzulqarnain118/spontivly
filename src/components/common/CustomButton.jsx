import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const CustomButton = ({ disable, onClick, text }) => {
  const handleClick = () => {
    if (!disable && onClick) {
      onClick();
    }
  };

  const buttonContent = (
    <>
      {text === 'Login' || text === 'Create account' ? (
        <Link to="/dashboard" style={{ textDecoration: 'none', width: '100%', color: 'white' }}>
          {text}
        </Link>
      ) : (
        text
      )}
    </>
  )
  return (
    <Button
      disabled={disable}
      onClick={handleClick}
      style={{
        color: 'white',
        width: '100%', // Expand to full width on small screens
        padding: '16px 32px',
        backgroundColor: 'var(--brand-complimentary, #323E48)',
        borderRadius: '8px',
        opacity: disable ? 0.4 : 1,
        '&:hover': {
          opacity: 1,
        },
        marginTop: '24px',
      }}
    >
      {buttonContent}
    </Button>
  );
};

export default CustomButton;
