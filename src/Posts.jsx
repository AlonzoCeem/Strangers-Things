import { Link } from 'react-router-dom';

const Posts = ({ posts, auth })=> {
  return (
    <ul>
      {
        posts.map( post => {
          return (
            <li key={ post._id } className="post" id={ post.author._id === auth._id ? 'mine': ''}>
              <Link to={`/posts/${post._id}`} className="postLink"><div className="postDiv" id="postTitle">{ post.title }</div></Link>
              <div className="postDiv" id="postPrice"> Price: <br/>{ isNaN(post.price) === false ? `$${(post.price*1).toFixed(2)}` : `${post.price}` }</div> 
              <div className="postDiv" id="postAuthor"> Poster:  <br/>{post.author.username}</div> 
              <div className="postDiv" id="postLocation"> Location: {post.location}</div>
            </li>
          );
        })
      }
    </ul>
  );
};

export default Posts;

