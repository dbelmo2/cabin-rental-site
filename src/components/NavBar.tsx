import './css/NavBar.css';
import Logo from '../assets/logo.svg?react';
import { IconButton } from '@mui/material';


export default function NavBar() {
    return (
        <div className='nav-bar'> 
           <IconButton sx={{ marginLeft: '50px' } }>
             <Logo />
           </IconButton>
            <ul className='links'>
                    <div className='nav-link'>
                        Home
                    </div>
                <li>
                    <div className='nav-link'>
                        Location    
                    </div>
                </li>
                <li>  
                    <div className='nav-link'>
                        Resorts
                    </div>                
                </li>
                <li>
                    <div className='nav-link'>
                        About Us
                    </div>                
                </li>
            </ul>
        </div>
    )
}