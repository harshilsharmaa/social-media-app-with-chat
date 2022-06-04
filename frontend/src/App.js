import './App.css';
import Header from './components/Header';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Account from './components/Account/Account';
import Messanger from './components/Messanger/Messanger';
import Register from './components/Register/Register'
import UpdateProfile from './components/UpdateProfile/UpdateProfile';
import UpdatePassword from './components/UpdatePassword/UpdatePassword';
import NewPost from './components/NewPost/NewPost';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import ResetPassword from './components/ResetPassword/ResetPassword';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {useEffect} from 'react'
import {loadUser} from './Actions/User';
import UserProfile from './components/UserProfile/UserProfile';
import Search from './components/Search/Search';
import NotFound from './components/NotFound/NotFound';


function App() {

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(loadUser());
  }, [dispatch])

  const {isAuthenticate} = useSelector((state)=>state.user);

  return (
    <Router>

      {
        isAuthenticate && <Header/>
      }


      <Routes>
        <Route path='/' element={isAuthenticate? <Home/> : <Login/>}></Route>
        <Route path='/register'  element={isAuthenticate? <Account/> :<Register/>}></Route>
        <Route path='/account' element={isAuthenticate? <Account/> : <Login/>}></Route>
        <Route path='/messanger' element={isAuthenticate? <Messanger/> : <Login/>}></Route>
        <Route path='/newpost' element={isAuthenticate? <NewPost/> : <Login/>}></Route>
        <Route path='/update/profile' element={isAuthenticate? <UpdateProfile/> : <Login/>}></Route>
        <Route path='/update/password' element={isAuthenticate? <UpdatePassword/> : <Login/>}></Route>
        <Route path='/forgot/password' element={isAuthenticate? <UpdatePassword/> : <ForgotPassword/>}></Route>
        <Route path='/password/reset/:token' element={<ResetPassword/>}></Route>
        <Route path='/user/:id' element={isAuthenticate? <UserProfile/> : <Login/>}></Route>
        <Route path='search' element={isAuthenticate? <Search/> : <Login/>}></Route>
        <Route path='messanger' element={isAuthenticate? <Messanger/> : <Login/>}></Route>
        <Route path='*' element={<NotFound/>}></Route>


      </Routes>

    </Router>
  )
}

export default App;
