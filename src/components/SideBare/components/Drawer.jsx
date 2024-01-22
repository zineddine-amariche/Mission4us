import React from "react";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  ChevronRightOutlined,
  HomeOutlined,
  Groups2Outlined,
  PublicOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  BookOutlined,
} from "@mui/icons-material";

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "../../FlexBetween";

const CustDrawer = ({
  user,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
  children,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav">
      <Drawer
        open={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        variant="permanent"
        anchor="left"
        sx={{
          width: drawerWidth,
          "& .MuiDrawer-paper": {
            backgroundColor: theme.palette.background.default,
            boxSixing: "border-box",
            borderWidth: isNonMobile ? 0 : "2px",
            width: drawerWidth,
            overflowY: "hidden",
            "&:hover": {
              overflowY: "auto",
            },
            "&::-webkit-scrollbar": {
              display: "none",
            },
            overflowX: "hidden",
            transition: theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          },
        }}
      >
        {children}
      </Drawer>
    </Box>
  );
};

export default CustDrawer;
