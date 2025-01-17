const Button = () => {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          padding: '16px 20px !important', // Set the default padding
          fontSize: '14px !important',
          fontStyle: 'normal !important',
          fontWeight: '600 !important',
          color: ({ color }) => (color ? color : 'inherit'),
          backgroundColor: ({ color }) => (color ? 'transparent' : 'inherit'),
          '&:disabled': {
            backgroundColor: '#ADB2B6'
          }
        },
        outlined: {
          '&:disabled': {
            backgroundColor: 'inherit'
          }
        }
      }
    }
  }
}

export { Button }
