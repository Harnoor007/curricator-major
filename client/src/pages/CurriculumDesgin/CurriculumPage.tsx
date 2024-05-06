import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import DefaultSidebar from "../../components/Layout/LeftNav";

const CurriculumPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      navigate("/login"); // Redirect to login if token is not present
    }
  }, [navigate]);

  return (
    <div className="container-fluid flex flex-row">
      <DefaultSidebar />
      <Outlet />
    </div>
  );
};

export default CurriculumPage;
