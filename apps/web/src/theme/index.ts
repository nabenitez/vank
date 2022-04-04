import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const secondaryMain = '#5555EE';

const theme = createTheme({
  palette: {
    secondary: {
      main: secondaryMain,
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: secondaryMain,
          },
        },
      },
    },
  },
});

export default responsiveFontSizes(theme);
