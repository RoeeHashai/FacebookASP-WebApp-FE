import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login/Login'
import Signup from './components/signup/Signup'
import Feed from './components/feed/Feed'
import { useState } from 'react'
function App() {
  const [users, setUsers] = useState([])
  const addUser = (user) => {
    setUsers((prevUsers) => [...prevUsers, user])
    // Log the updated users array
    console.log(users);
  };
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup onAddUser={addUser} />} />
        <Route path='/feed' element={<Feed />} />
      </Routes>
    </Router>
  );
}

export default App;
