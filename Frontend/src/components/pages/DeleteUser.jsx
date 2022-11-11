import { useParams } from "react-router-dom";

export default function DeleteUser() {
  const { id } = useParams();

  return (
    <>
      <h1>Delete user {id} form</h1>
    </>
  );
}
