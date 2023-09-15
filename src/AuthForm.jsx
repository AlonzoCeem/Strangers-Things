import { useState } from 'react'
import api from './api';


const AuthForm = (props)=> {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ error, setError ] = useState('');

  const submit = async(ev)=> {
    ev.preventDefault();
    try {
      await props.submit({username, password});
    }
    catch(ex){
      if(ex.response){
        setError(ex.response.data);
      }
      else {
        setError(ex);
      }
    }
  };

  return (
    <form onSubmit={ submit }>
      {
        error ? JSON.stringify(error, null, 2) : null
      }
      <input placeholder="Username" value={ username } onChange={ ev => setUsername(ev.target.value )}/>
      <input placeholder="Password" value={ password } onChange={ ev => setPassword(ev.target.value )}/>
      {
        username === '' || password === '' ? <button disabled>{ props.txt }</button> : <button>{ props.txt }</button>
      }
    </form>
  );
};

export default AuthForm;
