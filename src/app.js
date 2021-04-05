import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/navbar";
import exerciseList from "./components/exerciselist";
import editExercise from "./components/editexercise";
import createExercise from "./components/createexercise";
import createUser from "./components/createuser";

const App = () => {
  return (
    <div className="container mx-auto min-w-max">
      <Router>
        <Navbar />
        <Route path="/" exact component={exerciseList} />
        <Route path="/edit/:id" component={editExercise} />
        <Route path="/create" component={createExercise} />
        <Route path="/user" component={createUser} />
      </Router>
    </div>
  );
};

export default App;
