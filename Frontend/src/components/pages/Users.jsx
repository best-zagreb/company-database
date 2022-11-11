import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { usersData } from "../../data/users"; // temp data created with mockaroo
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import {Box, TextField,TableCell, TableHead,Paper,TableContainer,TableRow,TableBody,Table } from "@mui/material";


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


  //zanemari endpoint ceka se zadnja verzija backenda
  const deleteUser = async (userid) => {
    await fetch("http://localhost:8080/users/delete-user/"+userid, {
      method: "POST"
     
      
    });
  };

  const handleDelete = (e,userid) => {
    e.preventDefault();

    console.log("user"+userid +" Deleted");
    deleteUser(userid).then((res) => {
      // display success or error msg
      navigate("/users");
    });
  };
  let navigate = useNavigate();

  function editHandler(e,userid) {
    e.preventDefault()
    

   
        navigate(`edit/${userid}`);
     
  }

  function search(e) {
    e.preventDefault()
    console.log(document.getElementById('search').value)
    


  }
  

  return (
    <>
      <Link to="new">
        <Button variant="contained" size="large"  >
          New user
        </Button>
      </Link>
     <Box m={1}>
      <TextField id="search" label="Search" variant="filled" />
      <Button variant="contained" size="small" onClick={(e)=>search(e)}  >
          Search
        </Button>
        </Box>
   
    
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
            <TableCell>User Nickname</TableCell>
            <TableCell>Edit User</TableCell>
            <TableCell>Delete User</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {usersData.map((user) => (
            <TableRow key={user.id} className={user.nickname}>
              <TableCell>
                {user.nickname}
              </TableCell>
              <TableCell>
                <Button variant="outlined" size="large"
                  onClick={(e) => editHandler(e,user.id)}>
                  Edit user
                </Button>
              </TableCell>
              <TableCell>
                <Button variant="outlined" size="large"  
                  onClick={(e) => handleDelete(e,user.id)}>
                    
                  Delete user
                </Button>
              </TableCell>
            </TableRow>
             ))} 
          </TableBody>
        </Table>
      </TableContainer>
  
      
        
      
      
      
    </>
  );
}
