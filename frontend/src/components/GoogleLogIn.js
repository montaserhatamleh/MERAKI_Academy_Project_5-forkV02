import React, { useContext } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setToken, setUserId,setRole } from '../redux/auth';

;const GoogleLogIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const responseGoogle = async (response) => {

    try {
      const res = await axios.post(`http://localhost:5000/users/google-login`, {
        token: response.credential,
      });
      dispatch(setToken(res.data.token)) 
      dispatch(setRole(res.data.role)) 
      dispatch(setUserId(res.data.userID)) 
      navigate('/');
    } catch (error) {
      console.error('Google login error', error);
    }
  };

  return (
    <GoogleLogin
      onSuccess={responseGoogle}
      onError={() => {
        console.error('Login Failed');
      }}
    />
  );
};

export default GoogleLogIn;
