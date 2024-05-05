// app.js
const express = require("express");
const app = express();
const cors = require("cors");
const organizationRoutes = require("./routes/organization"); // Import organizationRoutes
const departmentRoutes = require("./routes/department");
const programRoutes = require("./routes/program");
const curriculumRoutes = require("./routes/curriculum");
const program_outcomesRoutes = require("./routes/program_outcomes") 
const courseRoutes = require("./routes/course")
const coRoutes = require("./routes/course_outcome")
const copoRoutes = require("./routes/copomapping")
const authRoutes = require("./routes/auth")
app.use(cors());
app.use(express.json());

// Routes
app.use("/organization", organizationRoutes);
app.use("/department", departmentRoutes);
app.use("/program", programRoutes);
app.use("/curriculum", curriculumRoutes);
app.use("/program_outcomes", program_outcomesRoutes);
app.use("/course", courseRoutes);
app.use("/course_outcome", coRoutes);
app.use("/copomapping", copoRoutes);
app.use("/auth", authRoutes);

app.listen(5000, () => {
    console.log("Server started at http://localhost:5000");
});
