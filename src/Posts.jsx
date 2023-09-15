import { Link } from 'react-router-dom';

const Posts = ({ posts, auth })=> {
  return (
    <ul>
      {
        posts.map( post => {
          return (
            <li key={ post._id } className={ post.author._id === auth._id ? 'mine': ''}>
              <Link to={`/posts/${post._id}`}> { post.title } </Link>
              <strong>Price:</strong> { isNaN(post.price) === false ? `$${(post.price*1).toFixed(2)}` : `${post.price}` } <strong>Poster:</strong> {post.author.username} <strong>Location:</strong> {post.location}
            </li>
          );
        })
      }
    </ul>
  );
};

export default Posts;

