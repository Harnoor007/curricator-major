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
    GiftIcon,
    GiftTopIcon,
    Square3Stack3DIcon,
    LinkIcon,
    ClockIcon,
  } from "@heroicons/react/24/solid";
  import { Link } from "react-router-dom";
import { DockOutlined, DockRounded } from "@mui/icons-material";
   
  export default function DefaultSidebar() {
    return (
      <div className="shadow-xl z-10">
      <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
        <div className="mb-2 p-4">
          <Typography variant="h5" color="blue-gray">
            Attainment Page
          </Typography>
        </div>
        <List>
        <Link to={'department'} relative="route">
          <ListItem>
              <ListItemPrefix>
                <GiftIcon
   className="h-5 w-5" />
              </ListItemPrefix>
              CO Attainment (CIA)
          </ListItem>
        </Link>
  
        <Link to={'ExtraCurricular'} relative="route">
        <ListItem>
            <ListItemPrefix>
              <GiftTopIcon className="h-5 w-5" />
            </ListItemPrefix>
            PO Attainment
        </ListItem>
        </Link>
  
        <Link to={'program_outcomes'} relative="route">
          <ListItem>
            <ListItemPrefix>
              <Square3Stack3DIcon   className="h-5 w-5" />
            </ListItemPrefix>
            Consolidated PO Attainment
          </ListItem>
        </Link>
  
        <Link to={'course'} relative='route' >
          <ListItem>
            <ListItemPrefix>
              <LinkIcon className="h-5 w-5" />
            </ListItemPrefix>
            PO & PSO Attainment
            <ListItemSuffix>
              {/* <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" /> */}
            </ListItemSuffix>
          </ListItem>
        </Link>
  
        <Link to={'course_outcomes'} relative='route' >
          <ListItem>
            <ListItemPrefix>
              <ClockIcon className="h-5 w-5" />
            </ListItemPrefix>
            CAY Attainment
          </ListItem>
        </Link>
  
        <Link to={'cos_pos_mapping'}>
          <ListItem>
            <ListItemPrefix>
              <DocumentTextIcon className="h-5 w-5" />
            </ListItemPrefix>
            Branch Wise PO Attainment
          </ListItem>
        </Link>
          {/* <ListItem>
            <ListItemPrefix>
              <DockOutlined className="h-5 w-5" />
            </ListItemPrefix>
            Settings
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <DockRounded className="h-5 w-5" />
            </ListItemPrefix>
            Log Out
          </ListItem> */}
        </List>
      </Card>
      </div>
    );
  }