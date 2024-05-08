import React, { useState } from "react";
import { Modal, TextField, Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

type CreateNewEntityButtonProps = {
  attributes: Record<string, string>; // Define the attributes dynamically
  onSubmit: (newData: Record<string, string>) => void;
};

const CreateNewEntityButton: React.FC<CreateNewEntityButtonProps> = ({
  attributes,
  onSubmit,
}) => {
  const [open, setOpen] = useState(false);
  const [newData, setNewData] = useState<Record<string, string | Date>>({});

  const handleChange = (value: string | Date, name: string) => {
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
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 800,
            background: "white",
            padding: 20,
            borderRadius: 8,
          }}
        >
          <h2>Create New Entity</h2>
          {Object.entries(attributes).map(([key, label]) => {
            if (key === "year") {
              return (
                <LocalizationProvider key={key} dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label={label}
                    views={["year"]}
                    value={newData[key] || null}
                    onChange={(date) => handleChange(date, key)}
                    fullWidth
                    margin="normal"
                    style={{ width: "100%" }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              );
            } else {
              return (
                <TextField
                  key={key}
                  label={label}
                  name={key}
                  value={newData[key] || ""}
                  onChange={(e) => handleChange(e.target.value, key)}
                  fullWidth
                  margin="normal"
                  style={{ width: "100%" }}
                />
              );
            }
          })}
          <Button color="primary" onClick={handleSubmit} variant="contained">
            Submit
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default CreateNewEntityButton;
