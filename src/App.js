import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import Feed from './components/feed/Feed';
import Profile from './components/profile/Profile';
import { DarkModeProvider } from './components/context/DarkModeContext';


function App() {

  return (
    <DarkModeProvider>
      <Router>
        <Routes>
          {/* Route for login, using the Login component */}
          <Route path='/' element={<Login/>} />

          {/* Route for signup, using the Signup component */}
          <Route path='/signup' element={<Signup />} />

          {/* Route for the feed, using the Feed component */}
          <Route path='/feed' element={<Feed />} />

          <Route path="/profile/:targetUserId" element={<Profile />} />

        </Routes>
      </Router>
    </DarkModeProvider>
  );
}
export default App;
