import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
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

const CreateExercise = () => {
  const [userlist, setUserlist] = useState([]);
  const [selecteduser, setSelecteduser] = useState("DEFAULT");
  const [descrp, setDescript] = useState("");
  const [duratn, setDuratn] = useState(0);
  const [dateval, setDateval] = useState("2021-01-01");

  const classes = useStyles();

  useEffect(() => {
    userFetch();
  }, []);

  const userOptions = () => {
    return userlist.map((item, index) => {
      return (
        <option key={item._id} value={item.username}>
          {item.username}
        </option>
      );
    });
  };

  // Async Functions

  const userFetch = async () => {
    const response = await Axios.get("http://localhost:5000/users");
    setUserlist(response.data);
  };

  const exerciseSubmit = async (data) => {
    const response = await Axios.post(
      "http://localhost:5000/exercises/add",
      data
    );
    console.log(response);
  };

  // Submit functions

  const handleSubmit = (e) => {
    e.preventDefault();
    const exercise = {
      username: selecteduser,
      description: descrp,
      duration: duratn,
      date: dateval,
    };
    exerciseSubmit(exercise);
    window.location = "/";
  };

  return (
    <div className="p-3.5 form-height">
      <div>
        <h1 className="text-2xl font-medium">Create New Excersice Log</h1>
      </div>

      <form
        className="flex flex-col justify-around h-full"
        id="form"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div>
          <Select
            native
            className={classes.selectControl}
            value={selecteduser}
            onChange={(e) => setSelecteduser(e.target.value)}
            labelId="username"
            id="username"
          >
            <option value="DEFAULT" disabled>
              Choose a Username ...
            </option>
            {userOptions()}
          </Select>
        </div>
        <div>
          <TextField
            id="description"
            label="Description"
            multiline
            rowsMax={4}
            className={classes.selectControl}
            value={descrp}
            onChange={(e) => setDescript(e.target.value)}
          />
        </div>
        <div>
          <TextField
            id="standard-required"
            label="Duration(in minutes)"
            type="number"
            value={duratn}
            onChange={(e) => setDuratn(Number(e.target.value))}
          />
        </div>
        <div>
          <TextField
            id="date"
            label="Date"
            type="date"
            value={dateval}
            onChange={(e) => setDateval(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
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

export default CreateExercise;
