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
  Home as HomeIcon,
  Inbox as InboxIcon,
  School as AcademicCapIcon,
  Public as GlobeAsiaAustraliaIcon,
  Public as GlobeEuropeAfricaIcon,
  CompareArrows as ArrowsUpDownIcon,
  Bookmark as BookmarkIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function DefaultSidebar() {
  return (
    <div className="shadow-xl z-10">
      <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
        <div className="mb-2 p-4">
          <Typography variant="h5" color="blue-gray">
            Curriculum Page
          </Typography>
        </div>
        <List>
          <Link to={"organization"} relative="route">
            <ListItem>
              <ListItemPrefix>
                <HomeIcon className="h-5 w-5" />
              </ListItemPrefix>
              Organization
            </ListItem>
          </Link>

          <Link to={"department"} relative="route">
            <ListItem>
              <ListItemPrefix>
                <HomeModernIcon className="h-5 w-5" />
              </ListItemPrefix>
              Department
            </ListItem>
          </Link>

          <Link to={"program"} relative="route">
            <ListItem>
              <ListItemPrefix>
                <BookmarkIcon className="h-5 w-5" />
              </ListItemPrefix>
              Program
            </ListItem>
          </Link>

          <Link to={"design"} relative="route">
            <ListItem>
              <ListItemPrefix>
                <AcademicCapIcon className="h-5 w-5" />
              </ListItemPrefix>
              Curriculum
            </ListItem>
          </Link>

          <Link to={"program_outcomes"} relative="route">
            <ListItem>
              <ListItemPrefix>
                <GlobeAsiaAustraliaIcon className="h-5 w-5" />
              </ListItemPrefix>
              Program Outcomes
            </ListItem>
          </Link>

          <Link to={"course"} relative="route">
            <ListItem>
              <ListItemPrefix>
                <InboxIcon className="h-5 w-5" />
              </ListItemPrefix>
              Course
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

          <Link to={"course_outcomes"} relative="route">
            <ListItem>
              <ListItemPrefix>
                <GlobeEuropeAfricaIcon className="h-5 w-5" />
              </ListItemPrefix>
              Course Outcomes
            </ListItem>
          </Link>

          <Link to={"copomapping"} relative="route">
            <ListItem>
              <ListItemPrefix>
                <ArrowsUpDownIcon className="h-5 w-5" />
              </ListItemPrefix>
              COs POs Mapping
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
