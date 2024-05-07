import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export type DepartmentData = {
  _id: string;
  name: string;
  vision: string;
  mission: string;
  organization: string;
  head: string;
};

export type CurriculumData = {
  _id: string,
  name: string;
  programId: string;
  departmentId: string;
  from: string;
  to: string;
  viewdetails: string;
  programName: string;
  departmentName: string;
};

export type ProgramData = {
  _id: string;
  name: string;
  owner: string;
  description: string;
  department: string;
};

export type HomeCardData = {
  id: number,
  icon: OverridableComponent<SvgIconTypeMap<{},"svg">> & {
    muiName: string;
  };
  title: string;
  path: string;
}