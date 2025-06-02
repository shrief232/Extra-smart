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
        <Card sx={{ padding: 4, marginBottom: 3, borderRadius: 3, position: "relative" }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box display="flex" alignItems="center" gap={4}>
              <Avatar src={user.profile_image} sx={{ width: 110, height: 110 }} />
              <Stack spacing={1} sx={{ mb: 4 }}>
                <Typography variant="h6">
                  Eng. {user.first_name || "N/A"} {user.last_name || ""}
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Typography variant="body2" color="text.secondary">Job Title:</Typography>
                  <Typography variant="body2">{user.job_title || "N/A"}</Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                    <Typography variant="body2" color={user.is_active ? 'success.main' : 'error.main'}>
                      {user.is_active ? 'Active' : 'Inactive'}
                    </Typography>
                    <Icon icon='nrk:user-notloggedin-active' color="#147b06"/>
                </Box>
              </Stack>
            </Box>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
            <Button
              onClick={() => setDialogOpen(true)}
              sx={{ border: "1px solid", width: "70%", borderRadius:'10px' }}
            >
              Edit <Icon icon="mi:edit-alt" width="24" height="24" />
            </Button>
          </Box>

          <Box sx={{ display: "flex", gap: 1, mt: 5, justifyContent: "center" }}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Typography variant="caption" color="text.secondary">Email</Typography>
              <Typography variant="caption">{user.email || "N/A"}</Typography>
            </Box>
            <Divider orientation="vertical" sx={{ height: 50, mx: 2, borderRightWidth: 2 }} />
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Typography variant="caption" color="text.secondary">Phone</Typography>
              <Typography variant="caption">{user.phone_number || "N/A"}</Typography>
            </Box>
            <Divider orientation="vertical" sx={{ height: 50, mx: 2, borderRightWidth: 2 }} />
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Typography variant="caption" color="text.secondary">Company</Typography>
              <Typography variant="caption">{user.company_name || "N/A"}</Typography>
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
