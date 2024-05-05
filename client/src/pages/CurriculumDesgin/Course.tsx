import React, { useState, useEffect, useCallback } from "react";
import {
  MaterialReactTable,
  MRT_ColumnDef,
} from "material-react-table";
import ExportToCsv from "../../components/common/ExportToCsv";
import CreateNewEntityButton from "../../components/common/CreateNewRow";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from 'axios'; 

type Course = {
  
  code: string;
  title: string;
  coreElective: string;
  credits: number;
  totalMarks: string;
  courseOwner: string;
  type: string;
  departmentId: string;
  hours: number;
  curriculumId: string;
  departmentName?: string;
  curriculumName?: string;
};

const API_BASE_URL = 'http://localhost:5000';

const CourseList = () => {
  const [tableData, setTableData] = useState<Course[]>([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/course/all-courses`);
      console.log(response)
      setTableData(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };  

  useEffect(() => {
    fetchData();
  }, []); 

  const handleDeleteRow = useCallback(async (row: any) => {
    const course = row.original as Course; // Access the original Course object
    if (window.confirm(`Are you sure you want to delete course ${course.code}?`)) {
      try {
        console.log(course.code);
        await axios.delete(`${API_BASE_URL}/course/delete-course/${course.code}`);
        // Remove the deleted course from the table data
        setTableData((prevData) =>
          prevData.filter((data) => data.code !== course.code)
        );
        // Refetch the data to refresh the table
        await fetchData();
      } catch (error) {
        console.error('Error deleting course:', error);
      }
    }
  }, []);   

  const handleAddRow = async (newData: Course) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/course/new-course`, newData);
      setTableData((prevData) => [...prevData, response.data]);
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  const columns: MRT_ColumnDef<Course>[] = [
    {
      accessorKey: "code",
      header: "Code",
      size: 100,
    },
    {
      accessorKey: "title",
      header: "Course Title",
      size: 200,
    },
    {
      accessorKey: "coreElective",
      header: "Core/Elective",
      size: 100,
    },
    {
      accessorKey: "credits",
      header: "Credits",
      size: 70,
    },
    {
      accessorKey: "totalMarks",
      header: "Total Marks",
      size: 100,
    },
    {
      accessorKey: "courseOwner",
      header: "Course Owner",
      size: 150,
    },
    {
      accessorKey: "type",
      header: "Type",
      size: 100,
    },
    {
      accessorKey: "departmentId",
      header: "Department",
      size: 100,
    },
    {
      accessorKey: "hours",
      header: "Hours",
      size: 100,
    },
    {
      accessorKey: "curriculumId",
      header: "Curriculum",
      size: 100,
    },
  ];

  return (
    <div className="container mx-auto px-5 max-w-[67rem]">
      <legend className="text-3xl py-7">Course List</legend>
      <div className="flex flex-row justify-between mb-3">
        <CreateNewEntityButton
          attributes={{
            code: "Code",
            title: "Course Title",
            coreElective: "Core/Elective",
            credits: "Credits",
            totalMarks: "Total Marks",
            courseOwner: "Course Owner",
            type: "Type",
            departmentId: "Department",
            hours: "Hours",
            curriculumId: "Curriculum",
          }}
          onSubmit={(newData: Record<string, string>) =>
            handleAddRow({
              code: newData.code,
              title: newData.title,
              coreElective: newData.coreElective,
              credits: parseInt(newData.credits, 10),
              totalMarks: newData.totalMarks, // Corrected property name
              courseOwner: newData.courseOwner, // Corrected property name
              type: newData.type,
              departmentId: newData.departmentId,
              hours: parseInt(newData.hours),
              curriculumId: newData.curriculumId,
            })
          }
        />
        <ExportToCsv data={tableData} type="data" />
      </div>
      <MaterialReactTable
        columns={columns}
        data={tableData}
        enableEditing
        enableRowActions
        renderRowActions={({ row }) => (
          <div>
            {/* <EditIcon
              onClick={() => {
                // Handle edit action
              }}
              color="success"
            /> */}
            <DeleteIcon
              onClick={() => {
               console.log(row)
               handleDeleteRow(row)
              }}
              color="error"
            />
          </div>
        )}
      />
    </div>
  );
};

export default CourseList;