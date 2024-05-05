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

type CopoMapping = {
  coId: string;
  poId: string;
};

const API_BASE_URL = 'http://localhost:5000';

const CopoMapping = () => {
  const [tableData, setTableData] = useState<CopoMapping[]>([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/copomapping/all-copomappings`);
      setTableData(response.data);
    } catch (error) {
      console.error('Error fetching copo mappings:', error);
    }
  };  

  useEffect(() => {
    fetchData();
  }, []); 

  const handleDeleteRow = useCallback(async (row: any) => {
    const { coId, poId } = row.original;
    if (window.confirm(`Are you sure you want to delete copo mapping with coId ${coId} and poId ${poId}?`)) {
      try {
        await axios.delete(`${API_BASE_URL}/copomapping/delete/${coId}/${poId}`);
        // Update table data after successful delete
        setTableData((prevData) =>
          prevData.filter((data) => data.coId !== coId || data.poId !== poId)
        );
      } catch (error) {
        console.error('Error deleting copo mapping:', error);
      }
    }
  }, [setTableData]); // Add setTableData to dependencies array 
  

  const handleAddRow = async (newData: CopoMapping) => {
    try {
        console.log(newData)
        const response = await axios.post(`${API_BASE_URL}/copomapping/new-copomapping`, newData);
      setTableData((prevData) => [...prevData, response.data]);
    } catch (error) {
      console.error('Error adding copo mapping:', error);
    }
  };

  const columns: MRT_ColumnDef<CopoMapping>[] = [
    {
      accessorKey: "coId",
      header: "CO ID",
      size: 100,
    },
    {
      accessorKey: "poId",
      header: "PO ID",
      size: 100,
    },
  ];

  return (
    <div className="container mx-auto px-5 max-w-[67rem]">
      <legend className="text-3xl py-7">COPO Mapping</legend>
      <div className="flex flex-row justify-between mb-3">
        <CreateNewEntityButton
          attributes={{
            coId: "CO ID",
            poId: "PO ID",
          }}
          onSubmit={(newData: Record<string, string>) =>
            handleAddRow({
              coId: newData.coId,
              poId: newData.poId,
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
              onClick={() => handleDeleteRow(row)}
              color="error"
            />
          </div>
        )}
      />
    </div>
  );
};

export default CopoMapping;
