import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login/Login'
import Signup from './components/signup/Signup'
import Feed from './components/feed/Feed'
import { useState } from 'react'
function App() {
  const [users, setUsers] = useState([])
  const addUser = (user) => {
    console.log(users);
    setUsers((prevUsers) => [...prevUsers, user])
  };
  const [connectedUser, setConnectedUser] = useState(null)
  const addConnectedUser = (user) => {
    console.log('user is connected: ' + user)
    setConnectedUser(user)
  }
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login users={users} addConnectedUser={addConnectedUser} />} />
        <Route path='/signup' element={<Signup users={users} onAddUser={addUser} />} />
        <Route path='/feed' element={<Feed user = {connectedUser}/>} />
      </Routes>
    </Router>
  );
}

export default App;
