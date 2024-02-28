import React, { useState, useEffect, forwardRef } from 'react';
import useUniversitySearch from '../hooks/useUniversitySearch';
import { useFloating, shift, flip } from '@floating-ui/react-dom';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface University {
  name: string;
}

interface ComboBoxProps {
  selectedUniversity: University | null;
  onUniversityChange: (university: University | null) => void;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  onFocus?: () => void;
}
const ComboBox = forwardRef<HTMLDivElement, ComboBoxProps>(
  (
    {
      selectedUniversity,
      onUniversityChange,
      disabled = false,
      error = false,
      errorMessage = '',
      onFocus,
    },
    ref
  ) => {
    const [inputValue, setInputValue] = useState<string>('');
    const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false);

    const {
      data: universities,
      isLoading,
      isError,
    } = useUniversitySearch(inputValue);

    const { x, y, refs, strategy } = useFloating({
      placement: 'bottom-start',
      middleware: [flip(), shift()],
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
      setIsPanelOpen(true);
    };

    const handleUniversitySelect = (university: University) => {
      onUniversityChange(university);
      setIsPanelOpen(false);
      setInputValue('');
    };

    const handleClearSelection = () => {
      onUniversityChange(null);
      setInputValue('');
    };

    const handleFocus = () => {
      if (inputValue === '') {
        setIsPanelOpen(true);
      }
      if (onFocus) {
        onFocus();
      }
    };

    useEffect(() => {
      if (inputValue === '') {
        setIsPanelOpen(false);
      }
    }, [inputValue]);

    return (
      <div style={{ position: 'relative' }}>
        <TextField
          style={{
            width: ' 300px',
          }}
          value={selectedUniversity ? selectedUniversity.name : inputValue}
          onChange={handleInputChange}
          onBlur={() => setTimeout(() => setIsPanelOpen(false), 100)}
          onFocus={handleFocus}
          disabled={disabled}
          error={error}
          helperText={error ? errorMessage : ''}
          label="Select University"
          variant="outlined"
          ref={ref}
          InputProps={{
            endAdornment: selectedUniversity ? (
              <InputAdornment position="end">
                <IconButton onClick={handleClearSelection} edge="end">
                  <CloseIcon />
                </IconButton>
              </InputAdornment>
            ) : null,
          }}
        />
        {isPanelOpen && (
          <ul
            ref={refs.floating as React.MutableRefObject<HTMLUListElement>}
            style={{
              position: 'absolute',
              top:
                (strategy as 'top-start' | 'bottom-start') === 'top-start'
                  ? '100%'
                  : 'auto',
              width: '300px',
              maxWidth: 'calc(100% - 2px)',
              maxHeight: '300px',
              overflowY: 'auto',
              listStyle: 'none',
              padding: 0,
              margin: 0,
              backgroundColor: 'white',
              border: '1px solid rgba(0,0,0,.1)',
              zIndex: 1000,
              boxSizing: 'border-box',
              scrollbarWidth: 'thin',
              scrollbarColor: 'dark',
            }}
          >
            {isLoading ? (
              <li>Loading...</li>
            ) : isError || !universities ? (
              <li>Error loading universities.</li>
            ) : (
              universities.map((university: University) => (
                <li
                  key={university.name}
                  onClick={() => handleUniversitySelect(university)}
                  style={{
                    padding: '10px',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    width: '100%',
                  }}
                >
                  {university.name}
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    );
  }
);

export default ComboBox;
