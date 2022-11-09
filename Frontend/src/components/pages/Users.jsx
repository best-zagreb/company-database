import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { usersData } from "../../data/users"; // temp data created with mockaroo

import Button from "@mui/material/Button";

export default function Users() {
  // TODO: add correct url to get data from
  // const [users, setUsers] = useState([]);

  // const fetchUsers = async () => {
  //   const data = await fetch("https://localhost:8080/users/get-all").json();

  //   setUsers(data);
  // };

  // useEffect(() => {
  //   fetchUsers();
  // }, []);

  return (
    <>
      <Link to="new">
        <Button variant="contained" size="large">
          New user
        </Button>
      </Link>
      {/* 
      <Link to="edit/1">
        <Button variant="outlined" size="large">
          TEST Edit user
        </Button>
      </Link>

      <Link to="delete/1">
        <Button variant="outlined" size="large">
          TEST Delete user
        </Button>
      </Link> */}

      <ul>
        {usersData.map((user) => (
          // TODO: display in table and add in each row edit and delete button
          <li key={user.id}>{user.nickname}</li>
        ))}
      </ul>
    </>
  );
}
