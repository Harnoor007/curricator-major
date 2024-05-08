import React, { useCallback, useEffect, useState } from "react";
import { Button, Modal, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateNewEntityButton from "../../components/common/CreateNewRow";
import ExportToCsv from "../../components/common/ExportToCsv";
import {
  getAllDepartments,
  addDepartment,
  deleteDepartment,
} from "../../utils/db";
import { DepartmentData } from '../../types/types' 
import { MRT_ColumnDef } from "material-react-table";
import { MaterialReactTable } from "material-react-table";

const Department = () => {
  const [selectedData, setSelectedData] = useState<DepartmentData[]>([]);
  const [tableData, setTableData] = useState<DepartmentData[]>([]);
  const [rerender, setRerender] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState<DepartmentData | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({
    name: "",
    vision: "",
    mission: "",
    year:"",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const departments = await getAllDepartments();
        setSelectedData(departments.data);
        setTableData(departments.data);
      } catch (error:any) {
        console.error('Error fetching departments:', error.message);
      }
    };

    fetchData();
  }, [rerender]);

  const handleDeleteRow = useCallback(async (row: DepartmentData) => {
    try {
      if (window.confirm(`Are you sure you want to delete department ${row.name}?`)) {
        await deleteDepartment(row.name);
        setTableData((prevData) =>
          prevData.filter((data) => data.name !== row.name)
        );
      }
    } catch (error:any) {
      console.error('Error deleting department:', error.message);
    }
  }, []);

  const handleAddDepartment = async (newData: Record<string, string>) => {
    try {
      const addedDepartment = await addDepartment(newData as unknown as DepartmentData);
      setRerender((prev) => !prev);
    } catch (error:any) {
      console.error('Error adding department:', error.message);
    }
  };

  const columns: MRT_ColumnDef<DepartmentData>[] = [
    { accessorKey: "name", header: "Name", size: 50 },
    { accessorKey: "vision", header: "Vision", size: 200 },
    { accessorKey: "mission", header: "Mission", size: 200 },
    { accessorKey: "year", header: "Year", size: 50 },
  ];   

  return (
    <div className="container mx-auto px-5 max-w-fit">
      <fieldset>
        <legend className="text-3xl py-7">Departments</legend>

        <div className="flex flex-row justify-between mb-3">
        <CreateNewEntityButton 
  attributes={{
    name: 'Department Name',
    vision: 'Department Vision',
    mission: 'Department mission',
    year: 'Year',
  }}
  useDatePicker={{
    year: true, // Use DatePicker for the 'year' attribute
  }}
  onSubmit={handleAddDepartment}
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
              <DeleteIcon onClick={() => handleDeleteRow(row.original)} color='error' />
            </div>
          )}
        />
      </fieldset>
    </div>
  );
};

export default Department;
