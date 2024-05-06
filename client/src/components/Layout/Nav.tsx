import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Typography, Button, IconButton, Card, Grid } from "@mui/material";
import ProfileMenu from "../Navbar/ProfileMenu";

function StickyNavbar() {
  const location = useLocation();
  const [openNav, setOpenNav] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const isLoginPage = location.pathname === "/";

  const navList = (
    <Grid container spacing={2}>
      {isLoginPage ? (
        <Grid item>
          <Typography variant="body1">
            <Button
              component={Link}
              to="/"
              className={`flex items-center ${
                location.pathname === "/" ? "text-primary font-bold" : "text-black"
              }`}
            >
              Dashboard
            </Button>
          </Typography>
        </Grid>
      ) : (
        <>
          <Grid item>
            <Typography variant="body1">
              <Button
                component={Link}
                to="/dashboard"
                className={`flex items-center ${
                  location.pathname === "/dashboard"
                    ? "text-primary font-bold"
                    : "text-black"
                }`}
              >
                Dashboard
              </Button>
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">
              <Button
                component={Link}
                to="/curriculum"
                className={`flex items-center ${
                  location.pathname === "/curriculum"
                    ? "text-primary font-bold"
                    : "text-black"
                }`}
              >
                Curriculum
              </Button>
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">
              <Button
                component={Link}
                to="/assessment"
                className={`flex items-center ${
                  location.pathname === "/assessment"
                    ? "text-primary font-bold"
                    : "text-black"
                }`}
              >
                Assessment
              </Button>
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">
              <Button
                component={Link}
                to="/attainment"
                className={`flex items-center ${
                  location.pathname === "/attainment"
                    ? "text-primary font-bold"
                    : "text-black"
                }`}
              >
                Attainment
              </Button>
            </Typography>
          </Grid>
        </>
      )}
    </Grid>
  );

  return (
    <Card sx={{ padding: "1rem", position: "sticky", top: 0, zIndex: 20 }}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography
            variant="h6"
            component="a"
            className="cursor-pointer py-1.5 text-lg font-bold text-cyan-800"
            onClick={() => {
              navigate("/");
            }}
          >
            Curricator
          </Typography>
        </Grid>
        <Grid item>
          <Grid container alignItems="center" spacing={2}>
            <Grid item>{navList}</Grid>
            <Grid item>
              <ProfileMenu />
            </Grid>
            <Grid item>
              <IconButton
                sx={{
                  ml: "auto",
                  width: "auto",
                  height: "auto",
                  "&:hover": { bgcolor: "transparent" },
                  "&:focus": { bgcolor: "transparent" },
                  "&:active": { bgcolor: "transparent" },
                }}
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
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {openNav && <Grid item>{navList}</Grid>}
    </Card>
  );
}

export default StickyNavbar;
