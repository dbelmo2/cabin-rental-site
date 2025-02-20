import './css/Home.css';
import mainCabin from '../assets/main-cabin-opt.jpg';

import HeroText from "../assets/hero-filled.svg?react";
import LocationVideo from '../assets/colorado-video-opt.mp4';
import { useEffect } from 'react';
import MainContent from '../components/MainContent';
import '../components/css/Footer.css';
import ExpandingPhotos from '../components/ExpandingPhotos';
import Footer from '../components/Footer';

const coloradoIndexes = [8, 7, 6, 5, 4, 3, 2, 1 ];
const cabinResortsIndexes = [30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19];



export default function Home() {
    document.querySelector("#hero-text > path:nth-child(19)")


    const setHeroTextLengths = () => {
        const heroText = document.querySelectorAll('#hero-text');

        const heroTextPaths = heroText[0].children;
        for (let i = 0; i < heroTextPaths.length; i += 1) {
            const path = heroTextPaths[i] as SVGGeometryElement;
            const length = path.getTotalLength();
            path.style.strokeDasharray = `${length}`;
            path.style.strokeDashoffset = `${length}`;
            



            if (coloradoIndexes.includes(i + 1)) {
                path.style.animation = 'line-anim 2.5s ease forwards, fill-middle 0.5s ease forwards 2s';
                path.style.stroke = '#FDF8EF';


            } else if (cabinResortsIndexes.includes(i + 1)) {
                path.style.animation = 'line-anim 2s ease forwards 3s, fill-other 0.5s ease forwards 5.5s';
                path.style.stroke = '#D3D3D3';
            } else {
                path.style.animation = 'line-anim 2.5s ease forwards, fill-other 0.5s ease forwards 2s';
                path.style.stroke = '#D3D3D3';
            }
        }
    }


    // p 1300 -> 3000
    // x 6 -> 0
    // y 5 -> 0


    const addScrollListener = () => {
        const container = document.querySelector('.content');
        const videoContainer = document.querySelector('.location-video-container') as HTMLElement;

        // UOS
        // TODO: Fix bug where the startStraighten position no longer works as the window with shrinks.
        // A possible fix and improvement might be to use IntersectionObserver API to detect when an element enters a specific threshold in the viewport. 
        const maxYTilt = 15;
        const maxXTilt = 10;
        const normalPerspective = 3000;
        const tiltedPerspective = 1000;
        const startStraighten = 724 + 600; // 600 here is calculated by taking the old scrollPosition where the video was straight (1500px) and subtracting the 
        const endStraighten = 1524 + 600;  // vertical offset of the new desired scrollPosition where the video is straight. If the position needs to change,
        const startTilt = 1600 + 600; // update in a similar manner.
        const endTilt = 2240 + 600;

        const yStraightenMultiplier = maxYTilt / (endStraighten - startStraighten);
        const xStraightenMultiplier = maxXTilt / (endStraighten - startStraighten);
        const perspectiveStraightenMultiplier = (normalPerspective - tiltedPerspective) / (endStraighten - startStraighten);

        const yTiltValueMultiplier = (maxYTilt / (endTilt - startTilt)) * -1;
        const xTiltValueMultiplier = (maxXTilt / (endTilt - startTilt)) * -1;
        const perspectiveTiltMultiplier = (normalPerspective - tiltedPerspective) / (endTilt - startTilt);





        // Old scroll position where straight: 1500px

        let lastPosition = 0;
        //console.log('Window height is ', windowHeight);
        if (container) {
            container.addEventListener('scroll', () => {
                

                const scrollPosition = container.scrollTop;
                //console.log('scroll position: ', scrollPosition);
                //console.log('Current scroll position: ', );
                if (lastPosition < scrollPosition) {
                    // scrolling down
                    if (scrollPosition >= startStraighten && scrollPosition <= endStraighten && videoContainer) {
                        const contextPosition = scrollPosition - startStraighten;
                        const perspectiveValue = String((contextPosition * perspectiveStraightenMultiplier) + tiltedPerspective);
                        const yValue = String(maxYTilt - (contextPosition * yStraightenMultiplier));
                        const xValue = String(maxXTilt - (contextPosition * xStraightenMultiplier));
                        //console.log(`perspective: ${perspectiveValue}px, rotateY: ${yValue}deg, rotateX: ${xValue}deg`);
                        videoContainer.style.transform = `perspective(${perspectiveValue}px) rotateY(${yValue}deg) rotateX(${xValue}deg)`
                    } else if (scrollPosition >= endStraighten && scrollPosition <= startTilt && videoContainer) {
                        videoContainer.style.transform = `perspective(${normalPerspective}px) rotateY(0deg) rotateX(0deg)`
                    } else if (scrollPosition >= startTilt && scrollPosition <= endTilt && videoContainer) {
                        const contextPosition = scrollPosition - startTilt;
                        const perspectiveValue = String((contextPosition * perspectiveTiltMultiplier) + tiltedPerspective);
                        const yValue = String(contextPosition * yTiltValueMultiplier);
                        const xValue = String(contextPosition * xTiltValueMultiplier);
                        //console.log(`perspective: ${perspectiveValue}px, rotateY: ${yValue}deg, rotateX: ${xValue}deg`);
                        videoContainer.style.transform = `perspective(${perspectiveValue}px) rotateY(${yValue}deg) rotateX(${xValue}deg)`
                    } else if (scrollPosition >= endTilt && videoContainer) {
                        videoContainer.style.transform = `perspective(${normalPerspective}px) rotateY(-${maxYTilt}deg) rotateX(-${maxXTilt}deg)`
                    }
                } else {
                    //console.log('scrolling up')
                    // scrolling up
                    if (scrollPosition >= startStraighten && scrollPosition <= endStraighten && videoContainer) {
                        const contextPosition = scrollPosition - startStraighten;
                        const perspectiveValue = String((contextPosition * perspectiveStraightenMultiplier) + tiltedPerspective);

                        const yValue = String(maxYTilt - (contextPosition * yStraightenMultiplier));
                        const xValue = String(maxXTilt - (contextPosition * xStraightenMultiplier));
                        //console.log(`perspective: ${perspectiveValue}px, rotateY: ${yValue}deg, rotateX: ${xValue}deg`);
                        videoContainer.style.transform = `perspective(${perspectiveValue}px) rotateY(${yValue}deg) rotateX(${xValue}deg)`
                    } else if (scrollPosition <= startStraighten && scrollPosition <= endStraighten && videoContainer) {
                        videoContainer.style.transform = `perspective(${tiltedPerspective}px) rotateY(${maxYTilt}deg) rotateX(${maxXTilt}deg)`
                    } else if (scrollPosition <= endTilt && scrollPosition >= startTilt && videoContainer) {
                        const contextPosition = scrollPosition - startTilt;
                        const perspectiveValue = String((contextPosition * perspectiveTiltMultiplier) + tiltedPerspective);
                        const yValue = String(contextPosition * xTiltValueMultiplier);
                        const xValue = String(contextPosition * yTiltValueMultiplier);
                        //console.log(`perspective: ${perspectiveValue}px, rotateY: ${yValue}deg, rotateX: ${xValue}deg`);
                        videoContainer.style.transform = `perspective(${perspectiveValue}px) rotateY(${yValue}deg) rotateX(${xValue}deg)`
                    } else if (scrollPosition >= startTilt && scrollPosition <= endStraighten && videoContainer) {
                        videoContainer.style.transform = `perspective(${normalPerspective}px) rotateY(0deg) rotateX(0deg)`
                    }
                }
                
                const locationsContentDiv = document.querySelector('.locations-content') as unknown as HTMLElement;
                const blur = document.querySelector('.black-blur') as unknown as HTMLElement;
                const quote = document.querySelector('.quote-container') as unknown as HTMLElement;
                if (locationsContentDiv) {
                    if (scrollPosition >= 1700 && scrollPosition <= 2600) {
                        // good values for video background color, #32201C, #9A8F88
                        locationsContentDiv.style.backgroundColor = '#9A8F88'
                        blur.style.background = 'linear-gradient(to bottom, rgba(18, 33, 27, 0) 0%, rgba(18, 33, 27, 1) 100%)'
                    } else if (scrollPosition >= 2600) {
                        locationsContentDiv.style.backgroundColor = 'black';
                        blur.style.background = 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%)'

                    } else {
                        locationsContentDiv.style.backgroundColor = 'black'
                        blur.style.background = 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%)';


                    }
                }

                if (quote) {
                    if (scrollPosition >= 600) {
                        quote.style.opacity = '1'
                    }
                }




                lastPosition = scrollPosition;
            })

            // 824 to 1624 should straighten out the video
            // 1624 to 2424 should re tilt it
        }
    }

    useEffect(() => {
      //console.log('hello world')
      setHeroTextLengths();
      addScrollListener();

    }, [])


    // data-aos html tag for css animation on scroll

    return (
        <>
        <div className='content'>
            <div className='black-shadow'>
              <img src={mainCabin} className='main-cabin'/>
              <HeroText  className='title-container'/>
            </div>

            

            <div className='locations-content'>
                <div className='black-blur'>
                </div>

                <div className='quote-container'>
                    "The earth has music for those who listen." - <span className='quote-att'>Shakespeare</span>
                </div>
                <div className='location-video-container'>
                    <video className='location-video' autoPlay={true} loop muted={true} playsInline>
                        <source src={LocationVideo} type='video/mp4' />
                    </video>
                    <div className='video-text'>
                      <div className='video-text-inner'>
                        Embrace the ultimate retreat

                      </div>
                    </div>
                </div>
            </div>

            <ExpandingPhotos />
            <MainContent />
            <Footer />

        </div>
</>
    )
}



