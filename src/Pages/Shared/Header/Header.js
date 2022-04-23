import React from 'react';
import './Header.css'
import { Container, Nav, Navbar } from 'react-bootstrap';
import CustomLink from '../../../Customlink/Customlink';
import logo from '../../../images/logo-black.png'
import { Link } from 'react-router-dom';
import auth from '../../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';

const Header = () => {
  const [user, loading, error] = useAuthState(auth);
  // console.log(user)
  
  const logout = () => {
    signOut(auth);
  };
  return (
    <div className='menu_area'>
<Navbar fixed="top" expand="lg">
  <Container>
    <Navbar.Brand>
    <Link to='/'>
    <img
        src={logo}
        width="auto"
        height="30"
        className="d-inline-block align-top"
        alt="React Bootstrap logo"
      />
    </Link>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mx-auto">
      <CustomLink to='/'>Home</CustomLink>
        {/* <CustomLink to='/about'>About</CustomLink> */}
        {/* <CustomLink as={Link} to='home#services'>Services</CustomLink> */}
        <CustomLink to='/add-service'>Add Service</CustomLink>
        <CustomLink to='/manage'>Manage</CustomLink>
        <CustomLink to='/account'>Account</CustomLink>
        {user ? '' : <CustomLink to='/register'>Register</CustomLink>}
        {user ? '' :  <CustomLink to='/login'>Login</CustomLink>}
        {user ? <Link to='/' onClick={logout}>Logout</Link> : ''}
        {user ? <div className="user_info">
      {user?.photoURL ? <img src={user?.photoURL} alt={user?.displayName} title={user?.displayName} /> : user?.displayName || user?.email}
    </div> : ''}
      </Nav>
    </Navbar.Collapse>
    
  </Container>
</Navbar>
    </div>
  );
};

export default Header;