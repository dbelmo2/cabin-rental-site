import './css/NavBar.css';
import Logo from '../assets/logo.svg?react';
import { useState, useEffect } from 'react';
import { FaTimes, FaBars } from 'react-icons/fa';


export default function NavBar() {

    const [click, setClick] = useState(false);
    const [button, setButton] = useState(false);
    
    const handleMenuClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
  
    const showButton = () => {
      if(window.innerWidth <=960) {
        setButton(false);         
      } else {
        setButton(true);
      }

    }
  
    useEffect(() => {
      showButton();
    }, []);

    useEffect(() => {
      if (click) {

        if (window.innerWidth <= 960) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = 'visible';
        }

      } else {
        console.log('setting overflow to visible');
        document.body.style.overflow = 'visible';
      }
    }, [click])
  
    window.addEventListener('resize', showButton);
    return (
        <>
        <div className="navbar">
        <div className="navbar-container container">
            <Logo className='navbar-logo'/>
            <div className="menu-icon" onClick={handleMenuClick}>
            {click ? <FaTimes /> : <FaBars />}
            </div>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                <li className='nav-item'>
                    <div className='nav-divs' onClick={closeMobileMenu}>
                    Home
                    </div>
                </li>

                <li className='nav-item'>
                    <div className='nav-divs' onClick={closeMobileMenu}>
                    Location
                    </div>
                </li>
                <li className='nav-item'>
                    <div className='nav-divs' onClick={closeMobileMenu}>
                    Resorts
                    </div>
                </li>

                <li className='nav-item'>
                    <div className='nav-divs' onClick={closeMobileMenu}>
                    About Us
                    </div>
                </li>
            </ul>
        </div>
        </div>
        </>
    )
}