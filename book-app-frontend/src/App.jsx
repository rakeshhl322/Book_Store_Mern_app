import './App.css'
import Navbar from './Components/Navbar/Navbar'
import Home from './Components/Pages/Home'
import Footer from './Components/Footer/Footer'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import AllBooks from './Components/Pages/AllBooks'
import Login from './Components/Pages/Login'
import Signup from './Components/Pages/Signup'
import Cart from './Components/Pages/Cart'
import Profile from './Components/Pages/Profile'
import About from './Components/Pages/About'
function App() {

  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
       <Route exact path="/" element={<Home/>}/>
       <Route  path="/all-books" element={<AllBooks/>}/>
       <Route  path="/login" element={<Login/>}/>
       <Route  path="/signup" element={<Signup/>}/>
       <Route  path="/cart" element={<Cart/>}/>
       <Route  path="/profile" element={<Profile/>}/>
       <Route  path="/about-us" element={<About/>}/>
      </Routes>
      <Footer/>
    </Router>
     
      
    </>
  )
}

export default App
