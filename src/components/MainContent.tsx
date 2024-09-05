import cabinOne from '../assets/main-content/cabin-one.png';
import cabinTwo from '../assets/main-content/cabin-two.png';
import cabinThree from '../assets/main-content/cabin-three.png';
import './css/MainContent.css';
import { useEffect, useRef, useState } from 'react';

export default function MainContent() {

    const [scrollPosition, setScrollPosition] = useState(0); 
    const [responsiveImagePosition, setResponsiveImagePosition] = useState({ top: 0, bottom: 0});
    const elementRef = useRef(null);




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


    const addScrollListener = () => {
        const container = document.querySelector('.content');
        if (container) {
            container.addEventListener('scroll', () => {
                animateResponsiveImages(container);
            });
        }
    }


    useEffect(() => {


        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {

                    if (entry.target.classList.contains('responsive-img')) {
                        entry.target.classList.add('scale-effect')
                    } else if (entry.target.classList.contains('cabin-text')) {
                        entry.target.classList.add('show');
                    }
                } else {
                    if (entry.target.classList.contains('responsive-img')) {
                        entry.target.classList.remove('scale-effect')
                    } else if (entry.target.classList.contains('cabin-text')) {
                        entry.target.classList.remove('show');
                    }                
                }
            })
        })
        const hiddenElements = document.querySelectorAll('.hidden');
        const responsiveImages = document.querySelectorAll('.responsive-img');
        [...hiddenElements, ...responsiveImages].forEach((el) => observer.observe(el));

        addScrollListener();


    
        return () => {
          //window.removeEventListener('scroll', handleScroll);
        };
      }, []);


    return (
        <div className='main-content'>
            <div className='cabin-section'>
                <div className='responsive-img-container'> 
                    <img src={cabinOne} className='responsive-img one hidden'/>
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
                    <img src={cabinTwo} className='responsive-img two hidden'/>
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
                    <img src={cabinThree} className='responsive-img three hidden'/>
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
