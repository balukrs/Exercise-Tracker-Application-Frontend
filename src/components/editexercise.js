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

const Editexercise = () => {
  const [selecteduser, setSelecteduser] = useState("");
  const [descrp, setDescript] = useState("");
  const [duratn, setDuratn] = useState(0);
  const [dateval, setDateval] = useState("2021-01-01");
  const userid = window.location.pathname.split("/").pop();
  const classes = useStyles();

  useEffect(() => {
    userFetch();
    // eslint-disable-next-line
  }, []);

  // Async Functions

  const userFetch = async () => {
    const response = await Axios.get(
      `http://exercisetrackerbackend-env.eba-demvgn28.us-east-2.elasticbeanstalk.com/exercises/${userid}`
    );
    setSelecteduser(response.data.username);
    setDescript(response.data.description);
    setDuratn(response.data.duration);
    setDateval(new Date(response.data.date).toISOString().slice(0, 10));
  };

  const exerciseSubmit = async (data) =>
    await Axios.post(
      `http://exercisetrackerbackend-env.eba-demvgn28.us-east-2.elasticbeanstalk.com/exercises/update/${userid}`,
      data
    );

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
        <h1 className="text-2xl font-medium">Edit Excersice Log</h1>
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
            labelId="username"
            id="username"
          >
            <option value={selecteduser}>{selecteduser}</option>
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
            Update Exercise Log
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Editexercise;
