//TODO: change deaprtment to program

import React, { useCallback, useEffect, useState } from "react";
import {
  MaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateNewEntityButton from "../../components/common/CreateNewRow";
import ExportToCsv from "../../components/common/ExportToCsv";
import { getAllDepartments, deleteProgram, addProgram, getAllPrograms } from "../../utils/db";
import { ProgramData, DepartmentData } from '../../types/types';

const Program = () => {
  const [selectedData, setSelectedData] = useState<ProgramData[]>([]);
  const [tableData, setTableData] = useState<ProgramData[]>([]);
  const [departmentData, setDepartmentData] = useState<DepartmentData[]>([]);
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const departmentsResponse = await getAllDepartments();
        const departments = departmentsResponse.data;
        setDepartmentData(departments);

        const programs = await getAllPrograms();
        console.log(programs)
        setSelectedData(programs.data);
        setTableData(programs.data);
      } catch (error:any) {
        console.error('Error fetching programs:', error.message);
      }
    };

    fetchData();
  }, [rerender]);

  const handleDeleteRow = useCallback(async (row: ProgramData) => {
    try {
      if (window.confirm(`Are you sure you want to delete program ${row.name}?`)) {
        await deleteProgram(row.name);
        setTableData((prevData) =>
          prevData.filter((data) => data._id !== row._id)
        );
      }
    } catch (error:any) {
      console.error('Error deleting Program:', error.message);
    }
  }, []);

  const handleAddProgram = async (newData: Record<string, string>) => {
    try {
      const addedProgram = await addProgram(newData as unknown as ProgramData);
      setTableData((prevData) => [...prevData, addedProgram]);
      setRerender((prev) => !prev);
    } catch (error:any) {
      console.error('Error adding program:', error.message);
    }
  };

  const columns: MRT_ColumnDef<ProgramData>[] = [
    { accessorKey: "name", header: "Name", size: 200 },
    { accessorKey: "owner", header: "Owner", size: 200 },
    { accessorKey: "description", header: "Description", size: 400 },
    { accessorKey: "department", header: "Department", size: 100 },

  ];

  return (
    <div className="container mx-auto px-5 max-w-fit">
      <fieldset>
        <legend className="text-3xl py-7">Programs</legend>

        <div className="flex flex-row justify-between mb-3">
          <CreateNewEntityButton
            attributes={{
              name: 'Program Name',
              owner: 'Owner',
              description : 'Description',
              department: 'Department',
            }}
            onSubmit={handleAddProgram}
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
              {/* <EditIcon onClick={() => console.log('Edit clicked')} color='success' /> */}
              <DeleteIcon onClick={() => handleDeleteRow(row.original)} color='error' />
            </div>
          )}
        />
      </fieldset>
    </div>
  );
};

export default Program;