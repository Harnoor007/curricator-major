import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Chip,
} from "@material-tailwind/react";
import {
  Work as BriefcaseIcon,
  Extension as PuzzlePieceIcon,
  Event as CalendarDaysIcon,
  TableChart as TableCellsIcon,
  Description as DocumentIcon,
  Notes as DocumentTextIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function DefaultSidebar() {
  return (
    <div className="shadow-xl z-10">
      <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
        <div className="mb-2 p-4">
          <Typography variant="h5" color="blue-gray">
            Assessment Page
          </Typography>
        </div>
        <List>
          <Link to="/department">
            <ListItem>
              <ListItemPrefix>
                <BriefcaseIcon style={{ fontSize: 20 }} />
              </ListItemPrefix>
              Question Bank
            </ListItem>
          </Link>

          <Link to="/ExtraCurricular">
            <ListItem>
              <ListItemPrefix>
                <PuzzlePieceIcon style={{ fontSize: 20 }} />
              </ListItemPrefix>
              Extracurricular/ Co-curricular Activity
            </ListItem>
          </Link>

          <Link to="/program_outcomes">
            <ListItem>
              <ListItemPrefix>
                <CalendarDaysIcon style={{ fontSize: 20 }} />
              </ListItemPrefix>
              Manage CIA occasions
            </ListItem>
          </Link>

          <Link to="/course">
            <ListItem>
              <ListItemPrefix>
                <TableCellsIcon style={{ fontSize: 20 }} />
              </ListItemPrefix>
              Manage CIA Question Paper & Rubrics
              <ListItemSuffix>
                <Chip
                  value="14"
                  size="sm"
                  variant="ghost"
                  color="blue-gray"
                  className="rounded-full"
                />
              </ListItemSuffix>
            </ListItem>
          </Link>

          <Link to="/course_outcomes">
            <ListItem>
              <ListItemPrefix>
                <DocumentIcon style={{ fontSize: 20 }} />
              </ListItemPrefix>
              Manage ESE Model Question Paper
            </ListItem>
          </Link>

          <Link to="/cos_pos_mapping">
            <ListItem>
              <ListItemPrefix>
                <DocumentTextIcon style={{ fontSize: 20 }} />
              </ListItemPrefix>
              Manage ESE Question Paper
            </ListItem>
          </Link>
        </List>
      </Card>
    </div>
  );
}
