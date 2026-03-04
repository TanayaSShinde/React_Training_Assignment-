import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import ShoppingPage from './components/ShoppingPage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#ff9800',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ShoppingPage />
    </ThemeProvider>
  );
} 

export default App;
