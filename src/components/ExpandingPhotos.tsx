import tallCabinTwo from '../assets/slider/tall-cabin-two-opt.jpg';
import tallCabinThree from '../assets/slider/tall-cabin-three-opt.jpg';
import squirrelPhoto from '../assets/slider/squirrel-photo-opt.jpg';
import './css/ExpandingPhotos.css';
import OutlinedDiv from './OutlinedDiv';
import PillButton from './PillButton';
import { useEffect, useRef, useState } from 'react';


// TODO: Optimize remaining photos, delete unused ones.

export default function ExpandingPhotos() {


    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 820);
    const observerRef = useRef<IntersectionObserver | null>(null);
    

    useEffect(() => {

        const handleWindowResize = () => {
            setIsSmallScreen(window.innerWidth < 820);
        }

        window.addEventListener('resize', handleWindowResize);
    
        return () => {
            window.removeEventListener("resize", handleWindowResize);
        }

    }, []);

    useEffect(() => {
        const expandingImages = document.querySelectorAll('.locations-photo-container');
        const hiddenContent = [...document.querySelectorAll('.locations-photo-text-desc'), ...document.querySelectorAll('.learn-more-button')]


        if (observerRef.current) {
            observerRef.current.disconnect();
        }

        if (isSmallScreen === false) {
            [...hiddenContent, ...expandingImages].forEach((el) => {
                el.classList.remove('focused');
            })
            return;
        }
        const observer = new IntersectionObserver((entries) => {

            entries.forEach((entry) => {
                    const childImg = entry.target.querySelector('.locations-photo');
                    const childText = entry.target.querySelector('.locations-photo-text-desc');
                    const childBtn = entry.target.querySelector('.learn-more-button');


                    if (entry.isIntersecting) {
                        console.log('expanding image entering');
                        childImg?.classList.add('focused');
                        childText?.classList.add('visible');
                        childBtn?.classList.add('visible');
                    } else {
                        childImg?.classList.remove('focused');
                        childText?.classList.remove('visible');
                        childBtn?.classList.remove('visible');
                    }
                
            });
        }, {
            threshold: 0.5,
        });
 
        [...expandingImages].forEach((el) => observer.observe(el));

        observerRef.current = observer;


    }, [isSmallScreen])


    return (
        <div className='locations-photos'>

        <div className='locations-photos-slider'>
            <OutlinedDiv outerDivClassName='locations-photos-header' innerDivClassName=''>
                    Like never before
            </OutlinedDiv>
            <div className='locations-photo-container'>
                <img src={squirrelPhoto} className='locations-photo'/>
                <div className='locations-photo-content'>
                    <div className='locations-photo-text-title'>
                        <span className='locations-photo-text-title-top' >Unfiltered</span> Wildlife
                    </div>
                    <div className='locations-photo-text-desc'>
                        Experience Colorado's diverse wildlife right from the comfort of your cabin retreat
                    </div>
                    <div className='learn-more-button-container'>
                    <PillButton className='learn-more-button'>
                        Learn More
                    </PillButton>
                    </div>

                </div>
            </div>
            <div className='locations-photo-container'>
                <img src={tallCabinTwo} className='locations-photo'/>
                <div className='locations-photo-content'>
                    <div className='locations-photo-text-title'>
                        <span className='locations-photo-text-title-top'>Pure</span> Nature
                    </div>
                    <div className='locations-photo-text-desc'>
                    From wooded trails to mountain views and snowy fields, surround yourself in nature
                    </div>
                    <div className='learn-more-button-container'>
                    <PillButton className='learn-more-button'>
                        Learn More
                    </PillButton>
                    </div>

                </div>
            </div>
            <div className='locations-photo-container'>
                <img src={tallCabinThree} className='locations-photo'/>
                <div className='locations-photo-content'>
                    <div className='locations-photo-text-title'>
                    <span className='locations-photo-text-title-top'>Maximum</span> Comfort
                    </div>
                    <div className='locations-photo-text-desc'>
                    Our cabins offer cozy, comfortable living with everything you need for a relaxing getaway
                    </div>
                    <div className='learn-more-button-container'>
                    <PillButton className='learn-more-button'>
                        Learn More
                    </PillButton>
                    </div>

                </div>
            </div>
        </div>

</div>
)
}