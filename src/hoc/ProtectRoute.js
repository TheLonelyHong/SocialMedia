import React from 'react';
import { useLocation , Navigate } from 'react-router-dom';
import { auth } from '../config/firebase';

const ProtectRoute = (props) => {
      const location = useLocation();

      if(auth?.currentUser?.email){
            return <Navigate to="/main" state={{from:location}} replace/>
      }

      return props.children;

}

export default ProtectRoute