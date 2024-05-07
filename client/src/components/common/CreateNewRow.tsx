import React, { useState, useEffect } from 'react';
import { Modal, TextField, Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

type CreateNewEntityButtonProps = {
  attributes: Record<string, string>; // Define the attributes dynamically
  onSubmit: (newData: Record<string, string | Date>) => void;
};

const CreateNewEntityButton: React.FC<CreateNewEntityButtonProps> = ({
  attributes,
  onSubmit,
}) => {
  const [open, setOpen] = useState(false);

  const initialData = Object.keys(attributes).reduce((acc, key) => {
    acc[key] = key === 'year' ? new Date() : '';
    return acc;
  }, {} as Record<string, string | Date>);  

  const [newData, setNewData] = useState<Record<string, string | Date>>(initialData);
  
  const handleChange = (value: string | Date, name: string) => {
    if (name === 'year') {
      const year = (value as Date).getFullYear();
      const batch = `${year}`;
      setNewData((prevData) => ({
        ...prevData,
        [name]: batch,
      }));
    } else {
      setNewData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = () => {
    onSubmit(newData);
    handleClose();
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleOpen} className='flex flex-row' variant="contained">
        Create New
      </Button>

      <Modal open={open} onClose={handleClose}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 800, background: 'white', padding: 20, borderRadius: 8 }}>
          <h2>Create New Entity</h2>
          {Object.entries(attributes).map(([key, label]) => {
            if (key === 'year') {
              return (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Year"
                    views={['year']}
                    renderInput={(params: any) => <TextField {...params} helperText="Enter starting year only" />}
                    onChange={(date) => handleChange(date, 'year')} // Pass 'year' as the name
                    value={newData['year'] as Date} // Use newData['year'] as the value
                    sx={{ mb: 2 }}
                />

              </LocalizationProvider>
              );
            } else {
              return (
                <TextField
                    key={`${key}-${label}`} // Unique key based on both key and label
                    label={label}
                    name={key}
                    value={newData[key] as string}
                    onChange={(e) => handleChange(e.target.value, key)} // Access value directly
                    fullWidth
                    margin="normal"
                    style={{ width: '100%' }}
                />
              );
            }
          })}
          <Button color='primary' onClick={handleSubmit} variant="contained">
            Submit
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default CreateNewEntityButton;
