import './App.css';
import { BrowserRouter , Route , Routes } from 'react-router-dom';
import Login from './components/LoginRegister/Login';
import Register from './components/LoginRegister/Register';
import Main from './components/MainPage/Main';
import UserProfile from './components/SidePage/UserProfile';
import UserSetting from './components/SidePage/UserSetting';
import UserFriendList from './components/SidePage/UserFriendList';
import FriendListPage from './components/SidePage/FriendListPage';
import MainLayout from './hoc/MainLayout';
import ProtectMainRoute from './hoc/ProtectMainRoute';
import ProtectRoute from './hoc/ProtectRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';
import { Loader } from './utils/tools';

function App() {

  const [loading , setLoading] = useState(true);

  useEffect(() => {
          onAuthStateChanged(auth , (user) => {
                    if(user){
                        setLoading(false);
                    }else{
                        setLoading(false);
                    }
          })
          // eslint-disable-next-line
  } , []);

  return (
      <>
          {loading ? 
            <>
              <Loader/>
            </>
          : 
            <>
                <BrowserRouter>
                      <MainLayout>
                        <Routes>
                              <Route path='/' element={
                                <ProtectRoute>
                                    <Login/>
                                </ProtectRoute>
                              }/>
                              <Route path='/register' element={
                                <ProtectRoute>
                                  <Register/>
                                </ProtectRoute>
                              }/>
                              <Route path='/main' element={
                                        <ProtectMainRoute>
                                          <Main/>
                                        </ProtectMainRoute>
                              }/>
                              <Route path="/setting" element={
                                  <ProtectMainRoute>
                                    <UserSetting/>
                                  </ProtectMainRoute>
                              }/>
                              <Route path='/personal' element={
                                    <ProtectMainRoute>
                                      <UserProfile/>
                                    </ProtectMainRoute>
                              }/>
                              <Route path='/searchFriends' element={
                                   <ProtectMainRoute>
                                    <FriendListPage/>
                                  </ProtectMainRoute>
                              }/>
                              <Route path='/friendList' element={
                                    <ProtectMainRoute>
                                      <UserFriendList/>
                                    </ProtectMainRoute>
                              }/>
                              <Route path='*' element={<h3>404 Not Found</h3>}/>
                        </Routes>
                      </MainLayout>
                </BrowserRouter>              
            </>
          }
      </>
  );
}

export default App;
