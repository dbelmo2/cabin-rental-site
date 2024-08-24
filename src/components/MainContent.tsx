import cabinOne from '../assets/main-content/cabin-one.png';
import cabinTwo from '../assets/main-content/cabin-two.png';
import cabinThree from '../assets/main-content/cabin-three.png';
import './css/MainContent.css';

export default function MainContent() {


    return (
        <div className='main-content'>
            <div className='cabin-section'>
                <img src={cabinOne} className='responsive-img'/>
                <div className='cabin-text'>
                    <div className='title'>
                    Lorem ipsum dolor
                    </div>
                    <div className='description'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </div>
                </div>

            </div>
            <div className='cabin-section inverse'>
            <img src={cabinTwo} className='responsive-img'/>
                <div className='cabin-text'>
                    <div className='title'>
                    Lorem ipsum dolor
                    </div>
                    <div className='description'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </div>
                </div>
            </div>
            <div className='cabin-section'>
            <img src={cabinThree} className='responsive-img'/>
                <div className='cabin-text'>
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