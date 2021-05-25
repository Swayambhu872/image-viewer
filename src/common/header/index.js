import React from "react";
import {
  TextField,
  Button,
  Menu,
  MenuItem,
  InputAdornment
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import avatar from "../../assets/images/user.png";
import "./Header.css";

const Header = props => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //Redirect to profile page
  const loadProfilePage = () => {
    props.props.history.push("/profile");
  };

  //Redirect to home page
  const loadHomePage = () => {
    if(props.isProfile){
      props.props.history.push("/home");
    }
    
  };

  // Clearing the session storage and local storage on logout
  const logout = () => {
    sessionStorage.userAuth = "";
    localStorage.clear();
    props.props.history.push("/");
  };

  return (
    <header>
      <div className="header-container">
        <div className="header-title" onClick={loadHomePage}>
          Image Viewer
        </div>
        <div className="header-action">
          {props.isHome ? (
            <TextField
              id="input-with-icon-textfield"
              placeholder="Search..."
              variant="filled"
              value={props.value}
              onChange={props.onChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                )
              }}
            />
          ) : (
            ""
          )}
          {props.isHome || props.isProfile ? (
            <div className="avatar">
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                <img src={avatar} alt="avatar" />
              </Button>
              <Menu
                id="simple-menu"
                elevation={0}
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {!props.isProfile ? (
                  <MenuItem onClick={loadProfilePage}>My Account</MenuItem>
                ) : (
                  ""
                )}

                {!props.isProfile && <hr />}

                <MenuItem onClick={logout}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;