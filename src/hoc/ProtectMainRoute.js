import React from 'react';
import { auth } from '../config/firebase';
import { Navigate , useLocation } from 'react-router-dom';

const ProtectMainRoute = (props) => {

  const location = useLocation();

  if(!auth?.currentUser?.email){
      return <Navigate to="/" state={{from:location}} replace/>
  }

  return props.children;
  
}

export default ProtectMainRoute