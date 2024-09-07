import cabinOne from '../assets/main-content/cabin-one-opt.png';
import cabinTwo from '../assets/main-content/cabin-two-opt.png';
import cabinThree from '../assets/main-content/cabin-three-opt.png';
import './css/MainContent.css';
import { useEffect } from 'react';
import Footer from './Footer';

export default function MainContent() {

    const animateResponsiveImages = (container: HTMLElement) => {
        const visibleResponsiveImages = document.querySelectorAll('.scale-effect') as unknown as HTMLElement[];
        const scrollPosition = container.scrollTop;

        const minScale = 1.00;
        const maxScale = 1.15;

        const imageOneStartScalePosition = 3200;
        const imageOneStopScaleEndPositon = 4600;

        const imageTwoStartScalePosition = 4077;
        const imageThreeStartScalePosition = 4956;


        const scaleMultipler = (maxScale - minScale) / (imageOneStopScaleEndPositon - imageOneStartScalePosition);

        visibleResponsiveImages.forEach((el: HTMLElement) => {
            let contextPosition;
            if (el.classList.contains('one')) contextPosition = scrollPosition - imageOneStartScalePosition;
            else if (el.classList.contains('two')) contextPosition = scrollPosition - imageTwoStartScalePosition;
            else contextPosition = scrollPosition - imageThreeStartScalePosition;
            const scaleValue = String(maxScale - (contextPosition * scaleMultipler));
            el.style.transform = `scale(${scaleValue})`
        });
    }





    useEffect(() => {



        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    if (entry.target.classList.contains('responsive-img')) {
                        entry.target.classList.add('scale-effect')
                    } else if (entry.target.classList.contains('cabin-text')) {
                        entry.target.classList.add('show');
                        entry.target.classList.add('slide');
                    }
                } else {
                    if (entry.target.classList.contains('responsive-img')) {
                        entry.target.classList.remove('scale-effect')
                    } else if (entry.target.classList.contains('cabin-text')) {
                        entry.target.classList.remove('show');
                        entry.target.classList.remove('slide');
                    }                
                }
            })
        })
        const hiddenElements = document.querySelectorAll('.hidden');
        const responsiveImages = document.querySelectorAll('.responsive-img');
        [...hiddenElements, ...responsiveImages].forEach((el) => observer.observe(el));


        // Scroll scale effect
        const container = document.querySelector('.content');
        const scrollListener = () => {
            animateResponsiveImages(container as HTMLElement);
        }
        if (container) {
            container.addEventListener('scroll', scrollListener);
        }

    
        return () => {
          if (container) container.removeEventListener('scroll', scrollListener);
        };
      }, []);


    return (
        <div className='main-content'>
            <div className='cabin-section'>
                <div className='responsive-img-container'> 
                    <img src={cabinOne} className='responsive-img one'/>
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
                    <img src={cabinTwo} className='responsive-img two'/>
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
                    <img src={cabinThree} className='responsive-img three'/>
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
            <Footer />

        </div>
    )
}
