import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Typography } from '@material-tailwind/react';
import { getOrganizationByName } from '../../services/db';
import { text } from 'stream/consumers';
import ErrorComponent from '../errorPage/Error';
import { CheckIcon } from '@heroicons/react/24/solid';

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
  if (loading) return <text>'Loading...'</text>; // or 'Loading...' if you want to display a message
  if (error) return <ErrorComponent message={error} />
  return (
    <React.Fragment>
      <Card color="teal" variant="gradient" className="w-full p-7 h-min">
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 mb-4 rounded-none border-b-2 border-white/40 pb-4 text-center"
        >
          <Typography
            variant="h1"
            color="white"
            className="mt-6 flex justify-center gap-1 text-7xl font-normal"
          >
            {organizationData?.name}
          </Typography>
        </CardHeader>
        <CardBody className="p-0 flex flex-row justify-between gap-5">
          <div>
            <Typography
              variant="h3"
              color="white"
              className="mt-6 flex justify-center gap-1 text-4xl font-normal text-justify"
            >
              Vision
            </Typography>
            <Typography
              variant="h3"
              color="white"
              className="mt-6 flex justify-center gap-1 text-sm font-normal"
            >
              {organizationData?.vision}
            </Typography>
          </div>

          <div>
            <Typography
              variant="h3"
              color="white"
              className="mt-6 flex justify-center gap-1 text-4xl font-normal"
            >
              Mission
            </Typography>
            <Typography
              variant="h3"
              color="white"
              className="mt-6 flex justify-center gap-1 text-sm font-normal text-justify"
            >
              {organizationData?.mission}
            </Typography>
          </div>

        </CardBody>
        <CardFooter className="mt-12 p-0">
          <Button
            size="lg"
            color="white"
            className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
            ripple={false}
            fullWidth={true}
            disabled
          >
            Can only be set up by a organization database admin!
          </Button>
        </CardFooter>
      </Card>
    </React.Fragment>
  );
};

export default Organization;
