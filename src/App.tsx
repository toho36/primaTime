import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextInput from './components/TextInput';
import ComboBox from './components/ComboBox';
import Button from '@mui/material/Button';

const handleInputChange = (value: string) => {
  // Handle the input change logic here
  console.log(value);
};

const handleButtonClick = () => {
  // Handle the button click logic here
  console.log('Button clicked!');
};

export default function App() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          To Hoang Viet
        </Typography>

        <Typography variant="h6" gutterBottom>
          Vaše křestní jméno
        </Typography>
        <TextInput value="" onChange={handleInputChange} />

        <Typography variant="h6" gutterBottom>
          Univerzita na kterou chodíte
        </Typography>
        <Box sx={{ mb: 2 }}>
          {' '}
          {/* Add margin-bottom for spacing */}
          <ComboBox />
        </Box>

        <Button variant="contained" onClick={handleButtonClick}>
          Odeslat
        </Button>
      </Box>
    </Container>
  );
}
