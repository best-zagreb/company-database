import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function NewUser() {
  const { id } = useParams(); //potrebno za fetch endpoint
  const [name, setName] = useState();
  const navigate = useNavigate();
  //VAZNO:Ovo je kopirani kod sa newUser.jsx 

  // TODO: Samo promijeniti fetch endpoint i staviti
  // potrebne inpute i stateove kad cemo se odluciti sto edit radi
  const namePost = async () => {
    await fetch("http://localhost:8080/users/add-user", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nickname: name, maxAuthLevel: "observer" }),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("form submited " + name);
    namePost().then((res) => {
      // display success or error msg
      navigate("/users");
    });
  };

  return (
    <>
      <h1>Edit user {id} form</h1>

      {/* TODO: add form with inputs for all data */}
      <form onSubmit={handleSubmit}>
        <input onChange={(e) => setName(e.target.value)} value={name}></input>
        <button type="submit">Click to submit</button>
      </form>
    </>
  );
}
