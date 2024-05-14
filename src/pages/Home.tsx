import './css/Home.css';
import mainCabin from '../assets/main-cabin.jpg';
import HeroText from "../assets/hero-filled.svg?react";
import { useEffect } from 'react';

const coloradoIndexes = [8, 7, 6, 5, 4, 3, 2, 1 ];
const cabinResortsIndexes = [30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19];
export default function Home() {document.querySelector("#hero-text > path:nth-child(19)")


    const setHeroTextLengths = () => {
        const heroText = document.querySelectorAll('#hero-text');

        const heroTextPaths = heroText[0].children;
        console.log('heroText length', heroTextPaths.length);
        for (let i = 0; i < heroTextPaths.length; i += 1) {
            const path = heroTextPaths[i] as SVGGeometryElement;
            const length = path.getTotalLength();
            path.style.strokeDasharray = `${length}`;
            path.style.strokeDashoffset = `${length}`;
            
            

            if (coloradoIndexes.includes(i + 1)) {
                path.style.animation = 'line-anim 3.5s ease forwards 0.10s, fill-middle 0.5s ease forwards 3.1';
            } if (cabinResortsIndexes.includes(i + 1)) {
                path.style.animation = 'line-anim 3.5s ease forwards 4.5s, fill-middle 0.5s ease forwards 7.5s';
            }
            else {
                path.style.animation = 'line-anim 3.5s ease forwards, fill-other 0.5s ease forwards 3s';
            }
        }
    }

    useEffect(() => {
      console.log('hello world')
      setHeroTextLengths();
    }, [])


    return (
        <div className='content'>
            <div className='black-shadow'>
              <img src={mainCabin} className='main-cabin'/>
              <HeroText  className='title-container'/>
            </div>

        </div>
    )
}



