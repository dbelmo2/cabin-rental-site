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


        // UOS
        const imageOneStartScalePosition = 3200 + 1700; // 1700 Calculated by taking the desired center position of the first image, and subtracting 3200
        const imageOneStopScaleEndPositon = 4600 + 1700;

        const imageTwoStartScalePosition = 4077 + 1700;
        const imageThreeStartScalePosition = 4956 + 1700;


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



        const scalingImagesObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('scale-effect')
                } else {
                    entry.target.classList.remove('scale-effect')
                }
            });
        });

        const slidingTextObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {

                const imageIndex = entry.target.classList.contains('one') ? 1 
                    : entry.target.classList.contains('two') ? 2 
                    : 3;

                
                const correspondingText =  imageIndex === 1 ? document.getElementById('cabin-text-one') 
                    : imageIndex === 2 ? document.getElementById('cabin-text-two')
                    : document.getElementById('cabin-text-three');


                const colorToSwitchTo = imageIndex === 1 ? '#302e25' : imageIndex === 2 ? '#627372' : '#191616';
                const mainContentDiv = document.querySelector('.main-content') as unknown as HTMLElement;
                const locationsPhotosDiv  = document.querySelector('.locations-photos') as unknown as HTMLElement;


                if (entry.isIntersecting) {
                    if (correspondingText && mainContentDiv) {
                        mainContentDiv.style.backgroundColor = colorToSwitchTo;
                        locationsPhotosDiv.style.setProperty('--locations-photos-pseudo', colorToSwitchTo);
                        correspondingText.classList.add('slide');
                        correspondingText.classList.add('show');
                    }
                } else {
                    if (correspondingText && mainContentDiv) {
                        correspondingText.classList.remove('show');
                        correspondingText.classList.remove('slide');
                    }

                }
            })
        }, {
          threshold: 0.5
        });



        const slidingText = document.querySelectorAll('.responsive-img');
        const scalingImages = document.querySelectorAll('.responsive-img');

        scalingImages.forEach((el) => scalingImagesObserver.observe(el));
        slidingText.forEach((el) => slidingTextObserver.observe(el));


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

            <div className='cabin-image-list'>
                <div className='full-vh-container'> 
                    <div className='responsive-img-container'> 
                        <img src={cabinOne} className='responsive-img one'/>
                    </div>   
                </div>

                <div className='full-vh-container'>
                    <div className='responsive-img-container'> 
                        <img src={cabinTwo} className='responsive-img two'/>
                    </div>
                </div>
                <div className='full-vh-container'>
                    <div className='responsive-img-container'> 
                        <img src={cabinThree} className='responsive-img three'/>
                    </div>
                </div>
            </div>

            <div className='cabin-description-list'>
                <div id='cabin-text-one' className='cabin-text hidden'>
                    <div className='title'>
                    Lorem ipsum dolor
                    </div>
                    <div className='description'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </div>
                </div>
                <div id='cabin-text-two' className='cabin-text hidden'>
                    <div className='title'>
                    Lorem ipsum dolor
                    </div>
                    <div className='description'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </div>
                </div>
                <div id='cabin-text-three' className='cabin-text hidden'>
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
