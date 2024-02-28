import React, { useState, ChangeEvent } from 'react';

interface TextInputProps {
  disabled?: boolean;
  error?: string;
  value: string;
  onChange: (value: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({
  disabled,
  error,
  value,
  onChange,
}) => {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        disabled={disabled}
        style={{
          width: '100%',
          padding: '10px',
          borderRadius: '5px',
          border: error ? '1px solid red' : '1px solid black',
          color: disabled ? 'gray' : 'black',
        }}
      />
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default TextInput;
