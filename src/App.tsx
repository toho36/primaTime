import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextInput from './components/TextInput';
import ComboBox from './components/ComboBox';
import Button from '@mui/material/Button';

export interface University {
  name: string;
}

const handleInputChange = (value: string) => {
  console.log(value);
};

const handleButtonClick = (
  inputValue: string,
  selectedUniversity: University | null,
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>
) => {
  // Frontend Validation
  if (!inputValue.trim()) {
    setErrorMessage('Toto pole je povinné');
    return;
  }

  // If validation passes, show alert
  const universityText = selectedUniversity
    ? selectedUniversity.name
    : 'nevyplněno';
  alert(`Jméno: ${inputValue}, Univerzita: ${universityText}`);
};

export default function App() {
  const [selectedUniversity, setSelectedUniversity] =
    React.useState<University | null>(null);
  const [inputValue, setInputValue] = React.useState<string>('');
  const [errorMessage, setErrorMessage] = React.useState<string>('');

  const handleUniversityChange = (university: University | null) => {
    setSelectedUniversity(university);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          To Hoang Viet
        </Typography>

        <Typography variant="h6" gutterBottom>
          Vaše křestní jméno
        </Typography>
        <TextInput
          value={inputValue}
          onChange={(value) => {
            handleInputChange(value);
            setErrorMessage(''); // Clear error message on input change
            setInputValue(value); // Update inputValue state
          }}
          error={errorMessage}
        />

        <Typography variant="h6" gutterBottom>
          Univerzita na kterou chodíte
        </Typography>
        <Box sx={{ mb: 2 }}>
          <ComboBox
            selectedUniversity={selectedUniversity}
            onUniversityChange={handleUniversityChange}
          />
        </Box>

        <Button
          variant="contained"
          onClick={() =>
            handleButtonClick(inputValue, selectedUniversity, setErrorMessage)
          }
        >
          Odeslat
        </Button>
      </Box>
    </Container>
  );
}
