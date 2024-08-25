import './css/Home.css';
import mainCabin from '../assets/main-cabin.jpg';
import tallCabinFive from '../assets/slider/tall-cabin-five.jpg';
import tallCabinTwo from '../assets/slider/tall-cabin-two.jpg';
import tallCabinThree from '../assets/slider/tall-cabin-three.jpg';
import HeroText from "../assets/hero-filled.svg?react";
import LocationVideo from '../assets/colorado-video.mp4';
import { useEffect } from 'react';
import MainContent from '../components/MainContent';
import '../components/css/Footer.css';

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
        const windowHeight = window.innerHeight;
        const container = document.querySelector('.content');
        const videoContainer = document.querySelector('.location-video-container') as HTMLElement;
        
        const maxYTilt = 15;
        const maxXTilt = 10;
        const normalPerspective = 3000;
        const tiltedPerspective = 1000;
        const startStraighten = 724;
        const endStraighten = 1524;
        const startTilt = 1600;
        const endTilt = 2240;

        const yStraightenMultiplier = maxYTilt / (endStraighten - startStraighten);
        const xStraightenMultiplier = maxXTilt / (endStraighten - startStraighten);
        const perspectiveStraightenMultiplier = (normalPerspective - tiltedPerspective) / (endStraighten - startStraighten);

        const yTiltValueMultiplier = (maxYTilt / (endTilt - startTilt)) * -1;
        const xTiltValueMultiplier = (maxXTilt / (endTilt - startTilt)) * -1;
        const perspectiveTiltMultiplier = (normalPerspective - tiltedPerspective) / (endTilt - startTilt);




        let lastPosition = 0;
        console.log('Window height is ', windowHeight);
        if (container) {
            container.addEventListener('scroll', () => {
                

                const scrollPosition = container.scrollTop;
                console.log('Current scroll position: ', scrollPosition);
                if (lastPosition < scrollPosition) {
                    // scrolling down
                    if (scrollPosition >= startStraighten && scrollPosition <= endStraighten && videoContainer) {
                        const contextPosition = scrollPosition - startStraighten;
                        const perspectiveValue = String((contextPosition * perspectiveStraightenMultiplier) + tiltedPerspective);
                        const yValue = String(maxYTilt - (contextPosition * yStraightenMultiplier));
                        const xValue = String(maxXTilt - (contextPosition * xStraightenMultiplier));
                        console.log(`perspective: ${perspectiveValue}px, rotateY: ${yValue}deg, rotateX: ${xValue}deg`);
                        videoContainer.style.transform = `perspective(${perspectiveValue}px) rotateY(${yValue}deg) rotateX(${xValue}deg)`
                    } else if (scrollPosition >= endStraighten && scrollPosition <= startTilt && videoContainer) {
                        videoContainer.style.transform = `perspective(${normalPerspective}px) rotateY(0deg) rotateX(0deg)`
                    } else if (scrollPosition >= startTilt && scrollPosition <= endTilt && videoContainer) {
                        const contextPosition = scrollPosition - startTilt;
                        const perspectiveValue = String((contextPosition * perspectiveTiltMultiplier) + tiltedPerspective);
                        const yValue = String(contextPosition * yTiltValueMultiplier);
                        const xValue = String(contextPosition * xTiltValueMultiplier);
                        console.log(`perspective: ${perspectiveValue}px, rotateY: ${yValue}deg, rotateX: ${xValue}deg`);
                        videoContainer.style.transform = `perspective(${perspectiveValue}px) rotateY(${yValue}deg) rotateX(${xValue}deg)`
                    } else if (scrollPosition >= endTilt && videoContainer) {
                        videoContainer.style.transform = `perspective(${normalPerspective}px) rotateY(-${maxYTilt}deg) rotateX(-${maxXTilt}deg)`
                    }
                } else {
                    console.log('scrolling up')
                    // scrolling up
                    if (scrollPosition >= startStraighten && scrollPosition <= endStraighten && videoContainer) {
                        const contextPosition = scrollPosition - startStraighten;
                        const perspectiveValue = String((contextPosition * perspectiveStraightenMultiplier) + tiltedPerspective);

                        const yValue = String(maxYTilt - (contextPosition * yStraightenMultiplier));
                        const xValue = String(maxXTilt - (contextPosition * xStraightenMultiplier));
                        console.log(`perspective: ${perspectiveValue}px, rotateY: ${yValue}deg, rotateX: ${xValue}deg`);
                        videoContainer.style.transform = `perspective(${perspectiveValue}px) rotateY(${yValue}deg) rotateX(${xValue}deg)`
                    } else if (scrollPosition <= startStraighten && scrollPosition <= endStraighten && videoContainer) {
                        videoContainer.style.transform = `perspective(${tiltedPerspective}px) rotateY(${maxYTilt}deg) rotateX(${maxXTilt}deg)`
                    } else if (scrollPosition <= endTilt && scrollPosition >= startTilt && videoContainer) {
                        const contextPosition = scrollPosition - startTilt;
                        const perspectiveValue = String((contextPosition * perspectiveTiltMultiplier) + tiltedPerspective);
                        const yValue = String(contextPosition * xTiltValueMultiplier);
                        const xValue = String(contextPosition * yTiltValueMultiplier);
                        console.log(`perspective: ${perspectiveValue}px, rotateY: ${yValue}deg, rotateX: ${xValue}deg`);
                        videoContainer.style.transform = `perspective(${perspectiveValue}px) rotateY(${yValue}deg) rotateX(${xValue}deg)`
                    } else if (scrollPosition >= startTilt && scrollPosition <= endStraighten && videoContainer) {
                        videoContainer.style.transform = `perspective(${normalPerspective}px) rotateY(0deg) rotateX(0deg)`
                    }
                }
        

                lastPosition = scrollPosition;
            })

            // 824 to 1624 should straighten out the video
            // 1624 to 2424 should re tilt it
        }
    }

    useEffect(() => {
      console.log('hello world')
      setHeroTextLengths();
      addScrollListener();

    }, [])


    // data-aos html tag for css animation on scroll

    return (
        <div className='content'>
            <div className='black-shadow'>
              <img src={mainCabin} className='main-cabin'/>
              <HeroText  className='title-container'/>
            </div>

            <div className='locations-content'>
                <div className='black-blur'>
                </div>
                <div className='great-outdoors'>
                </div>
                <div className='location-video-container'>
                    <video className='location-video' autoPlay={true} loop muted={true} playsInline>
                        <source src={LocationVideo} type='video/mp4' />
                    </video>
                    <div className='video-text'>
                      <div className='video-text-inner'>
                        Witness the great outdoors...

                      </div>
                    </div>
                </div>
            </div>

            <div className='locations-photos'>

                    <div className='locations-photos-slider'>
                        <div className='locations-photo-container'>
                            <img src={tallCabinFive} className='locations-photo'/>
                        </div>
                        <div className='locations-photo-container centered-photo'>
                        <div className='locations-photos-header'>
                        <div className='locations-photos-header-inner'>
                            Like never before
                        </div>    
                    </div>
                            <img src={tallCabinTwo} className='locations-photo'/>
                        </div>
                        <div className='locations-photo-container'>
                            <img src={tallCabinThree} className='locations-photo'/>
                        </div>
                    </div>
                    <div className='expanding-line'></div>

            </div>

            <MainContent>
                
            </MainContent>
        </div>
    )
}



