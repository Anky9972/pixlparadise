import React, { useContext } from 'react'
import Hero from '../components/Hero';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';
import Authentication from './Authentication';
import { Auth } from '../context/Auth';
import AboutPage from './AboutPage';
import Footer from '../components/Footer';
function HomePage({mode,setMode}) {
  const {authPage} = useContext(Auth);
  const darkModeColors = {
    background: 'bg-[#1e2125]',
    text: 'text-gray-100',
    featureBg: 'bg-gray-800',
    featureText: 'text-white'
  };
  
  const lightModeColors = {
    background: 'bg-gray-100',
    text: 'text-gray-900',
    featureBg: 'bg-white',
    featureText: 'text-black'
  };
  return (
    <>
    {
      authPage  &&
    <Authentication mode={mode} setMode={setMode}/>
    }
      <Hero mode={mode}/>
      <AboutPage mode={mode}/>
      <Features mode={mode} darkModeColors={darkModeColors} lightModeColors={lightModeColors}/>
      <Testimonials mode={mode}/>
      <Newsletter mode={mode} />
      <Footer mode={mode}/>
    </>
  )
}

export default HomePage