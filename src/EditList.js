import React from "react";
import { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

const EditList = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  function getStudents() {
    fetch("https://6464a915127ad0b8f8a46ccb.mockapi.io/students", {
      method: "GET",
    })
      .then((data) => data.json())
      .then((res) => setStudents(res))
      .catch((e) => console.log(e));
  }

  useEffect(() => getStudents(), []);

  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Teacher</th>
            <th scope="col">Batch</th>
            <th scope="col">Marks</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((stud) => {
            return (
              <tr>
                <th scope="row">{stud.id}</th>
                <td>{stud.name}</td>
                <td>{stud.email}</td>
                <td>{stud.phone}</td>
                <td>{stud.teacher}</td>
                <td>{stud.batch}</td>
                <td>{stud.marks}</td>
                <td>
                  <IconButton
                    onClick={() => navigate(`/edit-student/${stud.id}`)}
                    color="secondary"
                  >
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    onClick={() => navigate(`/delete-student/${stud.id}`)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default EditList;
