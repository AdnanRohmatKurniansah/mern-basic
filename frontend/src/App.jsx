import './App.css'
import Home from './pages/Home'
import Register from './pages/auth/Register'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />}/>
        <Route path='/register' element={<Register />}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
