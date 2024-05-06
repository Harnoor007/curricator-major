import React from "react";
import SchoolIcon from "@mui/icons-material/School";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { useNavigate } from "react-router-dom";
import { Grid, Card, Typography, Button } from "@mui/material";

interface AdminDashboardProps { }

const AdminDashboard: React.FC<AdminDashboardProps> = () => {
  const navigate = useNavigate();

  return (
    <Card sx={{ padding: "1rem", margin:"5rem" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Button
            onClick={() => navigate("/curriculum")}
            fullWidth
            variant="contained"
            color="primary"
            sx={{ height: "100%", flex: 1, flexDirection: 'column' }}
          >
            <SchoolIcon sx={{ fontSize: "4rem", marginBottom: "0.5rem" }} />
            <Typography variant="h6" align="center" gutterBottom>
              Curriculum
            </Typography>
            <Typography variant="body1" align="center" paragraph>
              Design Curriculum, Specify POs, Design Courses, Specify and map
              COs-POs etc.
            </Typography>
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button
            onClick={() => navigate("/attainment")}
            fullWidth
            variant="contained"
            color="primary"
            sx={{ height: "100%", flex: 1, flexDirection: 'column' }}
          >
            <EmojiEventsIcon
              sx={{ fontSize: "4rem", marginBottom: "0.5rem" }}
            />
            <Typography variant="h6" align="center" gutterBottom>
              Attainment
            </Typography>
            <Typography variant="body1" align="center" paragraph>
              Define threshold levels, Check course/program/consolidated
              Attainment
            </Typography>
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ height: "100%", flex: 1, flexDirection: 'column' }}

          >
            <AnalyticsIcon
              sx={{ fontSize: "4rem", marginBottom: "0.5rem" }}
            />
            <Typography variant="h6" align="center" gutterBottom>
              Resources
            </Typography>
            <Typography variant="body1" align="center" paragraph>
              Watch video tutorials, read books, know how to use this system as
              an educator
            </Typography>
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button
            onClick={() => navigate("/profile")}
            fullWidth
            variant="contained"
            color="primary"
            sx={{ height: "100%", flex: 1, flexDirection: 'column' }}

          >
            <AccountBoxIcon
              sx={{ fontSize: "4rem", marginBottom: "0.5rem" }}
            />
            <Typography variant="h6" align="center" gutterBottom>
              Profile
            </Typography>
            <Typography variant="body1" align="center" paragraph>
              Manage profile, view academic details, edit user details
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};

export default AdminDashboard;
