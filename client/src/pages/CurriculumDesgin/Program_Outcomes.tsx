import React, { useCallback, useState, useEffect } from "react";
import {
  MaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import ExportToCsv from "../../components/common/ExportToCsv";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateNewEntityButton from "../../components/common/CreateNewRow";
import axios from 'axios'; 

type ProgramOutcome = {
  _id?: string;
  programId: string;
  Program_Outcomes: string;
  PO_type: string;
  programName?: string;
};

const API_BASE_URL = 'http://localhost:5000';

const Program_Outcomes = () => {
  const [tableData, setTableData] = useState<ProgramOutcome[]>([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/program_outcomes/all-pos`);
      const dataWithProgramNames = await Promise.all(response.data.map(async (item: ProgramOutcome) => {
        // Fetch program name for each programId
        const programResponse = await axios.get(`${API_BASE_URL}/program/all-programs`);
        // Find the program with matching programId and get its name
        const program = programResponse.data.data.find((program: any) => program._id === item.programId);
        if (program) {
          return { ...item, programName: program.name };
        } else {
          console.error('Program not found for ID:', item.programId);
          return { ...item, programName: 'Unknown' };
        }
      }));
      setTableData(dataWithProgramNames);
    } catch (error) {
      console.error('Error fetching Program Outcomes:', error);
    }
  };  

  useEffect(() => {
    fetchData();
  }, []); 

  const handleDeleteRow = async (row: any) => {
    try {
      const poId = row.original.id; 
      console.log(poId)
      await axios.delete(`${API_BASE_URL}/program_outcomes/delete-po/${poId}`);
      setTableData(prevData => prevData.filter(item => item._id !== poId));
    } catch (error) {
      console.error('Error deleting Program Outcome:', error);
    }
  };  

  const handleAddRow = async (newData: ProgramOutcome) => {
    try {
      // Send a POST request to your backend API to add a new Program Outcome
      console.log(newData)
      const response = await axios.post(`${API_BASE_URL}/program_outcomes/new-po`, newData);
      // Add the newly created Program Outcome to the table data
      setTableData((prevData) => [...prevData, response.data]);
      // Refresh the data
      fetchData();
    } catch (error) {
      console.error('Error adding Program Outcome:', error);
    }
  };  

  const columns: MRT_ColumnDef<ProgramOutcome>[] = [
    {
      accessorKey: "programName",
      header: "Program",
      size: 150,
    },
    { 
      accessorKey: "Program_Outcomes",
      header: "Program Outcomes",
      size: 150,
    },
    {
      accessorKey: "PO_type",
      header: "PO Type",
      size: 200,
    },
  ];  

  return (
    <div className="container mx-auto px-5 max-w-[67rem]">
      <legend className="text-3xl py-7">
        Program Outcome List
      </legend>
      <div className="flex flex-row justify-between mb-3">
      <CreateNewEntityButton
        attributes={{
          programId: "Program Name",
          Program_Outcomes: "Program Outcomes",
          PO_type: "PO Type",
        }}
        onSubmit={(newData: Record<string, string>) =>
          handleAddRow({
            programId: newData.programId,
            Program_Outcomes: newData.Program_Outcomes,
            PO_type: newData.PO_type,
          })
        }
      />
      <ExportToCsv data={tableData} type="data" /> {/* Export All Data */}
      </div>

      <MaterialReactTable
        columns={columns}
        data={tableData}
        enableEditing
        enableRowActions
        renderRowActions={({ row }) => (
          <div>
            {/* <EditIcon
              className="mr-4 primary"
              onClick={() => {
              
              }}
              color="success"
            /> */}
            <DeleteIcon
              onClick={() => handleDeleteRow(row)}
              color="error"
            />
          </div>
        )}
      />

    </div>
  );
};

export default Program_Outcomes;
