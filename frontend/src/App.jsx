import './App.css'
import BlogDetail from './pages/BlogDetail'
import Home from './pages/Home'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import List from './pages/dashboard/List'
import Create from './pages/dashboard/Create'
import Edit from './pages/dashboard/Edit'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />}/>
          <Route path='/blog/:id' element={<BlogDetail />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/dashboard' element={<List />} />
          <Route path='/blog/create' element={<Create />} />
          <Route path='/blog/edit/:id' element={<Edit />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
