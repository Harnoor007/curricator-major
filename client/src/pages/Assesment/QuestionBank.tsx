import React, { useMemo, useState, useEffect, useCallback } from 'react';
import {
  MaterialReactTable,
  type MaterialReactTableProps,
  type MRT_ColumnDef,
} from 'material-react-table';
import ExportToCsv from '../../components/common/ExportToCsv';
// import { Delete, Edit } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateNewEntityButton from '../../components/common/CreateNewRow';
import { Select, Option } from '@material-tailwind/react';

// Define the Question type for the Question Bank table
type Question = {
  SlNo: number;
  Question: string;
  Topic: string;
  CourseOutcome: string;
  BloomLevel: string;
  DifficultyLevel: string;
  QuestionType: string;
};

// Sample data for the Question Bank table
const data: Question[] = [
  {
    SlNo: 1,
    Question: 'Sample Question 1',
    Topic: 'Sample Topic 1',
    CourseOutcome: 'CO001',
    BloomLevel: 'Analysis',
    DifficultyLevel: 'Medium',
    QuestionType: 'Multiple Choice',
  },
  {
    SlNo: 2,
    Question: 'Sample Question 2',
    Topic: 'Sample Topic 2',
    CourseOutcome: 'CO002',
    BloomLevel: 'Application',
    DifficultyLevel: 'Hard',
    QuestionType: 'Essay',
  },
  // Add more sample questions here
];

const QuestionBank = () => {
  const departmentOptions = ['CSE', 'Applied Sciences']; // Add department options
  const programOptions = ['B.Tech in CSE', 'B.Tech in App Sciences']; // Add program options
  const curriculumOptions = ['2014-2015', '2015-2016', '2016-2017']; // Add curriculum options
  const termOptions = ['Semester 1', 'Semester 2']; // Add term options
  const courseOptions = ['Physics', 'Electrical Engineering', 'Mathematics']; // Add course options

  const columns: MRT_ColumnDef<Question>[] = [
    {
      accessorKey: 'SlNo',
      header: 'Sl. No',
      size: 50,
    },
    {
      accessorKey: 'Question',
      header: 'Question',
      size: 200,
    },
    {
      accessorKey: 'Topic',
      header: 'Topic',
      size: 150,
    },
    {
      accessorKey: 'CourseOutcome',
      header: 'Course Outcome (CO)',
      size: 150,
    },
    {
      accessorKey: 'BloomLevel',
      header: "Bloom's Level",
      size: 150,
    },
    {
      accessorKey: 'DifficultyLevel',
      header: 'Difficulty Level',
      size: 150,
    },
    {
      accessorKey: 'QuestionType',
      header: 'Question Type',
      size: 150,
    },
  ];

  const [tableData, setTableData] = useState<Question[]>(() => data);
  const [newRow, setNewRow] = useState<Question | null>(null);




  const handleDeleteRow = useCallback(
    (row: Question) => {
      if (
        window.confirm(`Are you sure you want to delete question ${row.SlNo}?`)
      ) {
        // Filter out the deleted row
        setTableData((prevData) => prevData.filter((data) => data.SlNo !== row.SlNo));
      }
    },
    []
  );




  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null
  );
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
  const [selectedCurriculum, setSelectedCurriculum] = useState<string | null>(
    null
  );
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  useEffect(() => {
    // When the department changes, reset the lower-priority dropdowns
    setSelectedProgram(null);
    setSelectedCurriculum(null);
    setSelectedTerm(null);
    setSelectedCourse(null);
  }, [selectedDepartment]);

  useEffect(() => {
    // When the program changes, reset the lower-priority dropdowns
    setSelectedCurriculum(null);
    setSelectedTerm(null);
    setSelectedCourse(null);
  }, [selectedProgram]);

  useEffect(() => {
    // When the curriculum changes, reset the lower-priority dropdowns
    setSelectedTerm(null);
    setSelectedCourse(null);
  }, [selectedCurriculum]);

  useEffect(() => {
    // When the term changes, reset the course dropdown
    setSelectedCourse(null);
  }, [selectedTerm]);



  const handleDepartmentChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedDepartment(event.target.value);
  };

  const handleProgramChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedProgram(event.target.value);
  };

  const handleCurriculumChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCurriculum(event.target.value);
  };

  const handleTermChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTerm(event.target.value);
  };

  const handleCourseChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCourse(event.target.value);
  };

  function handleAddRow(newData: Record<string, string>): void {
    throw new Error('Function not implemented.');
  }

  return (

    <div>
      <h1 className="text-3xl font-bold my-4">Question Bank</h1>
      <div className="flex flex-col mb-3">
        <div className='flex flex-row gap-7 w-max'>
        <label className="mr-2">Select Department:</label>
        <Select
          onChange={()=>handleDepartmentChange}
          value={selectedDepartment || ''}
        >
          <Option value="" className='px-2'>Select Department</Option>
          {departmentOptions.map((option) => (
            <Option key={option} value={option}>
              {option}
            </Option>
          ))}
        </Select>
        <label className="mr-2">Select Program:</label>
        <Select

          onChange={()=>handleProgramChange}
          value={selectedProgram || ''}
        >
          <Option value="">Select Program</Option>
          {programOptions.map((option) => (
            <Option key={option} value={option}>
              {option}
            </Option>
          ))}
        </Select>
        <label className="mr-2">Select Curriculum:</label>
        <Select
          onChange={()=>handleCurriculumChange}
          value={selectedCurriculum || ''}
        >
          <Option value="">Select Curriculum</Option>
          {curriculumOptions.map((option) => (
            <Option key={option} value={option}>
              {option}
            </Option>
          ))}
        </Select>
        </div>
        <div className='flex flex-row gap-7 my-2 w-max'>
        <label className="mr-2">Select Term:</label>
        <Select
          onChange={()=>handleTermChange}
          value={selectedTerm || ''}
        >
          <Option value="">Select Term</Option>
          {termOptions.map((option) => (
            <Option key={option} value={option}>
              {option}
            </Option>
          ))}
        </Select>
        <label className="mr-2">Select Course:</label>
        <Select
          onChange={()=>handleCourseChange}
          value={selectedCourse || ''}
        >
          <Option value="">Select Course</Option>
          {courseOptions.map((option) => (
            <Option key={option} value={option}>
              {option}
            </Option>
          ))}
        </Select>
        </div>
      </div>
      <div className='flex flex-row justify-between mb-3'>
      <CreateNewEntityButton
        attributes={{
          SlNo: 'SlNo',
          Question: 'Question',
          Topic: 'Topic',
          CourseOutcome: 'CourseOutcome',
          BloomLevel: "Bloom's Level",
          DifficultyLevel: 'Difficulty Level',
          QuestionType: 'Question Type',
        }}
        onSubmit={(newData) => {
          // Handle adding a new row with newData
          // You should implement this logic in the QuestionBank component
          // Example:
          setTableData((prevData) => [
            ...prevData,
            {
              SlNo: prevData.length + 1, // Assign a unique SlNo for the new question
              Question: newData.Question,
              Topic: newData.Topic,
              CourseOutcome: newData.CourseOutcome,
              BloomLevel: newData.BloomLevel,
              DifficultyLevel: newData.DifficultyLevel,
              QuestionType: newData.QuestionType,
            },
          ]);

        }}
      />

      <ExportToCsv data={data} type="data" /> {/* Export All Data */}

      </div>
      <MaterialReactTable
  columns={columns}
  data={tableData}
  editingMode="modal"
  // editingModalWidth="600px" 
  enableRowActions
  renderRowActions={({ row, table }) => (
    <div>
      <EditIcon
        className='mr-4 primary'
        onClick={() => {
          table.setEditingRow(row);
        }}
        color='success'
      />
      <DeleteIcon
        onClick={() => handleDeleteRow(row.original as Question)}
        color='error'
      />
    </div>
  )}
  
/>
        
    </div>
  );
};

export default QuestionBank;
