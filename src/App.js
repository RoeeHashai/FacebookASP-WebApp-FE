import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import Feed from './components/feed/Feed';
import usersData from './data/users.json';
import { useState } from 'react';

function App() {
  // State for storing users lists - init it with a json of user
  const [users, setUsers] = useState([...usersData]);
  const addUser = (user) => {
    setUsers((prevUsers) => [...prevUsers, user]);
  };

  // State for tracking the connected user
  const [connectedUser, setConnectedUser] = useState(null);
  const addConnectedUser = (user) => {
    setConnectedUser(user);
  };

  return (
    <Router>
      <Routes>
        {/* Route for login, using the Login component */}
        <Route path='/' element={<Login users={users} addConnectedUser={addConnectedUser} />} />

        {/* Additional route for login, in case it's needed */}
        <Route path='/login' element={<Login users={users} addConnectedUser={addConnectedUser} />} />

        {/* Route for signup, using the Signup component */}
        <Route path='/signup' element={<Signup users={users} onAddUser={addUser} idNewUser={users.length + 1} />} />

        {/* Route for the feed, using the Feed component */}
        <Route path='/feed' element={<Feed users={users} user={connectedUser} addConnectedUser={addConnectedUser} />} />
      </Routes>
    </Router>
  );
}
export default App;
