import React, { useEffect } from "react";
import {School, EmojiEvents, Analytics, AccountBox, Add} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Grid, Card } from "@mui/material";
import { HomeCardData } from "../../types/types";
import DashboardCard from "../../components/Home/DashboardCard";

const cardData: HomeCardData[] = [
  {
    id: 0,
    title: 'Curriculum',
    icon: School,
    path: '/curriculum'
  },
  {
    id: 1,
    title: 'Attainment',
    icon: EmojiEvents,
    path: '/attainment'
  },
  {
    id: 2,
    title: 'Resources',
    icon: Analytics,
    path: '/resources'
  },
  {
    id: 3,
    title: 'Profile',
    icon: AccountBox,
    path: '/profile'
  },
  {
    id: 4,
    title: 'Add New Users',
    icon: Add,
    path: 'addUsers'
  },
]

interface SuperAdminProps { }

const SuperAdmin: React.FC<SuperAdminProps> = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      navigate("/login"); // Redirect to login if token is not present
    }
  }, [navigate]);

  return (
    <Card sx={{ padding: "1rem", margin: "5rem" }}>
      <Grid container spacing={2}>

        {cardData.map((data) => (
          <Grid item xs={12} md={6}>
          <DashboardCard key={data.id} {...data} />
          </Grid>

        ))
        }


      </Grid>
    </Card>
  );
};

export default SuperAdmin;
