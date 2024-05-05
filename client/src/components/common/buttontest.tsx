import React, { useState } from 'react';
import { Modal, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { Button } from '@material-tailwind/react';
import { SelectChangeEvent } from '@mui/material/Select';
import { DatePicker } from '@mui/x-date-pickers';

type InputType = 'text' | 'select' | 'date'; // Add more types as needed

type Attribute = {
  label: string;
  type: InputType;
  options?: string[]; // For 'select' type
};

type CreateNewEntityButtonProps = {
  attributes: Record<string, Attribute>;
  onSubmit: (newData: Record<string, string>) => void;
};

const CreateNewEntityButton: React.FC<CreateNewEntityButtonProps> = ({
  attributes,
  onSubmit,
}) => {
  const [open, setOpen] = useState(false);
  const initialData = Object.keys(attributes).reduce((acc, key) => {
    acc[key] = '';
    return acc;
  }, {} as Record<string, string>);

  const [newData, setNewData] = useState(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewData((prevData) => ({
      ...prevData,
      [name]: value.toString(),
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setNewData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (date: Date | null, name: string) => {
    setNewData((prevData) => ({
      ...prevData,
      [name]: date?.toISOString().split('T')[0] || '',
    }));
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
      <Button onClick={handleOpen} className='flex flex-row'>
        Create New
      </Button>

      <Modal open={open} onClose={handleClose} >
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 800, background: 'white', padding: 20, borderRadius: 8 }}>
          <h2>Create New Entity</h2>
          {Object.entries(attributes).map(([key, { label, type, options }]) => (
            type === 'text' ? (
              <TextField
                key={key}
                label={label}
                name={key}
                value={newData[key]}
                onChange={handleChange}
                fullWidth
                margin="normal"
                style={{
                  width: '100%',
                }}
              />
            ) : type === 'date' ? (
              <DatePicker
                key={key}
                label={label}
                name={key}
                value={newData[key]}
                onChange={(date:any) => handleDateChange(date, key)}
              />
            ) : (
              <FormControl key={key} fullWidth margin="normal">
                <InputLabel id={`label-${key}`}>{label}</InputLabel>
                <Select
                  name={key}
                  value={newData[key]}
                  onChange={handleSelectChange}
                  aria-labelledby={`label-${key}`}
                >
                  {options && options.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )
          ))}
          <Button color='teal' onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default CreateNewEntityButton;
