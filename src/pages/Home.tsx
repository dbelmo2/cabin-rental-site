import './css/Home.css';
import mainCabin from '../assets/main-cabin-opt.jpg';

import HeroText from "../assets/hero-filled.svg?react";
import LocationVideo from '../assets/colorado-video-opt.mp4';
import { useEffect, useRef } from 'react';
import MainContent from '../components/MainContent';
import '../components/css/Footer.css';
import ExpandingPhotos from '../components/ExpandingPhotos';
import Footer from '../components/Footer';

const coloradoIndexes = [8, 7, 6, 5, 4, 3, 2, 1 ];
const cabinResortsIndexes = [30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19];



export default function Home() {
    document.querySelector("#hero-text > path:nth-child(19)");
    const containerRef = useRef<HTMLDivElement | null>(null);
    const videoContainerRef = useRef<HTMLDivElement | null>(null);
    const videoFrameRef = useRef<HTMLDivElement | null>(null);
    const quoteRef = useRef<HTMLDivElement | null>(null);




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




    const setUpVideo = () => {
        let lastPosition = 0;
        let straightStart = 0;
        let tiltStart = 0;
        const handleVideoScroll = () => {
            const container = containerRef.current;
            const videoContainer = videoContainerRef.current;
            const video = videoFrameRef.current;
    
            if (!container || !videoContainer || !video ) return;
    
            // UOS
            // TODO: Fix bug where the startStraighten position no longer works as the window with shrinks.
            // A possible fix and improvement might be to use IntersectionObserver API to detect when an element enters a specific threshold in the viewport. 
            const maxYTilt = 15; 
            const maxXTilt = 10;
            const normalPerspective = 3000;
            const tiltedPerspective = 1000;
            const startStraighten = 724 + 600; // When to start straigthening the video as the user scrolls down and it appers from the bottom.
            const endStraighten = 1524 + 600;  // When the video is straight after the user has scrolled down 
            const startTilt = 1600 + 600; // When to start the tilting of the video after it has been straightened but the user continued down the page.
            const endTilt = 2240 + 600; // The end position after the user has fully scrolled down the page and the video is above the screen fully tilted.
    
            const yStraightenMultiplier = maxYTilt / (endStraighten - startStraighten);
            const xStraightenMultiplier = maxXTilt / (endStraighten - startStraighten);
            const perspectiveStraightenMultiplier = (normalPerspective - tiltedPerspective) / (endStraighten - startStraighten);
    
            const yTiltValueMultiplier = (maxYTilt / (endTilt - startTilt)) * -1;
            const xTiltValueMultiplier = (maxXTilt / (endTilt - startTilt)) * -1;
            const perspectiveTiltMultiplier = (normalPerspective - tiltedPerspective) / (endTilt - startTilt);
    
            const scrollPosition = container.scrollTop;
    
            const rect = video.getBoundingClientRect();
            const centerOfVideo = (rect.top + rect.bottom) / 2;
            const centerOfScreen = window.innerHeight / 2;
            const centerThreshold = window.innerHeight * 0.03;


    
            // TODO:
            //  Fix the contextPosition values
    
            if (Math.abs(centerOfVideo - centerOfScreen) <= centerThreshold) {
                console.log('centered!!!');
                            // this is where the video is straight after scrolling down
                videoContainer.style.transform = `perspective(${normalPerspective}px) rotateY(0deg) rotateX(0deg)`
            } else if (centerOfVideo > centerOfScreen) {
                console.log('Moving down, straightening video')
                const contextPosition = scrollPosition - straightStart;
                console.log('contextPosition: ', contextPosition);
                const perspectiveValue = String((contextPosition * perspectiveStraightenMultiplier) + tiltedPerspective);
                const yValue = String(maxYTilt - (contextPosition * yStraightenMultiplier));
                const xValue = String(maxXTilt - (contextPosition * xStraightenMultiplier));
                //console.log(`perspective: ${perspectiveValue}px, rotateY: ${yValue}deg, rotateX: ${xValue}deg`);
                videoContainer.style.transform = `perspective(${perspectiveValue}px) rotateY(${yValue}deg) rotateX(${xValue}deg)`
            } else if (centerOfVideo < centerOfScreen) {
                if (tiltStart === 0) {
                    tiltStart = scrollPosition;
                }

                // TODO: 
                //      Fix bug where tiltStart retains old value when the window width changes and the y position of the video is changed as a result. This should
                // cause tiltStart to update but it's not as it only updates when element first enters from the bottom. And on top of that, it only updates once,
                // as there is a check to make sure the previous value is zero. 
                // Possible fix. When the element enters the screen, whether from bottom or top, calculate the tiltStart/straightStart by taking into account the height of the element. 
                console.log('tiltStart is:', tiltStart);

                // this is buggy and happens when on a mobile screen and the center is slightly above the center of the screen, due to the tilt.
                console.log('Moving down, tilting video')
                const contextPosition = scrollPosition - tiltStart;
                const perspectiveValue = String((contextPosition * perspectiveTiltMultiplier) + tiltedPerspective);
                const yValue = String(contextPosition * yTiltValueMultiplier);
                const xValue = String(contextPosition * xTiltValueMultiplier);
                //console.log(`perspective: ${perspectiveValue}px, rotateY: ${yValue}deg, rotateX: ${xValue}deg`);
                videoContainer.style.transform = `perspective(${perspectiveValue}px) rotateY(${yValue}deg) rotateX(${xValue}deg)`
            }
    
    
            /*
            // scrolling down
            if (scrollPosition >= startStraighten && scrollPosition <= endStraighten && videoContainer) {
                // This is where the video first appears from the bottom of the screen and begins to straighten.
                console.log('case 1');
                const contextPosition = scrollPosition - startStraighten;
                const perspectiveValue = String((contextPosition * perspectiveStraightenMultiplier) + tiltedPerspective);
                const yValue = String(maxYTilt - (contextPosition * yStraightenMultiplier));
                const xValue = String(maxXTilt - (contextPosition * xStraightenMultiplier));
                //console.log(`perspective: ${perspectiveValue}px, rotateY: ${yValue}deg, rotateX: ${xValue}deg`);
                videoContainer.style.transform = `perspective(${perspectiveValue}px) rotateY(${yValue}deg) rotateX(${xValue}deg)`
            } else if (scrollPosition >= endStraighten && scrollPosition <= startTilt && videoContainer) {
                console.log('case 2');
                // this is where the video is straight after scrolling down
                videoContainer.style.transform = `perspective(${normalPerspective}px) rotateY(0deg) rotateX(0deg)`
            } else if (scrollPosition >= startTilt && scrollPosition <= endTilt && videoContainer) {
                console.log('case 3');
                // here the video, after being perfectly straight, begins to tilt in the other direction as the user scrolls down.
                const contextPosition = scrollPosition - startTilt;
                const perspectiveValue = String((contextPosition * perspectiveTiltMultiplier) + tiltedPerspective);
                const yValue = String(contextPosition * yTiltValueMultiplier);
                const xValue = String(contextPosition * xTiltValueMultiplier);
                //console.log(`perspective: ${perspectiveValue}px, rotateY: ${yValue}deg, rotateX: ${xValue}deg`);
                videoContainer.style.transform = `perspective(${perspectiveValue}px) rotateY(${yValue}deg) rotateX(${xValue}deg)`
            } else if (scrollPosition >= endTilt && videoContainer) {
                console.log('case 4');
                // at this point the video is off (above) the screen 
                videoContainer.style.transform = `perspective(${normalPerspective}px) rotateY(-${maxYTilt}deg) rotateX(-${maxXTilt}deg)`
            }
            */
            


            // TODO: Code below needs to be moved outside of this function so that it can be executed even if the video has not intersected the screen yet.
            // Need to implement a permanent listener on the container to manage things such as bg color changes as the user transitions between different sections.
            // 

            const locationsContentDiv = document.querySelector('.locations-content') as unknown as HTMLElement;
            const blur = document.querySelector('.black-blur') as unknown as HTMLElement;
            const quote = document.querySelector('.quote-container') as unknown as HTMLElement;
            if (locationsContentDiv) {
                // TODO: Update this to use dynamic values...
                if (scrollPosition >= 1400 && scrollPosition <= 2200) {
                    // good values for video background color, #32201C, #9A8F88
                    locationsContentDiv.style.backgroundColor = '#9A8F88'
                    blur.style.background = 'linear-gradient(to bottom, rgba(18, 33, 27, 0) 0%, rgba(18, 33, 27, 1) 100%)'
                } else if (scrollPosition >= 2200) {
                    locationsContentDiv.style.backgroundColor = 'black';
                    blur.style.background = 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%)'
    
                } else {
                    locationsContentDiv.style.backgroundColor = 'black'
                    blur.style.background = 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%)';
    
    
                }
            }
            
            console.log('scrollPosition', scrollPosition);
            if (scrollPosition >= 600) {
                quote.style.opacity = '1'
            }
            
            lastPosition = scrollPosition;
        }

        const container = containerRef.current;
        const video = videoFrameRef.current;
        const videoObserver = new IntersectionObserver((entries) => {
          
          entries.forEach((entry) => {
              const boundingClientRect = entry.boundingClientRect;  
      
              if (container) {
                  if (entry.isIntersecting && entry.intersectionRatio < 1) {
                      console.log('video is entering, adding listener.');
                      console.log(`Scroll position (container.scrollTop) is: ${container.scrollTop}`);

                      if (container.scrollTop > lastPosition) {
                        console.log('scrolling down, element entering from the bottom ')
                      } else {
                        console.log('scrolling up, element entering from the top')
                      }

                      if (boundingClientRect.top < 0) {
                        console.log('Entering from top');
                        
                      } else {
                        console.log('Entering from bottom');
                        straightStart = container.scrollTop;
                      }
                      
                      container.addEventListener('scroll', handleVideoScroll);
                   } else {
                      console.log('video is exiting, removing listener')
                      container.removeEventListener('scroll', handleVideoScroll);
  
                   }
              }
          });
        })

        if (video) {
            videoObserver.observe(video as Element);
        }

        return () => {
            if (video) {
                videoObserver.unobserve(video as Element);
            }
            if (container) {
                container.removeEventListener('scroll', handleVideoScroll);
            }
        }
    }

    const setUpQuote = () => {
        const container = containerRef.current;
        const quote = quoteRef.current;
        const viewportHeight = window.innerHeight;
        const targetPosition = viewportHeight * 0.2;

        const options = {
            root: null, // Use the viewport as the root
            // Set the rootMargin to position our "trigger line" at 20% of viewport height
            rootMargin: `-${targetPosition}px 0px ${viewportHeight - targetPosition}px 0px`,
            threshold: [0, 0.1] // We'll detect when it starts to enter and is 10% visible
          };

        const quoteObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // doo something
                }
            })
        }, options);

        if (quote) {
            quoteObserver.observe(quote as Element);
        }
        
        return () => {
            if (quote) {
                quoteObserver.unobserve(quote as Element);
            }
        }
    }


    useEffect(() => {
      //console.log('hello world')
      setHeroTextLengths();
      const cleanUpQuoteSetUp = setUpQuote();
      const cleanUpVideoSetUp = setUpVideo();

      return () => {
        cleanUpVideoSetUp();
        cleanUpQuoteSetUp();
      }

    }, [])


    // data-aos html tag for css animation on scroll

    return (
        <>
        <div ref={containerRef} className='content'>
            <div className='black-shadow'>
              <img src={mainCabin} className='main-cabin'/>
              <HeroText  className='title-container'/>
            </div>

            

            <div className='locations-content'>
                <div className='black-blur'>
                </div>

                <div ref={quoteRef} className='quote-container'>
                    "The earth has music for those who listen." - <span className='quote-att'>Shakespeare</span>
                </div>
                <div ref={videoFrameRef} className='location-video-frame'>
                    <div ref={videoContainerRef} className='location-video-container'>
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
            </div>

            <ExpandingPhotos />
            <MainContent />
            <Footer />

        </div>
</>
    )
}



