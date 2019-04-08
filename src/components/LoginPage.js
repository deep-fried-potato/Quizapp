import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  button: { margin: theme.spacing.unit }
});

class LoginPage extends React.Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button
          variant="outlined"
          color="inherit"
          className={classes.button}
          onClick={this.handleClickOpen}
        >
          Start Learning
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            <Typography variant="h5" component="h5">
              Login
            </Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>To resume your journey login here</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
LoginPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LoginPage);

/* import React from "react";
import PropTypes from "prop-types";
import {
  createMuiTheme,
  MuiThemeProvider,
  withStyles
} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import color from "@material-ui/core/colors/pink";

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 10
  },
  logininfo: {
    ...theme.mixins.gutters(),
    width: 100,
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    backgroundColor: "#eeeeee",
    height: "auto"
  },
  form: {
    ...theme.mixins.gutters(),
    width: 100,
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
});

function typographyV1Theme(theme) {
  return createMuiTheme({
    ...theme,
    typography: {
      useNextVariants: false
    }
  });
}

function PaperSheet(props) {
  const { classes } = props;
  return (
    <MuiThemeProvider theme={typographyV1Theme}>
      <div className={classes.root}>
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <Grid container className="" justify="center" spacing={0}>
              <Grid
                item
                key={0}
                style={{
                  paddingTop: "8%"
                }}
              >
                <Paper className={classes.logininfo} elevation={0}>
                  <Typography
                    variant="h5"
                    component="h2"
                    style={{ color: "#757575" }}
                  >
                    Login
                  </Typography>
                  <Typography component="p" style={{ color: "#757575" }}>
                    To get started Login here
                  </Typography>
                </Paper>
              </Grid>
              <Grid item key={1}>
                <Paper
                  className={classes.form}
                  elevation={1}
                  style={{
                    backgroundColor: "#212121",
                    position: "relative"
                  }}
                >
                  <Typography
                    variant="h5"
                    component="h3"
                    style={{ color: "#fff" }}
                  >
                    This is a sheet of paper.
                  </Typography>
                  <Typography component="p">
                    Paper can be used to build surface or other elements for
                    your application.
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </MuiThemeProvider>
  );
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PaperSheet);
 */
