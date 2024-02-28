import React, { useState } from 'react';
import useUniversitySearch from '../hooks/useUniversitySearch';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

interface University {
  name: string;
}

interface ComboBoxProps {
  selectedUniversity: University | null;
  onUniversityChange: (university: University | null) => void;
}

const ComboBox: React.FC<ComboBoxProps> = ({
  selectedUniversity,
  onUniversityChange,
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const {
    data: universities,
    isLoading,
    isError,
  } = useUniversitySearch(inputValue);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleUniversityChange = (
    event: React.ChangeEvent<{}>,
    value: University | null
  ) => {
    onUniversityChange(value);
  };

  return (
    <div>
      <Autocomplete
        value={selectedUniversity}
        options={(universities as University[]) || []}
        getOptionLabel={(option) => option.name}
        loading={isLoading}
        noOptionsText="No universities found"
        onChange={handleUniversityChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select University"
            variant="outlined"
            onChange={handleInputChange}
          />
        )}
        renderOption={(props, option: University) => (
          <li {...props}>
            <span>{option.name}</span>
          </li>
        )}
        isOptionEqualToValue={(option: University, value: University) =>
          option?.name === value?.name
        }
      />
    </div>
  );
};

export default ComboBox;
