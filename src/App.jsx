import { useState, useEffect } from 'react'
import api from './api';
import AuthForm from './AuthForm';
import CreatePost from './CreatePost';
import Posts from './Posts';
import Post from './Post';
import AboutUs from './AboutUs';
import Expensive from './Expensive';

import { useNavigate, useParams, Link, Routes, Route } from 'react-router-dom';

function App() {
  const [auth, setAuth] = useState({});
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();

  useEffect(()=> {
    const fetchPosts = async()=> {
      const posts = await api.fetchPosts();
      setPosts(posts);
    };
    fetchPosts();
  }, []);

  useEffect(()=> {
    const attemptLogin = async()=> {
      try {
        const _auth = await api.loginWithToken();
        setAuth(_auth);
      }
      catch(ex){
        console.log(ex);
      }
    };
    attemptLogin();
  }, []);

  const register = async(credentials)=> {
    const _auth = await api.register(credentials);
    setAuth(_auth);
  };

  const login = async(credentials)=> {
    const _auth = await api.login(credentials);
    setAuth(_auth);
  };

  const logout = ()=> {
    api.logout();
    setAuth({});
  };

  const createPost = async(post)=> {
    post = await api.createPost(post);
    setPosts([...posts, post]);
    navigate(`/posts/${post._id}`);
  };

  const Contact = ()=> {
    return (
      <div>
        <h1>Contact Us!</h1>
        <p>Phone: xxx-xxx-xxxx</p>
        <p>Email: SevenAteNine@example.com</p>
        <p>Address: 123 Street</p>
      </div>
    )
  }

  return (
    <>
      <h1><Link to='/'>Strangers Things (Total # of posts: { posts.length })</Link></h1>
      {
        auth.username ? (
          <div>
            <h1>
              Welcome { auth.username } {`(# of your posts: ${ auth.posts.filter( post => post.active === true).length })`}
              <br/>
              <button onClick={ logout }>Logout</button>
            </h1>
            <Link to='/about_us'> About Us </Link>
            <Link to='/contact'> Contact </Link>
            <Link to='/posts/create'> Create A Post </Link>
            <Link to='/expensive'> Most Expensive </Link>
            <Routes>
              <Route path='/posts/create' element={ <CreatePost createPost={ createPost } />} />
            </Routes>
          </div>
        ): (
          <>
            <AuthForm submit={ register } txt='Register'/>
            <AuthForm submit={ login } txt='Login'/>
            <Link to='/about_us'> About Us </Link>
            <Link to='/contact'> Contact </Link>
            <Link to='/expensive'> Most Expensive </Link>
          </>
        )
      }
      <Posts posts={ posts } auth={ auth }/>
      <Routes>
        <Route path='/posts/:id' element={ <Post posts={ posts } auth={ auth } setPosts={ setPosts }/>} />
        <Route path='/about_us' element={ <AboutUs />} />
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/expensive' element={<Expensive posts={posts}/>}/>
      </Routes>
    </>
  )
}

export default App
