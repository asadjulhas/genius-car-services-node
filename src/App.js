import './App.css';
import Header from "./Pages/Shared/Header/Header";
import Footer from './Pages/Shared/Footer/Footer';
import {Routes, Route, useLocation} from "react-router-dom";
import Home from './Pages/Home/Home/Home'
import Login from './Pages/Home/Login/Login'
import About from './Pages/Home/About/About';
import 'bootstrap/dist/css/bootstrap.min.css';
import ServiceDetails from './Pages/ServiceDetails/ServiceDetails';
import Register from './Pages/Home/Register/Register';
import Account from './Pages/Home/Account/Account';
import RequireAuth from './RequireAuth';
import AddService from './Pages/Home/Services/AddService';
import ManageService from './Pages/Home/Services/ManageService';
import CheckOut from './Pages/CheckOut/CheckOut';



function App() {
  
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='home' element={<Home />}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/add-service' element={
          <RequireAuth>
            <AddService/>
          </RequireAuth>
        }/>
        <Route path='/manage' element={
          <RequireAuth>
            <ManageService/>
          </RequireAuth>
        }/>
        <Route path='/checkout/:id' element={
          <RequireAuth>
            <CheckOut/>
          </RequireAuth>
        }/>
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login />}/>
        <Route path='/service/:id' element={
          <RequireAuth>
        <ServiceDetails/>
        </RequireAuth>
        }/>
        <Route path='/account' element={
        <RequireAuth>
        <Account/>
        </RequireAuth>
        }/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
