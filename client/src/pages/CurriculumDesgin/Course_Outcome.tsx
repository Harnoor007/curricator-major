import React, { useState, useCallback, useEffect } from "react";
import {
  MaterialReactTable,
  type MaterialReactTableProps,
  type MRT_ColumnDef,
} from "material-react-table";
import ExportToCsv from "../../components/common/ExportToCsv";
import CreateNewEntityButton from "../../components/common/CreateNewRow";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

// Define the CourseOutcome type for the Course Outcome table

// Define the CourseOutcome type for the Course Outcome table
type CourseOutcome = {
  _id: any;
  courseId: string;
  CO_Code: string;
  Course_Outcome: string;
  bloomsLevel: string;
  Delivery_Methods: string;
  content: string;
};

const API_BASE_URL = 'http://localhost:5000';

const CourseOutcomes = () => {
  const [tableData, setTableData] = useState<CourseOutcome[]>([]);

  // Fetch data from the backend when the component mounts
  useEffect(() => {
    fetchCourseOutcomes();
  }, []);

  // Function to fetch course outcomes from the backend
  const fetchCourseOutcomes = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/course_outcome/all-course-outcomes`
      );
      const outcomesWithCodes = await Promise.all(
        response.data.map(async (outcome: CourseOutcome) => {
          const courseDetails = await fetchCourseDetails(outcome.courseId);
          return { ...outcome, courseCode: courseDetails.code };
        })
      );
      setTableData(outcomesWithCodes);
    } catch (error) {
      console.error("Error fetching course outcomes:", error);
    }
  };

  const fetchCourseDetails = async (courseId: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/course/all-courses`);
      const course = response.data.find((c: any) => c._id === courseId);
      return course;
    } catch (error) {
      console.error("Error fetching course details:", error);
      throw error;
    }
  };

  // Function to handle adding a new row (CO)
  const handleAddRow = async (newData: CourseOutcome) => {
    try {
      console.log(newData);
      const response = await axios.post(
        `${API_BASE_URL}/course_outcome/new-course-outcome`,
        newData
      );
      setTableData((prevData) => [...prevData, response.data]);
      fetchCourseOutcomes();
    } catch (error) {
      console.error("Error adding new course outcome:", error);
    }
  };

  // Function to handle deleting a row (CO)
  // Function to handle deleting a row (CO)
  const handleDeleteRow = async (originalRow: CourseOutcome) => {
    try {
      await axios.delete(`${API_BASE_URL}/course_outcome/${originalRow._id}`);
      setTableData((prevData) =>
        prevData.filter((row) => row._id !== originalRow._id)
      );
    } catch (error) {
      console.error("Error deleting course outcome:", error);
    }
  };

  const columns: MRT_ColumnDef<CourseOutcome>[] = [
    {
      accessorKey: "CO_Code",
      header: "CO Code",
      size: 150,
    },
    {
      accessorKey: "Course_Outcome",
      header: "Course Outcome (CO)",
      size: 200,
    },
    {
      accessorKey: "Bloom_Level",
      header: "Bloom's Level",
      size: 150,
    },
    {
      accessorKey: "Delivery_Methods",
      header: "Delivery Methods",
      size: 200,
    },
  ];

  return (
    <div className="container mx-auto px-5 max-w-[67rem]">
      <legend className="text-3xl py-7">Course Outcome List</legend>
      <div className="flex flex-row justify-between mb-3">
        <CreateNewEntityButton
          attributes={{
            courseId: "CO Code",
            content: "Course Outcome (CO)",
            bloomsLevel: "Bloom's Level",
          }}
          onSubmit={(newData: Record<string, string>) => {
            handleAddRow({
              _id: "", // Placeholder for the _id field
              courseId: newData.courseId,
              content: newData.content,
              bloomsLevel: newData.bloomsLevel,
              CO_Code: "",
              Course_Outcome: "",
              Delivery_Methods: ""
            });
          }}
        />
        <ExportToCsv data={tableData} type="data" />
      </div>
      <MaterialReactTable
        columns={columns}
        data={tableData}
        // editingMode="modal" 
        enableEditing
        enableRowActions
        renderRowActions={({ row, table }) => (
          <div>
            <EditIcon
              className="mr-4 primary"
              onClick={() => {
                table.setEditingRow(row);
              }}
              color="success"
            />
            <DeleteIcon
              onClick={() => handleDeleteRow(row.original as CourseOutcome)}
              color="error"
            />
          </div>
        )}
      />
    </div>
  );
};


export default CourseOutcomes;
