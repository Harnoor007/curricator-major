import React from 'react';
import { Button } from '@mui/material';
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
      {/* Import button */}
      <div className="flex flex-row">
        <Button
          onClick={type === "data" ? handleExportData : () => handleExportRows([])}
          className="flex flex-row"
          startIcon={<ArrowDropUp />}
        >
          Import
        </Button>

        {/* Export button */}
        <Button
          onClick={type === "data" ? handleExportData : () => handleExportRows([])}
          variant="outlined"
          className="flex flex-row"
          startIcon={<ArrowDropDown />}
        >
          Export
        </Button>
      </div>
    </React.Fragment>
  );
};

export default ExportToCsv;
