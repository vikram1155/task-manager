import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import {
  Box,
  Typography,
  IconButton,
  Drawer,
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  Backdrop,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LoginPage from "./pages/LoginPage";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CreateTask from "./pages/CreateTask";
import EditNoteIcon from "@mui/icons-material/EditNote";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AssignmentIcon from "@mui/icons-material/Assignment";
import GroupsIcon from "@mui/icons-material/Groups";
import ManageTasks from "./pages/ManageTasks";
import Team from "./pages/Team";
import ManageTask from "./pages/ManageTask";
import Notifications from "./pages/Notifications";
import MyTasks from "./pages/MyTasks";
import Profile from "./pages/Profile";
import { colorSchemes } from "./data/theme";
import taskHubLogo from "./assets/taskHubLogo.svg";
import CustomSnackBar from "./components/CustomSnackBar";
import { useSelector } from "react-redux";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

function Layout({ children }) {
  const navigate = useNavigate();
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const location = useLocation();

  const userInfo = JSON.parse(localStorage.getItem("userinfo"));
  const userInitial = userInfo?.email?.charAt(0).toUpperCase() || "?";

  const toggleSideMenu = () => setSideMenuOpen(!sideMenuOpen);
  const closeSideMenu = () => setSideMenuOpen(false);
  const openMenu = (event) => setMenuAnchorEl(event.currentTarget);
  const closeMenu = () => setMenuAnchorEl(null);

  const handleLogout = () => {
    localStorage.removeItem("userinfo");
    localStorage.setItem("isAuthenticated", "false");
    window.location.href = "/";
    // navigate("/");
  };

  const sideMenuItems = [
    { text: "My Tasks", path: "/my-tasks", icon: <AssignmentIcon /> },
    { text: "Manage Tasks", path: "/manage-tasks", icon: <EditNoteIcon /> },
    { text: "Create New Task", path: "/create-task", icon: <AddBoxIcon /> },
    {
      text: "Notifications",
      path: "/notifications",
      icon: <NotificationsIcon />,
    },
    { text: "Team", path: "/team", icon: <GroupsIcon /> },
  ];

  return (
    <Box
      sx={{
        backgroundColor: colorSchemes.blackBg,
        height: "calc(100vh - 52px)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: colorSchemes.blackBg,
          padding: "10px 20px",
          color: "white",
          width: "calc(100% - 80px)",
          float: "right",
          position: "fixed",
          top: 0,
          left: "42px",
          zIndex: 100,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: 20,
              textWrapMode: "nowrap",
              ml: 1.5,
              pr: 1.2,
              color: colorSchemes.primaryGreen,
              py: "1px",
            }}
          >
            TaskHub
          </Typography>
          <img src={taskHubLogo} alt="TaskHub Logo" style={{ width: "24px" }} />
        </Box>

        <Box>
          <Box
            sx={{
              width: "30px",
              height: "30px",
              backgroundColor: colorSchemes.primaryGreen,
              borderRadius: "100%",
              color: "#000",
              cursor: "pointer",
            }}
            onClick={openMenu}
          >
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                fontWeight: 600,
              }}
            >
              {userInitial}
            </Typography>
          </Box>
          <Menu
            anchorEl={menuAnchorEl}
            open={Boolean(menuAnchorEl)}
            onClose={closeMenu}
          >
            <MenuItem
              onClick={() => navigate("/profile")}
              sx={{ fontSize: "14px" }}
            >
              Profile
            </MenuItem>
            <MenuItem onClick={handleLogout} sx={{ fontSize: "14px" }}>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Box>
      <Drawer
        variant="permanent"
        open={sideMenuOpen}
        sx={{
          "& .MuiDrawer-paper": {
            width: sideMenuOpen ? 240 : 56,
            overflow: "hidden",
            transition: "width 0.3s",
            height: "100vh",
            border: "none",
            backgroundColor: colorSchemes.darkBg,
            zIndex: 100,
          },
        }}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: colorSchemes.darkBg,
              height: "52px",
              pl: 1,
            }}
          >
            <IconButton color="inherit" onClick={toggleSideMenu}>
              <MenuIcon sx={{ color: colorSchemes.primaryGreen }} />
            </IconButton>
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: 20,
                textWrapMode: "nowrap",
                ml: 1.5,
                pr: 1.5,
                color: colorSchemes.primaryGreen,
              }}
            >
              TaskHub
            </Typography>
            <img
              src={taskHubLogo}
              alt="TaskHub Logo"
              style={{ width: "24px" }}
            />
          </Box>
          <List>
            {sideMenuItems.map((item, index) => (
              <Tooltip title={item.text} placement={"right"}>
                <ListItem
                  button
                  key={index}
                  onClick={() => navigate(item.path)}
                  sx={{
                    p: 1,
                    pl: 2,
                    display: "flex",
                    flexDirection: "row",
                    gap: "20px",
                    height: "48px",
                    cursor: "pointer",
                    // justifyContent: sideMenuOpen ? "initial" : "center",
                  }}
                >
                  <Box
                    onClick={() => navigate(item.path)}
                    sx={{
                      height: "24px",
                      width: "24px",
                      color: location.pathname.includes(item.path)
                        ? colorSchemes.activeMenuColor
                        : colorSchemes.whiteText,
                    }}
                  >
                    {item.icon}
                  </Box>
                  {sideMenuOpen && (
                    <ListItemText
                      primary={item.text}
                      sx={{
                        textWrapMode: "nowrap",
                        "& .MuiTypography-root": {
                          fontWeight: location.pathname.includes(item.path)
                            ? 600
                            : 400,
                          color: location.pathname.includes(item.path)
                            ? colorSchemes.activeMenuColor
                            : colorSchemes.whiteText,
                        },
                      }}
                    />
                  )}
                </ListItem>
              </Tooltip>
            ))}
          </List>
        </Box>
      </Drawer>
      {sideMenuOpen && (
        <Backdrop
          open={sideMenuOpen}
          onClick={closeSideMenu}
          sx={{ zIndex: 1 }}
        />
      )}
      <Box
        sx={{
          p: "68px 22px 22px",
          ml: "56px",
          transition: "margin-left 0.3s",
        }}
      >
        {children}
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: colorSchemes.blackBg,
          padding: "10px 20px",
          color: "white",
          width: "calc(100% - 80px)",
          float: "right",
          position: "fixed",
          bottom: 0,
          left: "62px",
          zIndex: 99,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            gap: 1,
          }}
        >
          <Typography>Connect for more!</Typography>
          <LinkedInIcon
            sx={{ fontSize: 18, cursor: "pointer" }}
            onClick={() =>
              window.open("https://www.linkedin.com/in/vikram1155/", "_blank")
            }
          />
          <GitHubIcon
            sx={{ fontSize: 18, cursor: "pointer" }}
            onClick={() =>
              window.open("https://github.com/vikram1155/", "_blank")
            }
          />
        </Box>
      </Box>
    </Box>
  );
}

function App() {
  const [isAuthenticated, setAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );
  const snackbar = useSelector((state) => state.snackbar);

  return (
    <Router>
      <CustomSnackBar
        message={snackbar.message}
        severity={snackbar.severity}
        open={snackbar.open}
      />
      <Routes>
        {!isAuthenticated ? (
          <>
            <Route
              path="/login"
              element={<LoginPage setAuthenticated={setAuthenticated} />}
            />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Navigate to="/my-tasks" replace />} />
            <Route
              path="/profile"
              element={
                <Layout>
                  <Profile />
                </Layout>
              }
            />
            <Route
              path="/my-tasks"
              element={
                <Layout>
                  <MyTasks />
                </Layout>
              }
            />
            <Route
              path="/create-task"
              element={
                <Layout>
                  <CreateTask />
                </Layout>
              }
            />
            <Route
              path="/manage-tasks"
              element={
                <Layout>
                  <ManageTasks />
                </Layout>
              }
            />
            <Route
              path="/manage-tasks/:id"
              element={
                <Layout>
                  <ManageTask />
                </Layout>
              }
            />
            <Route
              path="/notifications"
              element={
                <Layout>
                  <Notifications />
                </Layout>
              }
            />
            <Route
              path="/team"
              element={
                <Layout>
                  <Team />
                </Layout>
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
