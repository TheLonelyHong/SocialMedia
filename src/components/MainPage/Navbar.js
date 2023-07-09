import React, { useEffect, useState } from 'react';
import Navbars from 'react-bootstrap/Navbar';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import { LinkContainer } from 'react-router-bootstrap';
import Sidebar from './Sidebar';
import { useDispatch , useSelector } from 'react-redux';
import { logoutUser , extractUserDataOut } from '../../redux/Action/userThunk';
import { useNavigate } from 'react-router-dom';
import { showMsg } from '../../utils/tools';
import { clearGlobal } from '../../redux/Slice/globalSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../config/firebase';

const Navbar = () => {

    const [show , setShow] = useState(false);
    const dispatch = useDispatch();
    const notification = useSelector(state => state.global);
    const user = useSelector(state => state.user);
    const navigate = useNavigate();

    const handleOpen = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleLogout = () => {
                dispatch(logoutUser());
                showMsg("SUCCESS" , "Sign Out Successfully !");
                navigate("/");
    };

    useEffect(() => {
                const { error , global } = notification;
                if(error === true){
                        showMsg("SUCCESS" , global);
                        dispatch(clearGlobal());
                }else if(error === false){
                        showMsg("ERROR" , global);
                        dispatch(clearGlobal());
                }
                // eslint-disable-next-line
    } , [notification]);

    useEffect(() => {
                onAuthStateChanged(auth , (user) => {
                                if(user){
                                        dispatch(extractUserDataOut({email:user.email}));
                                }
                })
                // eslint-disable-next-line
    } , []);

  return (
     <>
        {
                user.current ? 
                        <Navbars expand="lg" className='navbar-background' fixed='top'>
                                        <div className='container d-flex justify-content-between align-items-center'>
                                                <LinkContainer to="/main"> 
                                                <Navbars.Brand><h2 className='font-navbar-head'>Welcome {user.current.username}</h2></Navbars.Brand>
                                                </LinkContainer>
                                                <div className='d-flex justify-content-between align-items-center gap-2'>
                                                        <button type='button' className='btn'>
                                                                <WbSunnyIcon className='font-navbar-bigger' titleAccess='Dark Mode'/>
                                                        </button>
                                                        <div className='display-none'>
                                                        <div className='d-flex justify-content-between align-items-center gap-2 display-none'>
                                                                <LinkContainer to="/main">
                                                                        <HomeIcon className='font-navbar-bigger' titleAccess='Home'/>
                                                                </LinkContainer>
                                                                <LinkContainer to="/setting">
                                                                        <SettingsIcon className='font-navbar-bigger' titleAccess='Setting'/>
                                                                </LinkContainer>
                                                                <LinkContainer to="/personal">
                                                                        <PersonIcon className='font-navbar-bigger' titleAccess='Profile'/>
                                                                </LinkContainer>
                                                                <LinkContainer to="/searchFriends">
                                                                        <PersonAddIcon className='font-navbar-bigger' titleAccess='Search Friend'/>
                                                                </LinkContainer>
                                                                <LinkContainer to="/friendList">
                                                                        <PeopleIcon className='font-navbar-bigger' titleAccess='Friend List'/>
                                                                </LinkContainer>
                                                                <button type='button' className='btn' onClick={() => handleLogout()}>
                                                                        <LogoutIcon className='font-navbar-bigger' titleAccess='Sign Out'/>
                                                                </button>
                                                        </div>
                                                        </div>
                                                        <div className='display-block'>
                                                                <button type='button' className='btn btn-primary' onClick={() => handleOpen()}>
                                                                        <MenuIcon/>
                                                                </button>
                                                                <Sidebar close = {handleClose} show = {show} logout = {handleLogout}/>
                                                        </div>
                                                </div>
                                        </div>
                        </Navbars>                        
                : null
        }   
     </>
  )
}

export default Navbar