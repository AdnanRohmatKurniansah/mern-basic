import './App.css'
import BlogDetail from './pages/BlogDetail'
import Home from './pages/Home'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />}/>
        <Route path='/blog' element={<BlogDetail />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={<Login />}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
