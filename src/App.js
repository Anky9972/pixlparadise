import React, { useState } from 'react';
import Header from './components/Header';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Explore from './components/Explore';
import UserGallery from './components/UserGallery';
import UserProfile from './components/UserProfile';
import { motion } from 'framer-motion';
import ContactPage from './pages/ContactPage';
import Authentication from './pages/Authentication';
import ResetPassword from './pages/ResetPassword';
import MailConfirm from './pages/MailConfirm';
import AfterReset from './pages/AfterReset';

const App = () => {
  const [mode, setMode] = useState(false);

  return (
    <div className={`App min-h-screen ${mode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <motion.div initial={{y:0}} animate={{y:"-100%",transition:{duration:1.5,ease:"easeInOut"}}} className='w-full h-[115vh] fixed top-0 z-30  flex flex-col '>
        <div className='w-full h-screen  bg-[#f5efe5]'></div>
        <img src='https://assets-global.website-files.com/61b74db330d7740923e4176b/620a3c6a26050cd99aee561b_Loader%20Down.svg' alt='error' className=' mt-[-2px]'/>
      </motion.div>
      <Header  setMode={setMode} mode={mode} />
      <Routes>
        <Route path='/' element={<HomePage mode={mode} setMode={setMode} />} />
        <Route path='/explore' element={<Explore mode={mode} setMode={setMode} />} />
        <Route path='/gallery' element={<UserGallery mode={mode} setMode={setMode} />} />
        {/* <Route path='/gallery' element={<Gallery mode={mode} setMode={setMode} />} /> */}
        <Route path='/user/:username' element={<UserProfile mode={mode} />} />
        <Route path='/contact' element={<ContactPage mode={mode} />} />
        <Route path='/auth' element={<Authentication mode={mode} />} />
        <Route path='/reset-password/:token' element={<ResetPassword mode={mode} />} />
        <Route path='/confirm' element={<MailConfirm mode={mode} />} />
        <Route path='/reset-success' element={<AfterReset mode={mode} />} />
      </Routes>
    </div>
  );
};

export default App;
