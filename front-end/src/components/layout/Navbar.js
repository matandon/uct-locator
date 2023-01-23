import React from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/authActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@mui/material/styles';

import Icon from '@mui/material/Icon';
import CircularProgress from "@mui/material/CircularProgress";
import GpsFixedTwoTone from "@mui/icons-material/GpsFixedTwoTone";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import PersonIcon from '@mui/icons-material/Person';

const drawerWidth = 240;
const Navbar = (props) => {
  const theme = useTheme();
  const bg = theme.palette.primary.main;
  const fg = theme.palette.primary.contrastText;

  const loggedIn = props.auth.isAuthenticated;
  const mapShowing = props.map.mapShowing;

  const [drawerOpen, setDrawerOpen] = React.useState();

  const onLogoutClick = e => {
    e.preventDefault();
    props.logoutUser();
  };

  let drawerLinks = [
    {
      text: "Home",
      href: "/",
      icon: <HomeIcon />
    },
    {
      text: "Find a Table",
      href: "/find",
      icon: <SearchIcon />
    }
  ];

  if (loggedIn) {
    drawerLinks.push({
      text: "Submit a Table",
      href: "/submit-table",
      icon: <AddLocationIcon />
    });
    drawerLinks.push({
      text: "Logout",
      href: undefined,
      onClick: onLogoutClick,
      icon: <ExitToAppIcon />
    });
  } else {
    drawerLinks.push({
      text: "Register",
      href: "/register",
      icon: <FiberNewIcon />
    });
    drawerLinks.push({
      text: "Login",
      href: "/login",
      icon: <PersonIcon />
    });
  }

  const drawer = (
    <Box
      role="presentation"
      onClick={() => setDrawerOpen(false)}
      sx={{ backgroundColor: bg, minWidth: "300px", height: "100%", color: fg }}
    >
      <List>
        <ListItem>
          <ListItemButton onClick={() => setDrawerOpen(false)} sx={{
            color: fg, paddingRight: "0px",
            display: { xs: 'block', sm: 'none' },
            flexGrow: '0.3'
          }}>
            <ChevronLeftIcon />
          </ListItemButton>
          <ListItemText sx={{
            paddingLeft: { sm: "16px" }
          }}>
            <Typography variant="h6">UCT Locator</Typography>
          </ListItemText>
        </ListItem>
        {drawerLinks.map((dl, i) => {
          return (dl.href === undefined) ? <ListItem key={i} onClick={dl.onClick} style={{ display: "flex", paddingLeft: "2rem" }}>
            <ListItemIcon style={{ color: fg }}>
              {dl.icon}
            </ListItemIcon>
            <ListItemText style={{ color: fg }}>{dl.text}</ListItemText>
          </ListItem>
            :
            <ListItem key={i}>
              <Link to={dl.href} style={{ display: "flex", paddingLeft: "1rem" }}>
                <ListItemIcon style={{ color: fg }}>
                  {dl.icon}
                </ListItemIcon>
                <ListItemText style={{ color: fg }}>{dl.text}</ListItemText>
              </Link>
            </ListItem>
        })}
      </List>
    </Box >
  )

  return (
    <>
      <AppBar position="static" sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}>
        <Toolbar sx={{ backgroundColor: bg, color: fg, justifyContent: "center" }}>
          <IconButton
            color="inherit"
            onClick={() => setDrawerOpen(true)}
            edge="start"
            sx={{ mr: 2, display: { xs: 'block', sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          {mapShowing ? (
            <div className="input-bar">
              <input id="searchbar"></input>
              <div>
                <Icon className={"location-icon"} component={GpsFixedTwoTone} alt="Find My Current Location" />
              </div>
              <div className="hidden">
                <CircularProgress size="35px" color="secondary" />
              </div>
            </div>
          ) : (
            <></>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: bg },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: bg },
        }}
        open
      >
        {drawer}
      </Drawer>
    </>
  );
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  map: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  map: state.map
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);