import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
} from "@mui/material";
import {
  Home as HomeIcon,
  Inbox as InboxIcon,
  School as AcademicCapIcon,
  Public as GlobeAsiaAustraliaIcon,
  PublicOff as GlobeEuropeAfricaIcon,
  CompareArrows as ArrowsUpDownIcon,
  Bookmark as BookmarkIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function DefaultSidebar() {
  return (
    <div className="shadow-xl z-10">
      <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
        <div className="mb-2 p-4">
          <Typography variant="h5" color="textPrimary">
            Curriculum Page
          </Typography>
        </div>
        <List>
          <Link to="/curriculumPage/organization">
            <ListItem button>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Organization" />
            </ListItem>
          </Link>

          <Link to="/curriculumPage/department">
            <ListItem button>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Department" />
            </ListItem>
          </Link>

          <Link to="/curriculumPage/program">
            <ListItem button>
              <ListItemIcon>
                <BookmarkIcon />
              </ListItemIcon>
              <ListItemText primary="Program" />
            </ListItem>
          </Link>

          <Link to="/curriculumPage/curriculum">
            <ListItem button>
              <ListItemIcon>
                <AcademicCapIcon />
              </ListItemIcon>
              <ListItemText primary="Curriculum" />
            </ListItem>
          </Link>

          <Link to="/curriculumPage/program_outcomes">
            <ListItem button>
              <ListItemIcon>
                <GlobeAsiaAustraliaIcon />
              </ListItemIcon>
              <ListItemText primary="Program Outcomes" />
            </ListItem>
          </Link>

          <Link to="/curriculumPage/course">
            <ListItem button>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Course" />
              <Chip label="14" variant="outlined" color="primary" size="small" />
            </ListItem>
          </Link>

          <Link to="/curriculumPage/course_outcomes">
            <ListItem button>
              <ListItemIcon>
                <GlobeEuropeAfricaIcon />
              </ListItemIcon>
              <ListItemText primary="Course Outcomes" />
            </ListItem>
          </Link>

          <Link to="/curriculumPage/copomapping">
            <ListItem button>
              <ListItemIcon>
                <ArrowsUpDownIcon />
              </ListItemIcon>
              <ListItemText primary="COs POs Mapping" />
            </ListItem>
          </Link>
        </List>
      </Card>
    </div>
  );
}
