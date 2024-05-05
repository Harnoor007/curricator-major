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
   School as AcademicCapIcon,
   Public as GlobeEuropeAfricaIcon,
   Work as BriefcaseIcon,
   TableChart as TableCellsIcon,
   Event as CalendarDaysIcon,
   Extension as PuzzlePieceIcon,
   Description as DocumentIcon,
   Notes as DocumentTextIcon,
   Redeem as GiftIcon,
   CardGiftcard as GiftTopIcon,
   ViewComfy as Square3Stack3DIcon,
   InsertLink as LinkIcon,
   Schedule as ClockIcon,
 } from "@mui/icons-material";
  import { Link } from "react-router-dom";
   
  export default function DefaultSidebar() {
    return (
      <div className="shadow-xl z-10">
      <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <div className="mb-2 p-4">
          <Typography variant="h5" color="blue-gray"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            Attainment Page
          </Typography>
        </div>
        <List  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <Link to={'department'} relative="route">
          <ListItem  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              <ListItemPrefix  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <GiftIcon
   className="h-5 w-5" />
              </ListItemPrefix>
              CO Attainment (CIA)
          </ListItem>
        </Link>
  
        <Link to={'ExtraCurricular'} relative="route">
        <ListItem  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <ListItemPrefix  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              <GiftTopIcon className="h-5 w-5" />
            </ListItemPrefix>
            PO Attainment
        </ListItem>
        </Link>
  
        <Link to={'program_outcomes'} relative="route">
          <ListItem  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <ListItemPrefix  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              <Square3Stack3DIcon   className="h-5 w-5" />
            </ListItemPrefix>
            Consolidated PO Attainment
          </ListItem>
        </Link>
  
        <Link to={'course'} relative='route' >
          <ListItem  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <ListItemPrefix  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              <LinkIcon className="h-5 w-5" />
            </ListItemPrefix>
            PO & PSO Attainment
            <ListItemSuffix  children ={undefined} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              {/* <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" /> */}
            </ListItemSuffix>
          </ListItem>
        </Link>
  
        <Link to={'course_outcomes'} relative='route' >
          <ListItem  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <ListItemPrefix  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              <ClockIcon className="h-5 w-5" />
            </ListItemPrefix>
            CAY Attainment
          </ListItem>
        </Link>
  
        <Link to={'cos_pos_mapping'}>
          <ListItem  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <ListItemPrefix  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
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