import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
  } from "@material-tailwind/react";
  import {
    AcademicCapIcon,
    GlobeEuropeAfricaIcon,
    BriefcaseIcon,
    TableCellsIcon,
    CalendarDaysIcon,
    PuzzlePieceIcon,
    DocumentIcon,
    DocumentTextIcon,
  } from "@heroicons/react/24/solid";
  import { Link } from "react-router-dom";
   
  export default function DefaultSidebar() {
    return (
      <div className="shadow-xl z-10">
      <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
        <div className="mb-2 p-4">
          <Typography variant="h5" color="blue-gray">
            Assesment Page
          </Typography>
        </div>
        <List>
        <Link to={'department'} relative="route">
          <ListItem>
              <ListItemPrefix>
                <BriefcaseIcon
   className="h-5 w-5" />
              </ListItemPrefix>
              Question Bank
          </ListItem>
        </Link>
  
        <Link to={'ExtraCurricular'} relative="route">
        <ListItem>
            <ListItemPrefix>
              <PuzzlePieceIcon className="h-5 w-5" />
            </ListItemPrefix>
            Extracurricular/ Co-curricular Activity
        </ListItem>
        </Link>
  
        <Link to={'program_outcomes'} relative="route">
          <ListItem>
            <ListItemPrefix>
              < CalendarDaysIcon   className="h-5 w-5" />
            </ListItemPrefix>
            Manage CIA occasions
          </ListItem>
        </Link>
  
        <Link to={'course'} relative='route' >
          <ListItem>
            <ListItemPrefix>
              <TableCellsIcon className="h-5 w-5" />
            </ListItemPrefix>
            Manage CIA Question Paper & Rubrics
            <ListItemSuffix>
              <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
            </ListItemSuffix>
          </ListItem>
        </Link>
  
        <Link to={'course_outcomes'} relative='route' >
          <ListItem>
            <ListItemPrefix>
              <DocumentIcon className="h-5 w-5" />
            </ListItemPrefix>
            Manage ESE Model Question Paper
          </ListItem>
        </Link>
  
        <Link to={'cos_pos_mapping'}>
          <ListItem>
            <ListItemPrefix>
              <DocumentTextIcon className="h-5 w-5" />
            </ListItemPrefix>
            Manage ESE Question Paper
          </ListItem>
        </Link>
          {/* <ListItem>
            <ListItemPrefix>
              <Cog6ToothIcon className="h-5 w-5" />
            </ListItemPrefix>
            Settings
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            Log Out
          </ListItem> */}
        </List>
      </Card>
      </div>
    );
  }