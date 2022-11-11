import { useState } from "react";
import { usersData } from "../../data/users"; // temp data created with mockaroo
import UserForm from "../forms/UserForm";

import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export default function Users() {
  const [openUserFormModal, setOpenUserFormModal] = useState(false);

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
      <Button
        variant="contained"
        size="large"
        startIcon={<AddCircleIcon />}
        onClick={() => setOpenUserFormModal(true)}
      >
        Add user
      </Button>

      <ul>
        {usersData.map((user) => (
          // TODO: display in table and add in each row edit and delete button
          <li key={user.id}>{user.nickname}</li>
        ))}
      </ul>

      <UserForm
        openModal={openUserFormModal}
        setOpenModal={setOpenUserFormModal}
      />
    </>
  );
}
