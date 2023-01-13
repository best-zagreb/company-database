import { UserPost, CompanyPost, ProjectPost } from "./Post.jsx";

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

const CompanyListPage = ({ searchResults }) => {
  const results = searchResults.map((post) => (
    <CompanyPost key={post.id} company={post} />
  ));

  return <>{results?.length > 0 && results}</>;
};

const ProjectListPage = ({ searchResults, handleDelete }) => {
  const results = searchResults.map((post) => (
    <ProjectPost key={post.id} project={post} />
  ));

  return <>{results?.length > 0 && results}</>;
};

export { UserListPage, CompanyListPage, ProjectListPage };
