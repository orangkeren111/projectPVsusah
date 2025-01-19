import React, { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import { Dashboard, ExpandLess, ExpandMore, Logout, Settings } from "@mui/icons-material";
import { NavLink, Outlet } from "react-router-dom";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import PersonIcon from '@mui/icons-material/Person';
import MovieIcon from '@mui/icons-material/Movie';

export default function Layout() {
  const [isMasterOpen, setIsMasterOpen] = useState(false);

  const handleLogout = () => {
    // Logic untuk logout (hapus token, session, dll.)
    console.log("Logged out");
    // navigate("/login");
  };

  const linkStyles = {
    textDecoration: "none", 
    color: "inherit", 
  };

  const activeLinkStyles = {
    textDecoration: "underline",
    color: "#fff",
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
            backgroundColor: "#282c44",
            color: "#fff",
          },
        }}
      >
        <Box sx={{ padding: 2, fontWeight: "bold", fontSize: "1.25rem", textAlign: "center" }}>
          Admin Panel
        </Box>
        <List>
          {/* Dashboard Button */}
          <ListItem disablePadding>
            <NavLink
              to="/dashboard"
              style={({ isActive }) => ({
                ...linkStyles,
                ...(isActive ? activeLinkStyles : {}),
                width: '100%',
              })}
            >
              <ListItemButton>
                <ListItemIcon>
                  <Dashboard sx={{ color: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </NavLink>
          </ListItem>

          {/* Sales Transactions Button */}
          <ListItem disablePadding>
            <NavLink
              to="/sales"
              style={({ isActive }) => ({
                ...linkStyles,
                ...(isActive ? activeLinkStyles : {}),
                width: '100%',
              })}
            >
              <ListItemButton>
                <ListItemIcon>
                  <CurrencyExchangeIcon sx={{ color: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary="Sales" />
              </ListItemButton>
            </NavLink>
          </ListItem>


          {/* Master Dropdown */}
          <ListItem disablePadding>
            <ListItemButton onClick={() => setIsMasterOpen(!isMasterOpen)}>
              <ListItemIcon>
                <Settings sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary="Master" />
              {isMasterOpen ? <ExpandLess sx={{ color: "#fff" }} /> : <ExpandMore sx={{ color: "#fff" }} />}
            </ListItemButton>
          </ListItem>

          <Collapse in={isMasterOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding sx={{ pl: 4 }}>
              <ListItem disablePadding>
                <NavLink
                  to="/masterfilm"
                  style={({ isActive }) => ({
                    ...linkStyles,
                    ...(isActive ? activeLinkStyles : {}),
                    display: 'block',
                    width: '100%',
                  })}
                >
                  <ListItemButton>
                    <ListItemIcon>
                        <MovieIcon sx={{ color: "#fff" }} />
                    </ListItemIcon>
                    <ListItemText primary="Film" />
                  </ListItemButton>
                </NavLink>
              </ListItem>
              <ListItem disablePadding>
                <NavLink
                  to="/mastercust"
                  style={({ isActive }) => ({
                    ...linkStyles,
                    ...(isActive ? activeLinkStyles : {}),
                    display: 'block',
                    width: '100%',
                  })}
                >
                  <ListItemButton>
                    <ListItemIcon>
                        <PersonIcon sx={{ color: "#fff" }} />
                    </ListItemIcon>
                    <ListItemText primary="Customer" />
                  </ListItemButton>
                </NavLink>
              </ListItem>
            </List>
          </Collapse>
          {/* Logout Button */}
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                <Logout sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
