import React, { useEffect, useState } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
  ChevronLeft,
} from "@mui/icons-material";

import profileImage from "../../assets/user.png";
import {
  AppBar,
  Button,
  Box,
  Typography,
  IconButton,
  Toolbar,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material";
import FlexBetween from "../FlexBetween";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "../../Redux/modeTheme";
import { useNavigate } from "react-router-dom";
import Keycloak from "keycloak-js";
import { fetchAccount } from "../../Redux/account/slice";
import { persistor } from "../../Redux/store";
import { logout } from "../../Redux/logout/slice";
import { clearAllCvs } from "../../Redux/createCv/slice";

const Navbar = ({ user, isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const keycloak = new Keycloak({
    url: "https://auth.mission4us.com/auth",
    realm: "local_tests",
    clientId: "m4us_tests",
  });
  // const keycloak = new Keycloak(initOptions);
  // const handleClose = () => {
  //   // localStorage.removeItem('bearer-token'),
  //   // localStorage.removeItem('refresh-token'),
  //   // localStorage.removeItem('user'),
  //   // localStorage.clear()
  //   // dispatch(logout)

  //   // navigate('register')

  //   keycloak.logout()
  //   keycloak.logout()
  // }

  const navigate = useNavigate();
  const account = useSelector((state) => state.account?.user);
  const status = useSelector((state) => state.account?.status);
  const error = useSelector((state) => state.account?.error);
  const token = localStorage.getItem("bearer-token");

  // console.log('token', token)
  const isTokenExpired = (token) => {
    // Vérifier si le jeton est expiré
    const expirationDate = new Date(token.expiration);
    return expirationDate < new Date();
  };

  const mode = useSelector((state) => state.global.mode);
  const role = useSelector((state) => state.account?.user.authorities);

  useEffect(() => {
    // Vérifier si le jeton est expiré ou n'est pas présent
    if (!token || isTokenExpired(token)) {
      // Déconnecter l'utilisateur et le rediriger vers la page de connexion
      // dispatch(logout());
      //  handleLogout()
      // window.location.href = "/login";
    } else {
      // Récupérer la liste des clients
      dispatch(fetchAccount());
    }
  }, [dispatch, token]);

  keycloak.init({ timeout: 10000 }).then((authenticated) => {
    if (authenticated) {
      // Keycloak is initialized and the user is authenticated
      // Perform any necessary actions, such as rendering the application
    } else {
      // Keycloak initialization failed or the user is not authenticated
      // Handle the error or redirect to the login page
    }
  });

  const handleLogout = async () => {
    // Clear local storage
    localStorage.clear();

    // Logout from Keycloak
    await keycloak.logout();

    // Perform other logout actions
    dispatch(logout());
    dispatch(clearAllCvs());

    // Reload the window
    window.location.reload();
  };
  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          backgroundColor: theme.palette.neutral.main,
        }}
      >
        {/* LEFT SIDE */}
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {!isSidebarOpen ? (
              <MenuIcon sx={{ color: theme.palette.secondary.light }} />
            ) : (
              <ChevronLeft sx={{ color: theme.palette.secondary.light }} />
            )}
          </IconButton>
        </FlexBetween>

        {/* RIGHT SIDE */}
        <FlexBetween gap="1.5rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {mode == "dark" ? (
              <DarkModeOutlined
                sx={{
                  fontSize: "25px",
                  color: theme.palette.primary.contrastText,
                }}
              />
            ) : (
              <LightModeOutlined
                sx={{
                  fontSize: "25px",
                  color: theme.palette.primary.light,
                }}
              />
            )}
          </IconButton>

          <FlexBetween>
            <Button
              onClick={handleClick}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "1rem",
              }}
            >
              <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="32px"
                width="32px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.9rem"
                  sx={{ color: theme.palette.primary.light }}
                >
                  {account?.login}
                </Typography>
                <Typography
                  fontSize=".75rem"
                  sx={{
                    color: theme.palette.primary.light,
                    fontWeight: "500",
                  }}
                >
                  {role == "ROLE_PROVIDER"
                    ? "FOURNISSEUR"
                    : role == "ROLE_CLIENT"
                    ? "CLIENT"
                    : "ADMIN"}
                </Typography>
              </Box>
              <ArrowDropDownOutlined
                sx={{
                  color: theme.palette.primary.light,
                  fontSize: "25px",
                }}
              />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <MenuItem
                onClick={() => {
                  handleClose();
                  navigate(`/${"profile"}`);
                }}
              >
                Mon profile
              </MenuItem>

              <MenuItem onClick={handleLogout}>Se déconnecter</MenuItem>
            </Menu>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

// const SignOut=()=> {
//   keycloak.logout();
//   navigate('/login')

// }
// const handleLogout = async () => {

//     console.log('enter --2 ',   )
//     localStorage.clear();
//     window.location.reload()

//   let authenticated = await keycloak.init({ onLoad: "login-required" });

//   if (authenticated) {
//     keycloak.logout();
//     dispatch(logout());
//     dispatch(clearAllCvs())

//   }

// };
// const handleLogout = async () => {
//   console.log('enter --2');

//   // Clear local storage
//   await new Promise((resolve) => {
//     localStorage.clear();
//     resolve();
//   });

//   window.location.reload();

//   // Logout from Keycloak and perform other actions
//   let authenticated = await keycloak.init({ onLoad: "login-required" });

//   if (authenticated) {
//     keycloak.logout();
//     dispatch(logout());
//     dispatch(clearAllCvs());
//   }
// };

// const handleLogout = () => {
//   console.log('enter --2');

//   // Clear local storage
//   new Promise((resolve) => {
//     localStorage.clear();
//     resolve();
//   }).then(async () => {
//     // Perform logout from Keycloak and other actions
//     let authenticated = await keycloak.init({ onLoad: 'login-required' });

//     if (authenticated) {
//       await keycloak.logout();
//       dispatch(logout());
//       dispatch(clearAllCvs());
//     }

//     // Reload the window
//     window.location.reload();
//   });
// };

// Initialize Keycloak
// keycloak.init({ onLoad: "login-required" }).then((authenticated) => {
//   if (authenticated) {
//     // Keycloak is initialized and the user is authenticated
//     // Perform any necessary actions, such as rendering the application
//   } else {
//     // Keycloak initialization failed or the user is not authenticated
//     // Handle the error or redirect to the login page
//   }
// });
