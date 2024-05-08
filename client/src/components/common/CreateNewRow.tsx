import React, { useState } from 'react';
import { Modal, TextField, Button } from '@mui/material';

type CreateNewEntityButtonProps = {
  attributes: Record<string, string>; // Define the attributes dynamically
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
      [name]: value,
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
      <Button
        onClick={handleOpen}
        className='flex flex-row'
        variant="contained" // Adding a variant for styling
        color="primary" // Adding a color for styling
      >
        Create New
      </Button>

      <Modal open={open} onClose={handleClose}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 800, background: 'white', padding: 20, borderRadius: 8 }}>
          <h2>Create New Entity</h2>
          {Object.entries(attributes).map(([key, label]) => (
            <TextField
              key={key}
              label={label}
              name={key}
              value={newData[key]}
              onChange={handleChange}
              fullWidth
              margin="normal"
              style={{ width: '100%' }}
            />
          ))}
          <Button color='primary' variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default CreateNewEntityButton;
