import { UserPost, CompanyPost, ProjectPost } from "./Post.jsx";

const UserListPage = ({ searchResults, editHandler, handleDelete }) => {
  const results = searchResults.map((user) => (
    <UserPost
      key={user.id}
      user={user}
      editHandler={editHandler}
      handleDelete={handleDelete}
    />
  ));

  return <>{results?.length > 0 && results}</>;
};

const CompanyListPage = ({ searchResults }) => {
  const results = searchResults.map((company) => (
    <CompanyPost key={company.id} company={company} />
  ));

  return <>{results?.length > 0 && results}</>;
};

const ProjectListPage = ({ searchResults }) => {
  const results = searchResults.map((project) => (
    <ProjectPost key={project.id} project={project} />
  ));

  return <>{results?.length > 0 && results}</>;
};

export { UserListPage, CompanyListPage, ProjectListPage };
