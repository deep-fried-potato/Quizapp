import React from "react";
import PropTypes from "prop-types";
import { withStyles, MuiThemeProvider } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import red from "@material-ui/core/colors/red";
/* eslint-disable react/jsx-handler-names */
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import PopupState, {
  bindTrigger,
  bindMenu
} from "material-ui-popup-state/index";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import Home from "@material-ui/icons/Home";
import ContactSupport from "@material-ui/icons/ContactSupport";
import { createMuiTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import { blue, grey } from "@material-ui/core/colors";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { fade } from "@material-ui/core/styles/colorManipulator";
import Drawer from "./Drawer";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#212121',
    },
    secondary: {
      main: "#f44336"
    }
  },
  shadows: ["none"]
});

const styles = {
  root: {
    flexGrow: 1,
    padding: "35px"
  },
  grow: {
    flexGrow: 1
  },
  logo: {
    position: "relative",
    paddingLeft: "0%",
    paddingRight: "90%"
  },
  menuButton: {
    position: "relative",
    marginLeft: -12,
    marginRight: 20
  },
  accountButton: {
    marginLeft: 0,
    marginRight: 0
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit,
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  }
};

function ButtonAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <MuiThemeProvider theme={theme}>
        <AppBar position="fixed">
          <Toolbar>
            <Drawer />
            {/* <Typography variant="h6" color="inherit" className={classes.grow}>
              <span className={classes.logo}> Quizapp!</span>
            </Typography> */}
            <div className={classes.grow} />
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
              />
            </div>
            <IconButton className="" color="inherit" aria-label="Home" href="/">
              <Home />
            </IconButton>
            <IconButton
              className=""
              color="inherit"
              aria-label="ContactSupport"
            >
              <ContactSupport />
            </IconButton>
            <PopupState variant="popover" popupId="demo-popup-menu">
              {popupState => (
                <React.Fragment>
                  <IconButton
                    className={classes.accountButton}
                    color="inherit"
                    aria-label="Menu"
                    {...bindTrigger(popupState)}
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu {...bindMenu(popupState)}>
                    <MenuItem onClick={popupState.close} selected>
                      Sign Up
                    </MenuItem>
                    <MenuItem onClick={popupState.close}>Login</MenuItem>
                  </Menu>
                </React.Fragment>
              )}
            </PopupState>
          </Toolbar>
        </AppBar>
      </MuiThemeProvider>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ButtonAppBar);
