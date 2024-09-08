import cabinOne from '../assets/main-content/cabin-one-opt.png';
import cabinTwo from '../assets/main-content/cabin-two-opt.png';
import cabinThree from '../assets/main-content/dark-cabin-large.jpg';
import './css/MainContent.css';
import { useEffect } from 'react';
import PillButton from './PillButton';

export default function MainContent() {



    const animateResponsiveImages = (container: HTMLElement) => {
        const visibleResponsiveImages = document.querySelectorAll('.scale-effect') as unknown as HTMLElement[];
        const scrollPosition = container.scrollTop;

        const minScale = 1.00;
        const maxScale = 1.15;


        // UOS
        const imageOneStartScalePosition = 3200 + 1900; // 1700 Calculated by taking the desired center position of the first image, and subtracting 3200
        const imageOneStopScaleEndPositon = 4600 + 1900;

        const imageTwoStartScalePosition = 4077 + 1900;
        const imageThreeStartScalePosition = 4956 + 1900;


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

        let previousScrollY = 0;


        const scalingImagesObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('scale-effect')
                } else {
                    entry.target.classList.remove('scale-effect')
                }
            });
        });

        const horizontalSlidingObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const container = document.querySelector('.content');
                if (container) {
                    const currentScrollY = container?.scrollTop;

                    const imageIndex = entry.target.classList.contains('one') ? 1 
                        : entry.target.classList.contains('two') ? 2 
                        : 3;
    
                    
                    const correspondingText = document.getElementById(`cabin-text-${imageIndex}`);
                    const correspondingBookButton = document.getElementById(`book-button-${imageIndex}`);
                    const correspondingTitle = document.getElementById(`title-${imageIndex}`);
                    const correspondingDesc = document.getElementById(`desc-${imageIndex}`);

                    const elementsToSlideAnimate = [correspondingText, correspondingBookButton, correspondingTitle, correspondingDesc];

                    
    
    
                    const colorToSwitchTo = imageIndex === 1 ? '#302e25' : imageIndex === 2 ? '#627372' : '#1a1a1d'; // old value 1a1a1d, good: 1a1a1d
                    const mainContentDiv = document.querySelector('.main-content-container') as unknown as HTMLElement;
                    const locationsPhotosDiv  = document.querySelector('.locations-photos') as unknown as HTMLElement;
                    const footerContainerDiv = document.querySelector('.footer-container') as unknown as HTMLElement;
    
    
                    if (mainContentDiv) {
                        if (entry.isIntersecting) { // Image is coming into view
                            // BG color changing 
                            mainContentDiv.style.backgroundColor = colorToSwitchTo;
                            footerContainerDiv.style.backgroundColor = colorToSwitchTo
                            locationsPhotosDiv.style.setProperty('--locations-photos-pseudo', colorToSwitchTo);
    
    
                            if (currentScrollY > previousScrollY) { // scrolling down, text sliding into view from left side to the right
                                elementsToSlideAnimate.forEach((slidingElement) => {

                                    if (slidingElement) {
                                        slidingElement.classList.remove('left-hidden');
                                        slidingElement.classList.add('middle-show');
                                        slidingElement.classList.remove('right-hidden');
                                    }
                                    if (slidingElement?.classList.contains('book-button')) {
                                        const bookButton = slidingElement as HTMLButtonElement;
                                        bookButton.disabled = false;
                                    }

                                })
                            } else { // scrolling up, text sliding into view from the right side to the left
                                elementsToSlideAnimate.forEach((slidingElement) => {
                                    if (slidingElement) {
                                        slidingElement.classList.remove('right-hidden'); 
                                        slidingElement.classList.add('middle-show');
                                        slidingElement.classList.remove('left-hidden');
                                    }
                                    if (slidingElement?.classList.contains('book-button')) {
                                        const bookButton = slidingElement as HTMLButtonElement;
                                        bookButton.disabled = false;
                                    }
                                })
                            }
                        } else { // Image is going out of view 
                            // BG color changing edge cases

                            if (imageIndex === 1) {
                                locationsPhotosDiv.style.setProperty('--locations-photos-pseudo', 'black');
                                mainContentDiv.style.backgroundColor = 'black';
                            }


                            if (currentScrollY > previousScrollY) { // scrolling down, text sliding out of view from the left to the right
                                elementsToSlideAnimate.forEach((slidingElement) => {
                                    if (slidingElement) {
                                        slidingElement.classList.remove('middle-show');
                                        slidingElement.classList.add('right-hidden');
                                        slidingElement.classList.remove('left-hidden');
                                    }
                                    if (slidingElement?.classList.contains('book-button')) {
                                        const bookButton = slidingElement as HTMLButtonElement;
                                        bookButton.disabled = true;
                                    }
                                })
                                


                            } else { // scrolling up, text sliding out of view from the right to the left
                                elementsToSlideAnimate.forEach((slidingElement) => {
                                    if (slidingElement) {
                                        slidingElement.classList.remove('middle-show');
                                        slidingElement.classList.add('left-hidden');
                                        slidingElement.classList.remove('right-hidden');

                                    }
                                    if (slidingElement?.classList.contains('book-button')) {
                                        const bookButton = slidingElement as HTMLButtonElement;
                                        bookButton.disabled = true;
                                    }
                                })

                            }
                        }
                    }
    
                    previousScrollY = currentScrollY;
                }
            })
        }, {
          threshold: 0.5
        });

        const verticalSlidingObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                console.log('inside vertical sliding observer');
                if (entry.isIntersecting) {
                    entry.target.classList.add('under-show')
                } else {
                    entry.target.classList.remove('under-show')
                }
            });
        });


        const underHiddenElements = document.querySelectorAll('.under-hidden');
        underHiddenElements.forEach((el) => verticalSlidingObserver.observe(el));

 

        const scalingImages = document.querySelectorAll('.responsive-img');
        scalingImages.forEach((el) => scalingImagesObserver.observe(el));
        scalingImages.forEach((el) => horizontalSlidingObserver.observe(el));
        


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

        <div className='main-content-container'>

            <div className='starting-title under-hidden'>
                Your adventure starts here
            </div>


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
                    {/* 
                        If issues occur with the button, title, and desc sliding further than their container,
                        try removing the left-hidden and smooth-transition classes from the container, as well as
                        removing the container element from the elementsToSlideAnimate array above ^. 
                    */}
                <div className='cabin-description-list'>
                    <div id='cabin-text-1' className='cabin-text left-hidden smooth-transition'>
                        <div id='title-1' className='title left-hidden smooth-transition'>
                        Whispering Pines
                        </div>
                        <div id='desc-1' className='description left-hidden smooth-transition'>
                        Nestled deep in the Whispering Pines Woods, this cozy cabin offers complete tranquility, surrounded by towering trees and untouched nature. Escape the noise and unwind in the heart of the forest.
                        </div>
                        <PillButton id='book-button-1' className='book-button left-hidden smooth-transition'>
                            Reserve Now
                        </PillButton>
                    </div>
                    <div id='cabin-text-2' className='cabin-text left-hidden smooth-transition'>
                        <div id='title-2' className='title left-hidden smooth-transition'>
                        Crystalview Lake
                        </div>
                        <div id='desc-2' className='description left-hidden smooth-transition'>
                        Perched on the edge of Crystalview Lake, this serene cabin offers stunning mountain views and the tranquility of a nearby forest. Relax by the water and enjoy the beauty of towering peaks surrounding you.
                        </div>
                        <PillButton id='book-button-2'className='book-button left-hidden smooth-transition'>
                            Reserve Now
                        </PillButton>
                    </div>
                    <div id='cabin-text-3' className='cabin-text left-hidden smooth-transition'>
                        <div id='title-3' className='title left-hidden smooth-transition'>
                        Frostpine Summit
                        </div>
                        <div id='desc-3' className='description left-hidden smooth-transition'>
                        Located atop Everbreeze Mountain, this secluded cabin is surrounded by graceful silver birches and the cool, steady winds of the high altitude. A tranquil retreat far above the world below, it's the perfect escape for those seeking peace and breathtaking views.
                        </div>
                        <PillButton id='book-button-3' className='book-button left-hidden smooth-transition' >
                            Reserve Now
                        </PillButton>
                    </div>



                </div>
            </div>

                <div className='end-title under-hidden'>
                    See Our Full Selection
                </div>
                <PillButton id='view-all-button' className='under-hidden'> 
                        View All Resorts
                </PillButton>
        </div>

    )
}
