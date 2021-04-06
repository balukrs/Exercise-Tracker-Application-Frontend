import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

const Exerciselist = () => {
  const [exerdb, setExerdb] = useState([]);

  useEffect(() => {
    dataFetch();
  }, []);

  // Async func

  const dataFetch = async () => {
    const response = await Axios.get(
      "https://exercise-app-bcknd.herokuapp.com/exercises"
    );
    setExerdb(response.data);
  };
  const deleteExercise = (id) => {
    const del = async () =>
      await Axios.delete(
        `https://exercise-app-bcknd.herokuapp.com/exercises/${id}`
      );
    del();
    const filtered = exerdb.filter((item) => item._id !== id);
    setExerdb(filtered);
  };

  const tableData = () => {
    if (exerdb.length) {
      return exerdb.map((item) => {
        return (
          <tr key={item._id}>
            <td className="tablerows">{item.username}</td>
            <td className="tablerows">{item.description}</td>
            <td className="tablerows">{item.duration}</td>
            <td className="tablerows">{item.date}</td>
            <td className="tablerows">
              <Link to={`/edit/${item._id}`} className="text-sm text-blue-900">
                Edit
              </Link>
              {` | `}
              <button
                className="text-sm text-blue-900"
                onClick={() => {
                  deleteExercise(item._id);
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      });
    }
    return null;
  };

  return (
    <div>
      <table className="w-10/12 m-auto mt-4">
        <tbody>
          <tr>
            <th className="tablehead">Username</th>
            <th className="tablehead">Description</th>
            <th className="tablehead">Duration</th>
            <th className="tablehead">Date</th>
            <th className="tablehead">Actions</th>
          </tr>
          {tableData()}
        </tbody>
      </table>
    </div>
  );
};

export default Exerciselist;
