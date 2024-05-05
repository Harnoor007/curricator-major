import React from 'react';
import { Button, Typography } from '@material-tailwind/react';
import { generateCsv, download, ConfigOptions } from 'export-to-csv';
import { ArrowDropUp, ArrowDropDown } from "@mui/icons-material";

type ExportToCsvProps = {
  data: any[];
  type: string;
};

const ExportToCsv: React.FC<ExportToCsvProps> = ({ data, type }) => {
  const csvConfig: ConfigOptions = {
    fieldSeparator: ',',
    quoteStrings: true, // Set to true to enable quoting strings
    decimalSeparator: '.',
    showColumnHeaders: true,
    useBom: true,
    useKeysAsHeaders: true, // Use keys of data objects as headers
  };

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv);
  };

  const handleExportRows = (rows: any[]) => {
    const csv = generateCsv(csvConfig)(rows);
    download(csvConfig)(csv);
  };

  return (
    <React.Fragment>
      {/* import btn */}
      <div className="flex flex-row">
        <Button
          onClick={
            type === "data" ? handleExportData : () => handleExportRows([])
          }
          // variant=""
          className="flex flex-row"
        >
          <ArrowDropUp className="w-5 h-5 mr-1 my-0 " />
          Import
        </Button>

        {/* export btn */}
        <Button
          onClick={
            type === "data" ? handleExportData : () => handleExportRows([])
          }
          variant="outlined"
          className="flex flex-row"
        >
          <ArrowDropDown className="w-5 h-5 mr-1 my-0 " />
          Export
        </Button>
      </div>
    </React.Fragment>
  );
};

export default ExportToCsv;
