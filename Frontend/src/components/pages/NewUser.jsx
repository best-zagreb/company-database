import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function NewUser() {
  const [name, setName] = useState();
  const navigate = useNavigate();

  // TODO: post to correct URL
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
      <h1>New user form</h1>

      {/* TODO: add form with inputs for all data */}
      <form onSubmit={handleSubmit}>
        <input onChange={(e) => setName(e.target.value)} value={name}></input>
        <button type="submit">Click to submit</button>
      </form>
    </>
  );
}
