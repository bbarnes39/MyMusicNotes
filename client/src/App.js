import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Routes, Route, Link } from 'react-router-dom';
import Nav from './components/Nav';
import Login from './components/Login'
import Register from './components/Register';
import CreateTrackReview from './components/CreateTrackReview';
import DisplayAll from './components/DisplayAll';
import DisplayOne from './components/DisplayOne';
import EditOne from './components/EditOne';

function App() {

  const [user, setUser] = useState([])
  const [trackReview, setTrackReview] = useState([])

  return (
    <div className="App bg-success bg-gradient">
      <h1>MyMusicNotes</h1>
      {/* <Nav /> */}
      <Routes>
        <Route path='/login' element={<><Login user={user} setUser={setUser} /><Register user={user} setUser={setUser} /></>} />
        <Route path='/home' element={<DisplayAll trackReview={trackReview} setTrackReview={setTrackReview} />} />
        <Route path='/songs/newreview' element={<CreateTrackReview trackReview={trackReview} setTrackReview={setTrackReview} />} />
        <Route path='/songs/:id' element={<DisplayOne />} />
        <Route path='/songs/:id/editreview' element={<EditOne />} />
      </Routes>
    </div>
  );
}

export default App;
