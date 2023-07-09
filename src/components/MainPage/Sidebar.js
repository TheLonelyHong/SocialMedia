import React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { LinkContainer } from 'react-router-bootstrap';
import Nav from 'react-bootstrap/Nav';

const Sidebar = ({show , close , logout}) => {
  return (
    <Offcanvas show={show} onHide={close} placement='end' className="sidebar-background">
        <Offcanvas.Header closeButton>
                <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <hr/>
        <Offcanvas.Body className='padding-changed'>
                <Nav className='flex-column'>
                      <LinkContainer to="/main" onClick={close} className='sidebar-hover'>
                              <Nav.Link>
                                          <HomeIcon/>
                                          <span className='margin-left-sm'>Home</span>
                              </Nav.Link>
                      </LinkContainer>
                      <LinkContainer to="/setting" onClick={close} className='sidebar-hover'>
                            <Nav.Link>
                                  <SettingsIcon/>
                                  <span className='margin-left-sm'>Settings</span>
                            </Nav.Link>
                      </LinkContainer>
                      <LinkContainer to="/personal" onClick={close} className='sidebar-hover'>
                            <Nav.Link>
                                  <PersonIcon/>
                                  <span className='margin-left-sm'>Profile</span>
                            </Nav.Link>
                      </LinkContainer>
                      <LinkContainer to="/searchFriends" onClick={close} className='sidebar-hover'>
                            <Nav.Link>
                                  <PersonAddIcon/>
                                  <span className='margin-left-sm'>Search Friends</span>
                            </Nav.Link>
                      </LinkContainer>
                      <LinkContainer to="/friendList" onClick={close} className='sidebar-hover'>
                            <Nav.Link>
                                  <PeopleIcon/>
                                  <span className='margin-left-sm'>Friend List</span>
                            </Nav.Link>
                      </LinkContainer>
                        <Nav.Link 
                              onClick={() => {
                                    logout();
                                    close();
                              }} 
                              className='sidebar-hover'
                        >
                                <LogoutIcon/>
                                <span className='margin-left-sm'>Logout</span>
                        </Nav.Link>
                </Nav>
        </Offcanvas.Body>
    </Offcanvas>
  )
}

export default Sidebar