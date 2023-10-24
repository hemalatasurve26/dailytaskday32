import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const CreateStud = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [teacher, setTeacher] = useState("");
  const [batch, setBatch] = useState("");
  const [marks, setMarks] = useState("");

  const navigate = useNavigate();

  // validation

  function validateForm() {
    // Check if the First Name is an Empty string or not.

    if (name.length === 0) {
      alert("Invalid Form, Name can not be empty");
      return;
    }

    // Check if the Email is an Empty string or not.

    if (email.length === 0) {
      alert("Invalid Form, Email Address can not be empty");
      return;
    }
    if (phone.length < 10) {
      alert(
        "Invalid Form, Phone must contain greater than or equal to 10 number."
      );
      return;
    }
    if (teacher.length === 0) {
      alert("Invalid Form, Teacher can not empty");
      return;
    }
    if (batch.length === 0) {
      alert("Invalid Form, batch can not empty");
      return;
    }
    if (marks.length === 0) {
      alert("Invalid Form, marks can not empty");
      return;
    }

    // alert("Form is valid");
  }

  //view list

  const [students, setStudents] = useState([]);

  function getStudents() {
    fetch("https://6464a915127ad0b8f8a46ccb.mockapi.io/students", {
      method: "GET",
    })
      .then((data) => data.json())
      .then((res) => setStudents(res))
      .catch((e) => console.log(e));
  }

  useEffect(() => getStudents(), []);

  //Edit student
  const { id } = useParams();

  const [student, setStudent] = useState("");
  //   const [students, setStudents] = useState([]);

  function editStudents() {
    fetch(`https://6464a915127ad0b8f8a46ccb.mockapi.io/students/${id}`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((res) => setStudent(res))
      .catch((e) => console.log(e));
  }

  useEffect(() => editStudents(), []);


  return (
    <>
      <div>
        <div className="add-user">
          <TextField
            onChange={(event) => setName(event.target.value)}
            id="edName"
            label="Name"
            value={name}
            variant="standard"
          />
          {/* <input
          type="text"
          name="name"
          required
          onChange={(event) => setName(event.target.value)}
        /> */}

          <TextField
            onChange={(event) => setEmail(event.target.value)}
            label="Email"
            value={email}
            variant="standard"
          />

          <TextField
            onChange={(event) => setPhone(event.target.value)}
            label="Phone"
            value={phone}
            variant="standard"
          />

          <TextField
            onChange={(event) => setTeacher(event.target.value)}
            label="Teacher"
            value={teacher}
            variant="standard"
          />

          <TextField
            onChange={(event) => setBatch(event.target.value)}
            label="Batch"
            value={batch}
            variant="standard"
          />

          <TextField
            onChange={(event) => setMarks(event.target.value)}
            label="Marks"
            value={marks}
            variant="standard"
          />
        </div>
        ;
        <Button
          className="add-button"
          onClick={() => {
            validateForm();
            const newStudent = {
              name: name,
              email: email,
              phone: phone,
              teacher: teacher,
              batch: batch,
              marks: marks,
            };

            if (
              newStudent.name !== "" &&
              newStudent.email !== "" &&
              newStudent.phone !== "" &&
              newStudent.teacher !== "" &&
              newStudent.batch !== "" &&
              newStudent.marks !== ""
            ) {
              fetch("https://6464a915127ad0b8f8a46ccb.mockapi.io/students", {
                method: "POST",
                body: JSON.stringify(newStudent),
                headers: {
                  "Content-Type": "application/json",
                },
              })
                .then((data) => data.json())

                .then(() => navigate("/create-list"));
            }
          }}
          variant="contained"
        >
          Add Student
        </Button>
      </div>
      <br></br>
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
              <th scope="col">Action</th>
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
                      onClick={() => navigate(`/create-list/${stud.id}`)}
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
    </>
  );
};

export default CreateStud;
