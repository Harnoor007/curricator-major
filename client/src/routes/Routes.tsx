import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import Attainment from "../pages/Attainment/AttainmentPage";
import Assesment from "../pages/Assesment/AssesmentPage";
import CurriculumPage from "../pages/CurriculumDesgin/CurriculumPage";
import CourseList from "../pages/CurriculumDesgin/Course";
import Program_Outcomes from "../pages/CurriculumDesgin/Program_Outcomes";
import Curriculum from "../pages/CurriculumDesgin/Curriculum";
import Department from "../pages/CurriculumDesgin/Department";
import CourseOutcomes from "../pages/CurriculumDesgin/Course_Outcome";
import CopoMapping from "../pages/CurriculumDesgin/copomapping";
import QuestionBank from "../pages/Assesment/QuestionBank";
import ExtraCurricular from "../pages/Assesment/ExtraCurricular";
import ManageCIA from "../pages/Assesment/ManageCIA";
// import { ThemeProvider } from "@material-tailwind/react";
import CoAttainment from "../pages/Attainment/CoAttainment";
import Profile from "../components/Profile/Profile";
import Organization from "../pages/CurriculumDesgin/Organization";
import Program from "../pages/CurriculumDesgin/Program";
import Login from "../pages/Authentication/Login";
import App from "../App.tsx";

const Root: React.FC = () => (
  <Router>
    <Routes>
          <Route path="/" element={<App />}></Route>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<AdminDashboard />} />
      <Route path="/curriculum" element={<CurriculumPage />}>
        <Route index element={<Curriculum />} />
        <Route path="course" element={<CourseList />} />
        <Route path="program_outcomes" element={<Program_Outcomes />} />
        <Route path="copomapping" element={<CopoMapping />} />
        <Route path="design" element={<Curriculum />} />
        <Route path="department" element={<Department />} />
        <Route path="course_outcomes" element={<CourseOutcomes />} />
        <Route
          path="organization"
          element={<Organization organizationName="GNDEC" />}
        />
        <Route path="program" element={<Program />} />
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

export default Root;
