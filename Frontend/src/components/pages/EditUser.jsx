import { useParams } from "react-router-dom";

export default function EditUser() {
  const { id } = useParams();

  return (
    <>
      <h1>Edit user {id} form</h1>
    </>
  );
}
