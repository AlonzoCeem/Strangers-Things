import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import api from "./api";

const EditPost = ({ post, setPosts, posts })=> {
    const [price, setPrice] = useState(post.price);
    const [description, setDescription] = useState(post.description);
    const [title, setTitle] = useState(post.title);
    const [location, setLocation] = useState(post.location);
    const [error, setError] = useState('');
    const navigate = useNavigate()

    const postId = post._id

    const editPost = async (postDetails) => {
        const updatedPost = await api.editPost(postDetails, postId);
        navigate(`/`);
        const newPosts = posts.filter( p => p !== post)
        newPosts.push(updatedPost)
        setPosts(newPosts)
      }

    const submit = async(ev)=> {
        ev.preventDefault();
        try {
            const postDetails = {price, title, description, location };
            await editPost(postDetails);
        }
        catch(ex){
            if(ex.response){
                setError(ex.response.data);
            }
            else {
                setError(ex.response);
            }
        }
    };

    return (
        <div>
        <h1>Edit</h1>
        <form onSubmit={ submit }>
            {
            error ? JSON.stringify(error, null, 2) : null
            }
            <input placeholder={post.title} onChange={ev => setTitle(ev.target.value)} />
            <input placeholder={post.description} onChange={ev => setDescription(ev.target.value)} />
            <input placeholder={post.price}onChange={ev => setPrice(ev.target.value)} />
            <input placeholder={post.location} onChange={ev => setLocation(ev.target.value)} />
            <button>Edit</button>
        </form>
        <Link to='/'>Cancel</Link>
        </div>
    );
}

export default EditPost