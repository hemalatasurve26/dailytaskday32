import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

    if (name.length == 0) {
      alert("Invalid Form, Name can not be empty");
      return;
    }

    // Check if the Email is an Empty string or not.

    if (email.length == 0) {
      alert("Invalid Form, Email Address can not be empty");
      return;
    }
    if (phone.length == 10) {
      alert(
        "Invalid Form, Phone must contain greater than or equal to 10 number."
      );
      return;
    }
    if (teacher.length == 0) {
      alert("Invalid Form, Teacher can not empty");
      return;
    }
    if (batch.length == 0) {
      alert("Invalid Form, batch can not empty");
      return;
    }
    if (marks.length == 0) {
      alert("Invalid Form, marks can not empty");
      return;
    }

    alert("Form is valid");
  }

  //

  return (
    <div>
      <div className="add-user">
        <TextField
          onChange={(event) => setName(event.target.value)}
          id="edName"
          label="Name"
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
          variant="standard"
        />

        <TextField
          onChange={(event) => setPhone(event.target.value)}
          label="Phone"
          variant="standard"
        />

        <TextField
          onChange={(event) => setTeacher(event.target.value)}
          label="Teacher"
          variant="standard"
        />

        <TextField
          onChange={(event) => setBatch(event.target.value)}
          label="Batch"
          variant="standard"
        />

        <TextField
          onChange={(event) => setMarks(event.target.value)}
          label="Marks"
          variant="standard"
        />
      </div>

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
          console.log(newStudent);
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
              .then(() => navigate("/list-students"));
          }
        }}
        variant="contained"
      >
        Add Student
      </Button>
    </div>
  );
};

export default CreateStud;
