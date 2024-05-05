import React, { useEffect, useState } from 'react';
import { 
  MaterialReactTable,
  MRT_ColumnDef,
} from 'material-react-table';
import ExportToCsv from "../../common/ExportToCsv";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateNewEntityButton from "../../common/buttontest";
import { getAllDepartments, getAllCurriculums, addCurriculum, deleteCurriculum, getAllPrograms  } from '../../services/db';
import { DepartmentData, CurriculumData } from '../../types/types';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

const Curriculum = () => {
  const [tableData, setTableData] = useState<CurriculumData[]>([]);
  const [departmentData, setDepartmentData] = useState<DepartmentData[]>([]);
  const [programData, setProgramData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try { 
        const departmentsResponse = await getAllDepartments();
        const departments = departmentsResponse.data;
        setDepartmentData(departments);
        
        const programsResponse = await getAllPrograms();
        const programs = programsResponse.data;
        setProgramData(programs);
    
        const curriculumsResponse = await getAllCurriculums(); 
        const curriculums = curriculumsResponse.data;
    
        const updatedCurriculums = curriculums.map((curriculum: CurriculumData) => {
          const program = programs.find((program: any) => program._id === curriculum.programId);
          const department = departments.find((department: DepartmentData) => department._id === curriculum.departmentId);
          
          return {
            ...curriculum,
            programName: program ? program.name : "Unknown Program",
            departmentName: department ? department.name : "Unknown Department",
            from: new Date(curriculum.from).toLocaleDateString('en-GB'), 
            to: new Date(curriculum.to).toLocaleDateString('en-GB'), 
          };
        });        
        setTableData(updatedCurriculums); 
        console.log("Updated tableData:", updatedCurriculums);
      } catch (error: any) {
        console.error('Error fetching departments, programs, or curriculums:', error.message);
      }
    };        
  
    fetchData();
  }, []); 

  const handleSubmit = async (newData: Record<string, string>) => {
    try {
      const { curriculum, program, Department, From, To } = newData;
  
      const selectedDepartment = departmentData.find(
        (department) => department.name === Department
      );
  
      if (!selectedDepartment) {
        throw new Error('Selected department does not exist');
      }
  
      // Fetch program details by name
      const programResponse = await axios.get(`${API_BASE_URL}/program/get-program/${program}`);
      const selectedProgram = programResponse.data.data;
      console.log(selectedProgram)
      if (!selectedProgram) {
        throw new Error('Selected program does not exist');
      }
  
      const payload = {
        name: curriculum,
        departmentId: selectedDepartment._id,
        programId: selectedProgram._id,
        from: new Date(From),
        to: new Date(To),     
      };
      // console.log(payload)
      const response = await addCurriculum(payload);

      setTableData((prevData) => [...prevData, {
        ...response.data,
        programName: selectedProgram.name,
        departmentName: selectedDepartment.name,
        from: new Date(response.data.from).toLocaleDateString('en-GB'), 
        to: new Date(response.data.to).toLocaleDateString('en-GB'),
      }]);

      console.log('Curriculum added successfully:', response.data);
    } catch (error: any) {
      console.error('Error adding curriculum:', error.message);
    }
  };  
  
  const handleDelete = async (id: string) => {
    try {
      // Convert the string id to a number
      const index = parseInt(id, 10);
      // Check if the index is valid
      if (isNaN(index) || index < 0 || index >= tableData.length) {
        throw new Error('Invalid curriculum index');
      }
  
      // Find the curriculum with the given ID
      const curriculumToDelete = tableData[index];
      if (!curriculumToDelete) {
        throw new Error('Curriculum not found');
      }
      
      // Delete the curriculum using its _id
      await deleteCurriculum(curriculumToDelete._id);
      
      // Update the tableData state by filtering out the deleted curriculum
      setTableData(prevData => prevData.filter(curriculum => curriculum._id !== curriculumToDelete._id));
      console.log('Curriculum deleted successfully');
    } catch (error: any) {
      console.error('Error deleting curriculum:', error.message);
    }
  };   
  
  const columns: MRT_ColumnDef<CurriculumData>[] = [
    {
      accessorKey: "name",
      header: "Curriculum",
      size: 150,
      enableEditing: true,
    },
    {
      accessorKey: "programName",
      header: "Program",
      size: 150,
      enableEditing: true,
    },
    {
      accessorKey: "departmentName",
      header: "Department",
      size: 200,
      enableEditing: true,
    },
    {
      accessorKey: "from",
      header: "From",
      size: 150,
      enableEditing: true,
    },
    {
      accessorKey: "to",
      header: "To",
      size: 150,
      enableEditing: true,
    },
  ];  

  return (
    <div className="container mx-auto px-5 max-w-[67rem]">
      <legend className="text-3xl py-7">Design Curriculum</legend>
      <div className='flex flex-row justify-between mb-3'>
        <CreateNewEntityButton
          attributes={{
            curriculum: { label: 'Curriculum Name', type: 'text' },
            program: { label: 'Program ID',
                       type: 'select',
                       options: programData.map((program) => program.name),
            },
            Department: {
              label: 'Department',
              type: 'select',
              options: departmentData.map((department) => department.name),
            },
            From: { label: 'From', type: 'text' },
            To: { label: 'To', type: 'text' },
            viewdetails: { label: 'View Details', type: 'text' },
          }}
          onSubmit={handleSubmit}
        />

        <ExportToCsv data={tableData} type="data" />
      </div>

      <MaterialReactTable
        columns={columns}
        data={tableData}
        editingMode="modal"
        enableRowActions
        enableEditing
        renderRowActions={({ row }) => (
          <div>
            {/* <EditIcon
              className='mr-4 primary'
              onClick={() => {
                // Handle edit action
              }}
              color='success'
            /> */}
            <DeleteIcon
              onClick={() => handleDelete(row.id)} // Call handleDelete with curriculum id
              color='error'
            />
          </div>
        )}
      />
    </div>
  );
};

export default Curriculum;
