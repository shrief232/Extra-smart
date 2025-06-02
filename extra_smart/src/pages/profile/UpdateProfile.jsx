import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Stack,
  Avatar,
  Box
} from "@mui/material";

export default function UpdateProfile({ user, onSubmit }) {
  const [firstName, setFirstName] = useState(user?.first_name || "");
  const [lastName, setLastName] = useState(user?.last_name || "");
  const [phone, setPhone] = useState(user?.phone_number || "");
  const [companyName, setCompanyName] = useState(user?.company_name || "");
  const [jobTitle, setJobTitle] = useState(user?.job_title || "");
  const [profileImage, setProfileImage] = useState(null);

  const handleSubmit = () => {
    const formData = new FormData();
    if (firstName !== user.first_name) formData.append("first_name", firstName);
    if (lastName !== user.last_name) formData.append("last_name", lastName);
    if (phone !== user.phone_number) formData.append("phone_number", phone);
    if (companyName !== user.company_name) formData.append("company_name", companyName);
    if (jobTitle !== user.job_title) formData.append("job_title", jobTitle);
    if (profileImage) formData.append("profile_image", profileImage);
    onSubmit(formData);
  };

  return (
    <Stack spacing={2} mt={1}>
      <Box display="flex" justifyContent="center" mt={2}>
        <Avatar
          src={profileImage ? URL.createObjectURL(profileImage) : user.profile_image}
          alt="Profile"
          sx={{ width: 100, height: 100 }}
        />
      </Box>

      <Button variant="outlined" component="label">
        Upload Profile Image
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => setProfileImage(e.target.files?.[0] || null)}
        />
      </Button>

      <TextField label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} fullWidth />
      <TextField label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} fullWidth />
      <TextField label="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} fullWidth />
      <TextField label="Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} fullWidth />
      <TextField label="Job Title" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} fullWidth />

      <Button variant="contained" onClick={handleSubmit}>Save</Button>
    </Stack>
  );
}
