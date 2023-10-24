import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const DeleteTeach = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://6464a915127ad0b8f8a46ccb.mockapi.io/teachers/${id}`, {
      method: "DELETE",
    }).then(() => navigate("/edit-teacher"));
  }, []);

  return <div></div>;
};

export default DeleteTeach;
