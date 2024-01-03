const Grid = ({ spacing }) => {
  return {
    MuiGrid: {
      styleOverrides: {
        container: {
          marginBottom: '8px',
          spacing: spacing(2) // Set the desired spacing value
        },
        item: {
          marginBottom: '8px'
        }
      }
    }
  }
}

export { Grid }
