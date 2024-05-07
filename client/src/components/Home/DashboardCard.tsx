import { Button, Typography } from '@mui/material'
import { HomeCardData } from '../../types/types'
import { useNavigate } from 'react-router-dom'

export default function DashboardCard(cardData : HomeCardData) {
    const navigate = useNavigate();
  return (
    <Button
            onClick={() => navigate(cardData.path)}
            fullWidth
            variant="contained"
            color="primary"
            sx={{ height: "100%", flex: 1, flexDirection: 'column' }}
          >
            <cardData.icon sx={{ fontSize: "4rem", marginBottom: "0.5rem" }} />
            <Typography variant="h6" align="center" gutterBottom>
              {cardData.title}
            </Typography>
          </Button>
  )
}
