import Post from "./Post.js"

const ListPage = ({searchResults,editHandler,handleDelete}) => {

    const results = searchResults.map(post => <Post key = {post.id} user=
        {post} editHandler = {editHandler} handleDelete = {handleDelete} />)

     const content = results?.length ? results : <article><p>No Matching Posts</p></article>   

     return (
        <>
         {content}
        </>
     )
}

export default ListPage