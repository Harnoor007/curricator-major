import {
  Input,
  Checkbox,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
  Select,
  Option,
    
} from "@material-tailwind/react";

import { useNavigate } from "react-router-dom";

export default function SimpleRegistrationForm() {

  const navigate = useNavigate()
  return (
    <div className="flex justify-around items-center h-screen bg-gray-100 ">
      {/* image */}
      <Card className="w-min h-max">
      <CardHeader floated={false} className="w-max p-5">
        <img src={require('../images/logo.png')} alt="profile-picture" className="w-96 h-96"/>
      </CardHeader>
      <CardBody className="text-center">
        <Typography variant="h4" color="blue-gray" className="mb-2">
          Welcome to AICTE Unified Portal for Curriculum design  
        </Typography>
        <Typography color="blue-gray" className="font-medium" textGradient>
          Login Using Credentials
        </Typography>
      </CardBody>
      <CardFooter className="flex justify-center gap-7 pt-2">
        <Tooltip content="Like">
          <Typography
            as="a"
            href="#facebook"
            variant="lead"
            color="blue"
            textGradient
          >
            <i className="fab fa-facebook" />
          </Typography>
        </Tooltip>
        <Tooltip content="Follow">
          <Typography
            as="a"
            href="#twitter"
            variant="lead"
            color="light-blue"
            textGradient
          >
            <i className="fab fa-twitter" />
          </Typography>
        </Tooltip>
        <Tooltip content="Follow">
          <Typography
            as="a"
            href="#instagram"
            variant="lead"
            color="purple"
            textGradient
          >
            <i className="fab fa-instagram" />
          </Typography>
        </Tooltip>
      </CardFooter>
    </Card>

      {/* siginin conatiner */}
      <Card className="py-5 px-5" shadow={true}>
        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details to register.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6">
            <Input size="lg" label="UserName" crossOrigin={undefined} />
            <Input type="password" size="lg" label="Password" crossOrigin={undefined} />
            <Select label="Select Role">
              <Option>Admin</Option>
              <Option>Curriculum Developer</Option>
              <Option>Subject Admin</Option>
              <Option>Educator</Option>
          </Select>
          </div>
          <Checkbox
              color="teal"
            label={<Typography
              variant="small"
              color="gray"
              className="flex items-center font-normal"
            >
              I agree the
              <a
                href="#"
                className="font-medium transition-colors hover:text-gray-900"
              >
                &nbsp;Terms and Conditions
              </a>
            </Typography>}
            containerProps={{ className: "-ml-2.5" }} crossOrigin={undefined}          />
          <div className="mt-6 text-center">
            <Button 
            fullWidth
            onClick={()=>{navigate('/ ')}}
            >Sign In</Button>
          </div>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Don't have an account?{" "}
            <a href="#" className="font-medium text-gray-900">
              Contact Admin
            </a>
          </Typography>
        </form>
      </Card>
    </div>
  );
}
