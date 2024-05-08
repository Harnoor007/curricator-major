import React, { useState } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
  Grid,
} from '@mui/material';
import { departments,userGroups,designations } from '../../utils/constant';

const ProfilePage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
    qualification: '',
    experience: '',
    resetPassword: '',
    confirmPassword: '',
    designation: '',
    userGroup: '',
  });

  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    department: false,
    qualification: false,
    experience: false,
    resetPassword: false,
    confirmPassword: false,
    designation: false,
    userGroup: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name as string]: value as string });
  };

  const handleFocus = (name: string) => {
    setErrors({ ...errors, [name]: false });
  };

  const handleBlur = (name: string) => {
    if (!formData[name]) {
      setErrors({ ...errors, [name]: true });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formData.resetPassword !== formData.confirmPassword) {
      setErrors({ ...errors, passwordMismatch: true });
    } else {
      // Reset password mismatch error if passwords match
      setErrors({ ...errors, passwordMismatch: false });
      console.log(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4">
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="First Name"
            fullWidth
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            onFocus={() => handleFocus("firstName")}
            onBlur={() => handleBlur("firstName")}
            required
            error={errors.firstName}
            helperText={errors.firstName ? "This is a required field" : ""}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Last Name"
            fullWidth
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            onFocus={() => handleFocus("lastName")}
            onBlur={() => handleBlur("lastName")}
            required
            error={errors.lastName}
            helperText={errors.lastName ? "This is a required field" : ""}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Email ID"
            fullWidth
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onFocus={() => handleFocus("email")}
            onBlur={() => handleBlur("email")}
            required
            error={errors.email}
            helperText={errors.email ? "This is a required field" : ""}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth required>
            <InputLabel>Department</InputLabel>
            <Select
              value={formData.department}
              onChange={handleSelectChange}
              name="department"
              onFocus={() => handleFocus("department")}
              onBlur={() => handleBlur("department")}
              error={errors.department}
              InputLabelProps={{ shrink: true }}
            >
              {departments.map((department) => (
                <MenuItem key={department} value={department}>
                  {department}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Qualification"
            fullWidth
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
            onFocus={() => handleFocus("qualification")}
            onBlur={() => handleBlur("qualification")}
            required
            error={errors.qualification}
            helperText={errors.qualification ? "This is a required field" : ""}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Experience"
            fullWidth
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            onFocus={() => handleFocus("experience")}
            onBlur={() => handleBlur("experience")}
            required
            error={errors.experience}
            helperText={errors.experience ? "This is a required field" : ""}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Reset Password"
            fullWidth
            type="password"
            name="resetPassword"
            value={formData.resetPassword}
            onChange={handleChange}
            onFocus={() => handleFocus("resetPassword")}
            onBlur={() => handleBlur("resetPassword")}
            required
            error={errors.resetPassword}
            helperText={errors.resetPassword ? "This is a required field" : ""}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Confirm Password"
            fullWidth
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            onFocus={() => handleFocus("confirmPassword")}
            onBlur={() => handleBlur("confirmPassword")}
            InputLabelProps={{ shrink: true }}
            required
            error={errors.confirmPassword || errors.passwordMismatch} // Include passwordMismatch error
            helperText={
              errors.confirmPassword
                ? "This is a required field"
                : errors.passwordMismatch
                ? "Passwords do not match"
                : ""
            }
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth required>
            <InputLabel>Designation</InputLabel>
            <Select
              value={formData.designation}
              onChange={handleSelectChange}
              name="designation"
              onFocus={() => handleFocus("designation")}
              onBlur={() => handleBlur("designation")}
              error={errors.designation}
            >
              {designations.map((designation) => (
                <MenuItem key={designation} value={designation}>
                  {designation}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth required>
            <InputLabel>User Group</InputLabel>
            <Select
              value={formData.userGroup}
              onChange={handleSelectChange}
              name="userGroup"
              onFocus={() => handleFocus("userGroup")}
              onBlur={() => handleBlur("userGroup")}
              error={errors.userGroup}
            >
              {userGroups.map((userGroup) => (
                <MenuItem key={userGroup} value={userGroup}>
                  {userGroup}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <div className="mt-4">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="mr-2"
        >
          Save
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Update
        </Button>
      </div>
    </form>
  );
};

export default ProfilePage;
