import cabinOne from '../assets/main-content/cabin-one.png';
import cabinTwo from '../assets/main-content/cabin-two.png';
import cabinThree from '../assets/main-content/cabin-three.png';
import './css/MainContent.css';
import { useEffect } from 'react';

export default function MainContent() {


    useEffect(() => {

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {

                    if (entry.target.classList.contains('responsive-img')) {
                        entry.target.classList.add('scroll-effect')
                    } else if (entry.target.classList.contains('cabin-text')) {
                        entry.target.classList.add('show');
                    }
                } else {
                    if (entry.target.classList.contains('responsive-img')) {
                        entry.target.classList.remove('scroll-effect')
                    } else if (entry.target.classList.contains('cabin-text')) {
                        entry.target.classList.remove('show');
                    }                
                }
            })
        })

        const hiddenElements = document.querySelectorAll('.hidden');
        hiddenElements.forEach((el) => observer.observe(el));

    
        return () => {
          //window.removeEventListener('scroll', handleScroll);
        };
      }, []);


    return (
        <div className='main-content'>
            <div className='cabin-section'>
                <div className='responsive-img-container'> 
                    <img src={cabinOne} className='responsive-img hidden'/>
                </div>                  
                <div className='cabin-text hidden'>
                    <div className='title'>
                    Lorem ipsum dolor
                    </div>
                    <div className='description'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </div>
                </div>

            </div>
            <div className='cabin-section inverse'>
                <div className='responsive-img-container'> 
                    <img src={cabinTwo} className='responsive-img hidden'/>
                </div>                
                <div className='cabin-text hidden'>
                    <div className='title'>
                    Lorem ipsum dolor
                    </div>
                    <div className='description'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </div>
                </div>
            </div>
            <div className='cabin-section'>
                <div className='responsive-img-container'> 
                    <img src={cabinThree} className='responsive-img hidden'/>
                </div>
                <div className='cabin-text hidden'>
                    <div className='title'>
                    Lorem ipsum dolor
                    </div>
                    <div className='description'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </div> 
                </div>
            </div>
        </div>
    )
}