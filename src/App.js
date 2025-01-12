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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";

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
    { text: "Create New Task", path: "/create-task" },
    { text: "Manage Tasks", path: "/manage-tasks" },
    { text: "Pending Tasks", path: "/pending-tasks" },
    { text: "Bugs", path: "/bugs" },
    { text: "New Features", path: "/new-features" },
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
                  // justifyContent: sideMenuOpen ? "initial" : "center",
                }}
              >
                <MenuIcon onClick={(e) => e.preventDefault()} />

                {sideMenuOpen && (
                  <ListItemText
                    primary={item.text}
                    sx={{ textWrapMode: "nowrap" }}
                  />
                )}
              </ListItem>
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
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
