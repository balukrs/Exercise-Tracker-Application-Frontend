import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
  selectControl: {
    minWidth: 450,
    paddingTop: 2,
    paddingBottom: 2,
  },
  buttonStyle: {
    backgroundColor: "#04D9B2",
    "&:hover": {
      backgroundColor: "#BF5656",
    },
    "&:focus": {
      outline: 0,
    },
  },
}));

const Createuser = () => {
  const [user, setUser] = useState("");
  const classes = useStyles();

  // Async Fyunctions
  const userSubmit = async (data) =>
    await Axios.post(
      "https://exercise-app-bcknd.herokuapp.com/users/add",
      data
    );

  // Submit Functions

  const handleSubmit = (e) => {
    e.preventDefault();
    const newuser = { username: user };
    userSubmit(newuser);
    setUser("");
    window.location = "/";
  };

  return (
    <div className="p-3.5">
      <div className="mb-3">
        <h1 className="text-2xl font-medium">Create User</h1>
      </div>
      <form onSubmit={(e) => handleSubmit(e)} id="form">
        <div className="mb-4 ">
          <TextField
            id="adduser"
            label="Add Username"
            className={classes.selectControl}
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </div>
        <div>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            form="form"
            className={classes.buttonStyle}
          >
            Create Exercise Log
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Createuser;
