import React, { useState, useEffect, useCallback } from 'react';
import {
  MaterialReactTable,
  type MaterialReactTableProps,
  type MRT_ColumnDef,
} from 'material-react-table';
import ExportToCsv from '../../components/common/ExportToCsv';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateNewEntityButton from '../../components/common/CreateNewRow';

// Define the ManageCIA type for the Manage CIA table
type ManageCIA = {
  SlNo: number;
  Section: string;
  Code: string;
  CourseTitle: string;
  Mode: string;
  CourseType: string;
  Instructor: string;
  Status: string;
};

// Sample data for the Manage CIA table
const data: ManageCIA[] = [
  {
    SlNo: 1,
    Section: 'A',
    Code: 'CSE101',
    CourseTitle: 'Introduction to Computer Science',
    Mode: 'Online',
    CourseType: 'Core',
    Instructor: 'John Doe',
    Status: 'Initiated',
  },
  {
    SlNo: 2,
    Section: 'B',
    Code: 'ECE201',
    CourseTitle: 'Digital Electronics',
    Mode: 'In-Person',
    CourseType: 'Core',
    Instructor: 'Alice Smith',
    Status: 'Pending',
  },
  // Add more sample data here
];

const ManageCIA = () => {
  const departmentOptions = ['CSE', 'Applied Sciences']; // Add department options
  const programOptions = ['B.Tech in CSE', 'B.Tech in App Sciences']; // Add program options
  const curriculumOptions = ['2014-2015', '2015-2016', '2016-2017']; // Add curriculum options
  const termOptions = ['Semester 1', 'Semester 2']; // Add term options


  const columns: MRT_ColumnDef<ManageCIA>[] = [
    {
      accessorKey: 'SlNo',
      header: 'Sl. No',
      size: 50,
    },
    {
      accessorKey: 'Section',
      header: 'Section',
      size: 100,
    },
    {
      accessorKey: 'Code',
      header: 'Code',
      size: 100,
    },
    {
      accessorKey: 'CourseTitle',
      header: 'CourseTitle',
      size: 200,
    },
    {
      accessorKey: 'Mode',
      header: 'Mode',
      size: 100,
    },
    {
      accessorKey: 'CourseType',
      header: 'CourseType',
      size: 100,
    },
    {
      accessorKey: 'Instructor',
      header: 'Instructor',
      size: 150,
    },
    {
      accessorKey: 'Status',
      header: 'Status',
      size: 150,
    },
  ];

  const [tableData, setTableData] = useState<ManageCIA[]>(() => data);
  const [newRow, setNewRow] = useState<ManageCIA | null>(null);

  const handleDeleteRow = useCallback(
    (row: ManageCIA) => {
      if (
        window.confirm(`Are you sure you want to delete row with Sl. No ${row.SlNo}?`)
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

  useEffect(() => {
    // When the department changes, reset the lower-priority dropdowns
    setSelectedProgram(null);
    setSelectedCurriculum(null);
    setSelectedTerm(null);

  }, [selectedDepartment]);

  useEffect(() => {
    // When the program changes, reset the lower-priority dropdowns
    setSelectedCurriculum(null);
    setSelectedTerm(null);

  }, [selectedProgram]);

  useEffect(() => {
    // When the curriculum changes, reset the lower-priority dropdowns
    setSelectedTerm(null);

  }, [selectedCurriculum]);


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


  return (
    <div>
      <h1 className="text-3xl">Manage CIA</h1>
      <div className="flex gap-5 mb-3">
        <label className="mr-2">Select Department:</label>
        <select
          onChange={handleDepartmentChange}
          value={selectedDepartment || ''}
        >
          <option value="" className='px-2'>Select Department</option>
          {departmentOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <label className="mr-2">Select Program:</label>
        <select
          onChange={handleProgramChange}
          value={selectedProgram || ''}
        >
          <option value="">Select Program</option>
          {programOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <label className="mr-2">Select Curriculum:</label>
        <select
          onChange={handleCurriculumChange}
          value={selectedCurriculum || ''}
        >
          <option value="">Select Curriculum</option>
          {curriculumOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <label className="mr-2">Select Term:</label>
        <select
          onChange={handleTermChange}
          value={selectedTerm || ''}
        >
          <option value="">Select Term</option>
          {termOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
          </select>
      </div>
      <MaterialReactTable
        columns={columns}
        data={tableData}
        editingMode="modal"
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
              onClick={() => handleDeleteRow(row.original as ManageCIA)}
              color='error'
            />
          </div>
        )}
      />
      <CreateNewEntityButton
        attributes={{
          SlNo: 'Sl. No',
          Section: 'Section',
          Code: 'Code',
          CourseTitle: 'CourseTitle',
          Mode: 'Mode',
          CourseType: 'CourseType',
          Instructor: 'Instructor',
          Status: 'Status',
        }}
        onSubmit={(newData) => {
          // Handle adding a new row with newData
          // You should implement this logic in the ManageCIA component
          // Example:
          setTableData((prevData) => [
            ...prevData,
            {
              SlNo: prevData.length + 1, // Assign a unique Sl No for the new row
              Section: newData.Section,
              Code: newData.Code,
              CourseTitle: newData.CourseTitle,
              Mode: newData.Mode,
              CourseType: newData.CourseType,
              Instructor: newData.Instructor,
              Status: newData.Status,
            },
          ]);
        }}
      />
      <ExportToCsv data={data} type="data" /> {/* Export All Data */}
    </div>
  );
};

export default ManageCIA;
