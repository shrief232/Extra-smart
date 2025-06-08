import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Card,
  IconButton,
  Stack,
  Typography,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  Button,
} from "@mui/material";
import { Icon } from "@iconify/react";
import api from '../../api';
import UpdateProfile from "./UpdateProfile";

export default function ProfileInfo() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        setError("No authentication token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await api.get("en/users/user/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (err) {
        setError(err.response?.data?.detail || "Error fetching profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleProfileSubmit = async (formData) => {
    try {
      await api.patch("en/users/user/", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setDialogOpen(false);
      const res = await api.get("en/users/user/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setUser(res.data);
    } catch (err) {
      console.error("Failed to update profile", err);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box sx={{ width: "100%" }}>
      {user && (
       <Card
  sx={{
    p: { xs: 2, sm: 3, md: 4 },
    mb: 3,
    borderRadius: 3,
    position: "relative",
  }}
>
  <Box sx={{ display: "flex", flexDirection: "column" }}>
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <Avatar
        src={user.profile_image}
        sx={{
          width: { xs: 70, sm: 90, md: 110 },
          height: { xs: 70, sm: 90, md: 110 },
        }}
      />
      <Stack
        spacing={1}
        sx={{ mb: { xs: 2, md: 4 }, flex: 1 }}
      >
        <Typography
          variant="h6"
          sx={{ fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" } }}
        >
          Eng. {user.first_name || "N/A"} {user.last_name || ""}
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
          >
            Job Title:
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
          >
            {user.job_title || "N/A"}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Typography
            variant="body2"
            color={user.is_active ? "success.main" : "error.main"}
            sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
          >
            {user.is_active ? "Active" : "Inactive"}
          </Typography>
          <Icon icon="nrk:user-notloggedin-active" color="#147b06" />
        </Box>
      </Stack>
    </Box>
  </Box>

  <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
    <Button
      onClick={() => setDialogOpen(true)}
      sx={{
        border: "1px solid",
        width: { xs: "90%", sm: "80%", md: "70%" },
        borderRadius: "10px",
        fontSize: { xs: "0.75rem", sm: "0.85rem" },
      }}
    >
      Edit <Icon icon="mi:edit-alt" width="20" height="20" />
    </Button>
  </Box>

  <Box
    sx={{
      display: "flex",
      gap: { xs: 1, sm: 2 },
      mt: { xs: 3, sm: 4, md: 5 },
      justifyContent: "center",
    }}
  >
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem" } }}
      >
        Email
      </Typography>
      <Typography variant="caption" sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem" } }}>
        {user.email || "N/A"}
      </Typography>
    </Box>
    <Divider
      orientation="vertical"
      sx={{
        height: { xs: 40, sm: 50 },
        mx: 1.5,
        borderRightWidth: 2,
      }}
    />
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem" } }}
      >
        Phone
      </Typography>
      <Typography variant="caption" sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem" } }}>
        {user.phone_number || "N/A"}
      </Typography>
    </Box>
    <Divider
      orientation="vertical"
      sx={{
        height: { xs: 40, sm: 50 },
        mx: 1.5,
        borderRightWidth: 2,
      }}
    />
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem" } }}
      >
        Company
      </Typography>
      <Typography variant="caption" sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem" } }}>
        {user.company_name || "N/A"}
      </Typography>
    </Box>
  </Box>
</Card>

      )}

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <UpdateProfile user={user} onSubmit={handleProfileSubmit} />
        </DialogContent>
      </Dialog>
    </Box>
  );
}
