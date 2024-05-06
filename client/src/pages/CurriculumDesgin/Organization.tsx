import React, { useEffect, useState } from 'react';
import { Button, Card, CardActions, CardContent, CardHeader, Typography } from '@mui/material';
import { getOrganizationByName } from "../../utils/db";
import ErrorComponent from '../../components/errorPage/Error';

type OrganizationProps = {
  organizationName: string;
};

type OrganizationData = {
  name: string;
  vision: string;
  mission: string;
};

const Organization: React.FC<OrganizationProps> = ({ organizationName }): JSX.Element | null => {
  const [organizationData, setOrganizationData] = useState<OrganizationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrganizationData = async () => {
      try {
        const data = await getOrganizationByName(organizationName);
        setOrganizationData(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizationData();
  }, [organizationName]);
  
  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <ErrorComponent message={error} />;
  
  return (
    <Card>
      <CardHeader
        title={organizationData?.name}
        titleTypographyProps={{ variant: "h1", color: "white" }}
        sx={{
          background: 'teal',
          mb: 4,
          pb: 4,
          textAlign: 'center',
        }}
      />
      <CardContent sx={{ display: 'flex', justifyContent: 'space-between', gap: 5 }}>
        <div>
          <Typography variant="h3" color="Balck" sx={{ mb: 1 }}>Vision</Typography>
          <Typography variant="h6" color="Black" sx={{ mb: 1 }}>{organizationData?.vision}</Typography>
        </div>
        <div>
          <Typography variant="h3" color="Black" sx={{ mb: 1 }}>Mission</Typography>
          <Typography variant="h6" color="Black" sx={{ mb: 1 }}>{organizationData?.mission}</Typography>
        </div>
      </CardContent>
      <CardActions>
        <Button
          variant="outlined"
          size="large"
          color="inherit"
          fullWidth
          disabled
          sx={{ '&:hover': { transform: 'scale(1.02)' } }}
        >
          Can only be set up by a organization database admin!
        </Button>
      </CardActions>
    </Card>
  );
};

export default Organization;
