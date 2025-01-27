import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
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
import Dashboard from "./pages/Dashboard";
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

function Layout({ children }) {
  const navigate = useNavigate();
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const userInfo = JSON.parse(localStorage.getItem("userinfo"));
  const userInitial = userInfo?.email?.charAt(0).toUpperCase() || "?";

  const toggleSideMenu = () => setSideMenuOpen(!sideMenuOpen);
  const closeSideMenu = () => setSideMenuOpen(false);
  const openMenu = (event) => setMenuAnchorEl(event.currentTarget);
  const closeMenu = () => setMenuAnchorEl(null);

  const handleLogout = () => {
    localStorage.removeItem("userinfo");
    localStorage.setItem("isAuthenticated", "false");
    navigate("/login");
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
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#1976d2",
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
          <Typography variant="h6">Task Manager</Typography>
        </Box>

        <Box>
          <Box
            sx={{
              width: "30px",
              height: "30px",
              backgroundColor: "#fff",
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
            <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
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
          },
        }}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#1976d2",
              height: "52px",
              pl: 1,
            }}
          >
            <IconButton color="inherit" onClick={toggleSideMenu}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ textWrapMode: "nowrap", ml: 1.5 }}>
              Task Manager
            </Typography>
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
                    sx={{ height: "24px", width: "24px" }}
                  >
                    {item.icon}
                  </Box>
                  {sideMenuOpen && (
                    <ListItemText
                      primary={item.text}
                      sx={{ textWrapMode: "nowrap" }}
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
          margin: "52px 0px 0px 56px",
          p: "22px",
          transition: "margin-left 0.3s",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

function App() {
  const [isAuthenticated, setAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );
  console.log("isAuthenticated", isAuthenticated);

  return (
    <Router>
      <Routes>
        {!isAuthenticated ? (
          <>
            <Route
              path="/login"
              element={
                <Layout>
                  <LoginPage setAuthenticated={setAuthenticated} />
                </Layout>
              }
            />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        ) : (
          <>
            <Route
              path="/"
              element={
                <Layout>
                  <Dashboard />
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
