import './App.css'
import Navbar from './Components/Navbar/Navbar'
import Home from './Components/Pages/Home'
import Footer from './Components/Footer/Footer'
import {Routes,Route } from 'react-router-dom'
import AllBooks from './Components/Pages/AllBooks'
import Login from './Components/Pages/Login'
import Signup from './Components/Pages/Signup'
import Cart from './Components/Pages/Cart'
import Profile from './Components/Pages/Profile'
import About from './Components/Pages/About'
import ViewBookDetails from './Components/ViewBookDetails/ViewBookDetails'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { authActions } from './store/auth'
import Favourites from './Components/Profile/Favourites'
import OrderHistory from './Components/Profile/OrderHistory'
import Settings from './Components/Profile/Settings'
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if(localStorage.getItem("id") && localStorage.getItem("token") && localStorage.getItem("role")){
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  },[])
  return (
    <>
      <Navbar/>
      <Routes>
       <Route exact path="/" element={<Home/>}/>
       <Route  path="/all-books" element={<AllBooks/>}/>
       <Route  path="/login" element={<Login/>}/>
       <Route  path="/signup" element={<Signup/>}/>
       <Route  path="/cart" element={<Cart/>}/>
       <Route  path="/profile" element={<Profile/>}>
              <Route  path="/profile/favourites" element={<Favourites/>}/>
              <Route  path="/profile/orderHistory" element={<OrderHistory/>}/>
              <Route  path="/profile/settings" element={<Settings/>}/>

       </Route>
       <Route  path="/about-us" element={<About/>}/>
       <Route  path="/view-book-details/:id" element={<ViewBookDetails/>}/>
      </Routes>
      <Footer/>
     
      
    </>
  )
}

export default App
