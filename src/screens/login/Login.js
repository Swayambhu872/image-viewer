import React, { useState } from "react";
import { Button, Card, Grid, TextField, Typography } from "@material-ui/core";
import Header from "../../common/header";
import { access_token } from "../../common";
import "./Login.css";

const Login = props => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrMsg] = useState({
    isError: false,
    msg: ""
  });

  // Method to validate and login the user 
  const authenticateUser = () => {
    if (username === "admin" && password === "admin") {
      sessionStorage.userAuth = access_token;

      props.history.push("/home");
    } else if (!username || !password) {
      setErrMsg({ isError: true });
    } else {
      setErrMsg({ isError: false, msg: "Incorrect username and/or password" });
    }
  };

  return (
    <>
      <Header />
      <Card className="login-card">
        <Grid container direction="column">
          <Grid item>
            <Typography variant="h5" gutterBottom>
              LOGIN
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              className="form-field"
              required
              label="Username"
              value={username}
              onChange={e => {
                setUserName(e.currentTarget.value);
                setErrMsg({ isError: false, msg: "" });
              }}
              fullWidth
            />
            <div className="error-msg">
              {error.isError && !username && "required"}
            </div>
          </Grid>
          <Grid item>
            <TextField
              className="form-field"
              type="password"
              required
              label="Password"
              value={password}
              onChange={e => {
                setPassword(e.currentTarget.value);
                setErrMsg({ isError: false, msg: "" });
              }}
              fullWidth
            />
            <div className="error-msg">
              {error.isError && !password && "required"}
            </div>
          </Grid>
          <Grid className="error-msg" item>
            {error.msg}
          </Grid>
          <Grid item>
            <Button
              color="primary"
              className="login-button"
              variant="contained"
              onClick={authenticateUser}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default Login;