import { UserPost, CompanyPost } from "./Post.jsx";

const UserListPage = ({ searchResults, editHandler, handleDelete }) => {
  const results = searchResults.map((post) => (
    <UserPost
      key={post.id}
      user={post}
      editHandler={editHandler}
      handleDelete={handleDelete}
    />
  ));

  return <>{results?.length > 0 && results}</>;
};

const CompanyListPage = ({ searchResults, handleDelete }) => {
  const results = searchResults.map((post) => (
    <CompanyPost key={post.id} company={post} handleDelete={handleDelete} />
  ));

  return <>{results?.length > 0 && results}</>;
};

export { UserListPage, CompanyListPage };
