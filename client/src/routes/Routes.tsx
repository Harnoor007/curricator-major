import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import AdminDashboard from "../pages/Home/Home.tsx";
import Attainment from "../pages/Attainment/AttainmentPage";
import Assesment from "../pages/Assesment/AssesmentPage";
import CurriculumPage from "../pages/CurriculumDesgin/CurriculumPage.tsx";
import CourseList from "../pages/CurriculumDesgin/Course";
import Program_Outcomes from "../pages/CurriculumDesgin/Program_Outcomes";
import Curriculum from "../pages/CurriculumDesgin/Curriculum";
import Department from "../pages/CurriculumDesgin/Department.tsx";
import CourseOutcomes from "../pages/CurriculumDesgin/Course_Outcome";
import CopoMapping from "../pages/CurriculumDesgin/copomapping";
import QuestionBank from "../pages/Assesment/QuestionBank";
import ExtraCurricular from "../pages/Assesment/ExtraCurricular";
import ManageCIA from "../pages/Assesment/ManageCIA";
import CoAttainment from "../pages/Attainment/CoAttainment";
import Profile from "../components/Profile/Profile";
import Organization from "../pages/CurriculumDesgin/Organization.tsx";
import Program from "../pages/CurriculumDesgin/Program";
import Login from "../pages/Authentication/Login";
import ProtectedRoute from "../components/protectedRoute.tsx";
import Nav from "../components/Layout/Nav.tsx";
import SuperAdmin from "../pages/SuperAdmin/SuperAdmin.tsx";

const RouteComponent: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Navigate to='/home' />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<ProtectedRoute path="/home" component={AdminDashboard} />} />

      <Route path="/superadmin" element={<ProtectedRoute path="/superadmin" component={SuperAdmin} />} />
    {/* Routes for curriculumPage */}      <Route path="/curriculumPage" element={<ProtectedRoute path="/curriculumPage" component={CurriculumPage} />} >
        <Route index element={<Organization organizationName={"GNDEC"} />} />
        <Route path = "organization" element={<Organization organizationName={"GNDEC"} />} />
        <Route path="department" element={<Department />} />
      </Route>
      
      <Route path="/Assesment" element={<Assesment />}>
        <Route index element={<QuestionBank />} />
        <Route path="extraCurricular" element={<ExtraCurricular />} />
        <Route path="ManageCIA" element={<ManageCIA />} />
        <Route path="QuestionBank" element={<QuestionBank />} />
      </Route>
      <Route path="/attainment" element={<Attainment />}>
        <Route index element={<CoAttainment />} />
      </Route>
      <Route path="/profile" element={<Profile />} />
    </Routes>
  </Router>
);

export default RouteComponent;
