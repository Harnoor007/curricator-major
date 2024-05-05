import React from "react";
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Card,
} from "@material-tailwind/react";
import ProfileMenu from "../Navbar/ProfileMenu";

function StickyNavbar(props: any) {
  const location = useLocation();
  const [openNav, setOpenNav] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const isLoginPage = location.pathname === '/';

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {isLoginPage ? (
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal cursor-pointer"
        >
          <Link to={'/'} className={`flex items-center ${location.pathname === '/' ? 'text-teal-200 font-bold text-lg' : 'text-black'}`}>
            Dashboard
          </Link>
        </Typography>
      ) : (
        <>
          <Typography
              as="li"
              variant="small"
              color="blue-gray"
              className="p-1 font-normal cursor-pointer"           >
            <Link to={'/dashboard'} className={`flex items-center ${location.pathname === '/dashboard' ? 'text-teal-200 font-bold text-lg' : 'text-black'}`}>
              Dashboard
            </Link>
          </Typography>
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-normal cursor-pointer"
          >
            <Link to={'/curriculum'} className={`flex items-center ${location.pathname === '/curriculum' ? 'text-teal-200 font-bold text-lg' : 'text-black'}  `}>
              Curriculum
            </Link>
          </Typography>
          <Typography
            variant="small"
            color="blue-gray"
            className="p-1 font-normal cursor-pointer"
          >
            <Link to={'/assesment'} className={`flex items-center ${location.pathname === '/assesment' ? 'text-teal-200 font-bold text-lg' : 'text-black'}`}>
              Assessment
            </Link>
          </Typography>
          <Typography
            variant="small"
            color="blue-gray"
            className="p-1 font-normal cursor-pointer"
          >
            <Link to={'/attainment'} className={`flex items-center ${location.pathname === '/attainment' ? 'text-teal-200 font-bold text-lg' : 'text-black'}`}>
              Attainment
            </Link>
          </Typography>
        </>
      )}
    </ul>
  );

  return (
    <Navbar className="sticky top-0 z-20 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          className="mr-4 cursor-pointer py-1.5 text-lg font-bold text-cyan-800"
          onClick={() => { navigate("/") }}
        >
          Curricator
        </Typography>
        <div className="flex items-center gap-4">
          <div className="mr-4 hidden lg:block">{navList}</div>
          <ProfileMenu />
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
      </div>
      <MobileNav open={openNav}>
        {navList}
      </MobileNav>
    </Navbar>
  );
}

export default StickyNavbar;
