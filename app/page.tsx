'use client'
import Slider from './components/slider'
import SearchBar from './components/searchbar'
import LetestProperty from './components/letestproperty'
import AboutSection from './components/about'
import Contact from './components/contact'
import Testimonial from './components/testimonial'
import KeyboardDoubleArrowUpRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowUpRounded';
import { useEffect, useState } from 'react'

function Page() {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    setScrollPosition(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <div 
     >
      <Slider />
      <SearchBar />
      <LetestProperty />
      <AboutSection />
      <Contact />
      <Testimonial />
      {scrollPosition > 200 && (
        <div className="fixed bottom-0 left-0 mb-8 justify-end z-50 w-[98%] flex items-end ">
          <button
            onClick={scrollToTop}
            className={`transition-transform transform rounded-full p-4 bg-blue-600 text-white shadow-lg hover:scale-105`}
          >
            <span><KeyboardDoubleArrowUpRoundedIcon /></span>
          </button>
        </div>
      )}
    </div>
  );
}

export default Page;
