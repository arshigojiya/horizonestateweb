"use client"
import Navbar from './Navbar';
import React, { useEffect } from 'react';

const Navbarin: React.FC = () => {
    useEffect(() => {
        // The debounce function receives our function as a parameter
        const debounce = <T extends (...args: string[]) => void>(fn: T): ((...params: Parameters<T>) => void) => {
            let frame: number;
            
            return (...params: Parameters<T>) => {
              if (frame) {
                cancelAnimationFrame(frame);
              }
              frame = requestAnimationFrame(() => {
                fn(...params);
              });
            };
          };
          

        // Reads out the scroll position and stores it in the data attribute
        // so we can use it in our stylesheets
        const storeScroll = () => {
            document.documentElement.dataset.scroll = window.scrollY.toString();
        }

        // Listen for new scroll events, here we debounce our `storeScroll` function
        document.addEventListener('scroll', debounce(storeScroll), { passive: true });

        // Update scroll position for first time
        storeScroll();
    }, [])
    return (
        <>
            <Navbar />
        </>
    );
}

export default Navbarin;
