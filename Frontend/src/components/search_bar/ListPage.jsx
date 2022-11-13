import Post from "./Post.jsx";

const ListPage = ({ searchResults, editHandler, handleDelete }) => {
  const results = searchResults.map((post) => (
    <Post
      key={post.id}
      user={post}
      editHandler={editHandler}
      handleDelete={handleDelete}
    />
  ));

  return <>{results?.length > 0 ? results : "No Matching Posts"}</>;
};

export default ListPage;
